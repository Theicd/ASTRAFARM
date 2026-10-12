/**
 * Online rooms — same shape as Kart Royale / SOS Quake SosNet.
 * No accounts: type a name, tap PLAY. First player opens a room; the next
 * finds it and joins over P2P. Topology is a star (clients ↔ host).
 *
 *   discovery  Nostr kind 33215 (replaceable), tag `sos_astra_v1`
 *   signalling Nostr kind 25215 (ephemeral), NIP-44 encrypted
 *   transport  WebRTC: 'ctl' reliable JSON, 'st' unreliable poses
 *   same-tab   BroadcastChannel for local multi-tab discovery
 */
import { SimplePool } from 'nostr-tools/pool';
import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import * as nip44 from 'nostr-tools/nip44';
import { names, cleanName } from './names.js';

export const ROOM_TAG = 'sos_astra_v1';
const KIND_ROOM = 33215;
const KIND_SIGNAL = 25215;
const RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.primal.net',
  'wss://relay.snort.social',
];
const ICE = [
  { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
  { urls: 'stun:stun.cloudflare.com:3478' },
  { urls: ['turn:freeturn.net:3478', 'turn:freeturn.net:3478?transport=tcp'], username: 'free', credential: 'free' },
  { urls: 'turns:freeturn.net:5349', username: 'free', credential: 'free' },
];
const RTC_CONFIG = {
  iceServers: ICE,
  iceTransportPolicy: new URLSearchParams(location.search).get('relay') === '1' ? 'relay' : 'all',
};
const MAX_HUMANS = 4;
const ROOM_TTL = 40;
const HEARTBEAT_MS = 10000;
const ANNOUNCE_GAP_MS = 2000;
const LISTEN_MS = 2500;
const JOIN_TIMEOUT_MS = 12000;
const ICE_WAIT_MS = 4000;
const POSE_HZ = 15;
const LOBBY_MS = 8000;
const GATHER_MIN_MS = 1200;
const BUS_NAME = 'sos_astra_bus_v1';
const LS_ROOM_KEY = 'sos_astra_v1_rooms';
const POSE_BYTES = 18; // idx + flags + 4 floats

const now = () => performance.now();
const nowSec = () => Math.floor(Date.now() / 1000);
const randId = () => Math.random().toString(36).slice(2, 10);

function waitIce(pc) {
  if (pc.iceGatheringState === 'complete') return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => { pc.removeEventListener('icegatheringstatechange', check); resolve(); };
    const check = () => { if (pc.iceGatheringState === 'complete') done(); };
    pc.addEventListener('icegatheringstatechange', check);
    setTimeout(done, ICE_WAIT_MS);
  });
}

const LAMP_CSS = `
.af-net-lamp {
  position: fixed; z-index: 80; pointer-events: none;
  top: calc(env(safe-area-inset-top, 0px) + 10px); right: 12px;
  min-width: 28px; height: 26px; padding: 0 8px; box-sizing: border-box; border-radius: 999px;
  display: none; align-items: center; justify-content: center; gap: 4px;
  font: 800 12px/1 system-ui, sans-serif; color: #062312;
  background: #3aa0ff; box-shadow: 0 0 10px #3aa0ff;
  animation: af-lamp 1.2s ease-in-out infinite;
}
.af-net-lamp.show { display: flex; }
.af-net-lamp.on { background: #38d86b; box-shadow: 0 0 12px #38d86b; animation: none; }
@keyframes af-lamp { 50% { opacity: 0.35; } }
[data-device="touch"] .af-net-lamp {
  left: calc(env(safe-area-inset-left, 0px) + 12px);
  right: auto;
}
`;

/** Hooks the game fills in after construction. */
export const netHooks = {
  /** () => void — start/join the farm session */
  beginFarm: null,
  /** (text) => void — status under PLAY */
  setStatus: null,
  /** true once the local game world is ready to play */
  booted: false,
  /** local player pose getter: () => {x,y,z,yaw,flags} */
  getPose: null,
  /** apply remote pose */
  onRemotePose: null,
  /** peer joined/left roster updates */
  onRoster: null,
  /** shared farm events (pig sold, …) */
  onGame: null,
  /** spawn index for local player (0 = host) */
  myIdx: 0,
};

let sharedPool = null;
function relayPool() {
  sharedPool ??= new SimplePool();
  return sharedPool;
}

class SosNet {
  constructor(seed = []) {
    this.sk = generateSecretKey();
    this.pk = getPublicKey(this.sk);
    this.pool = relayPool();
    this.subs = [];
    this.convKeys = new Map();
    this.seen = new Set();
    this.rooms = new Map();
    this.peers = new Map();
    this.host = null;
    this.joining = null;
    this.role = 'searching';
    this.myIdx = 0;
    this.wantStart = true;
    this.started = false;
    this.gatherFrom = 0;
    this.sentReady = false;
    this.lastAnnounce = 0;
    this.announceTimer = 0;
    this.heartbeat = 0;
    this.timers = [];
    this.disposed = false;
    this.bus = null;
    this.roster = new Map(); // pk -> { idx, nm }

    if (!document.getElementById('af-net-lamp-css')) {
      const st = document.createElement('style');
      st.id = 'af-net-lamp-css';
      st.textContent = LAMP_CSS;
      document.head.appendChild(st);
    }
    this.badge = document.createElement('div');
    this.badge.className = 'af-net-lamp show';
    document.body.appendChild(this.badge);

    for (const r of seed) this.rooms.set(r.pubkey, r);
    this._loadLocalRooms();
    this.listen();
    this.setStatus('Looking for a room…');
    this.setLamp(false);
    this.timers.push(
      window.setTimeout(() => void this.matchmake(), this.liveRooms().length ? 400 : LISTEN_MS),
      window.setInterval(() => this.sendPoses(), 1000 / POSE_HZ),
      window.setInterval(() => this.tick(), 250),
    );
    addEventListener('pagehide', this.onPageHide);
  }

  onPageHide = () => this.leave();

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.leave();
    removeEventListener('pagehide', this.onPageHide);
    for (const t of this.timers) clearTimeout(t), clearInterval(t);
    clearInterval(this.heartbeat);
    clearTimeout(this.announceTimer);
    const subs = this.subs.splice(0);
    setTimeout(() => { for (const s of subs) try { s.close(); } catch { /* */ } }, 800);
    try { this.bus?.close(); } catch { /* */ }
    this.badge.remove();
    netHooks.booted = false;
  }

  setStatus(text) {
    this.badge.title = text;
    netHooks.setStatus?.(text);
  }

  setLamp(on) {
    const n = this.role === 'host' ? this.humans() : this.role === 'client' ? Math.max(2, this.roster.size + 1) : 1;
    this.badge.classList.toggle('on', !!on || n > 1);
    this.badge.classList.add('show');
    this.badge.textContent = n > 1 ? String(n) : '·';
  }

  convKey(pk) {
    let key = this.convKeys.get(pk);
    if (!key) { key = nip44.getConversationKey(this.sk, pk); this.convKeys.set(pk, key); }
    return key;
  }

  listen() {
    if (this.subs.length) return;
    this.subs.push(this.pool.subscribeMany(RELAYS, { kinds: [KIND_ROOM], '#t': [ROOM_TAG], since: nowSec() - 60 }, {
      onevent: (ev) => this._ingestRoom(ev.pubkey, (() => { try { return JSON.parse(ev.content); } catch { return null; } })(), ev.created_at),
    }));
    this.subs.push(this.pool.subscribeMany(RELAYS, { kinds: [KIND_SIGNAL], '#p': [this.pk], since: nowSec() - 10 }, {
      onevent: (ev) => {
        if (this.seen.has(ev.id)) return;
        this.seen.add(ev.id);
        let msg;
        try { msg = JSON.parse(nip44.decrypt(ev.content, this.convKey(ev.pubkey))); } catch { return; }
        void this.onSignal(ev.pubkey, msg);
      },
    }));
    try {
      this.bus = new BroadcastChannel(BUS_NAME);
      this.bus.onmessage = (ev) => {
        const d = ev?.data;
        if (!d || typeof d !== 'object') return;
        if (d.t === 'room') this._ingestRoom(d.pubkey, d, Number(d.ts) || nowSec());
        else if (d.t === 'signal' && d.to === this.pk && d.from && d.msg) void this.onSignal(d.from, d.msg);
      };
    } catch { /* no BC */ }
  }

  _ingestRoom(pubkey, c, ts) {
    if (!pubkey || pubkey === this.pk || !c) return;
    if (c.closed) { this.rooms.delete(pubkey); this._persistLocalRooms(); return; }
    const prev = this.rooms.get(pubkey);
    if (prev && prev.ts > ts) return;
    this.rooms.set(pubkey, {
      pubkey,
      players: Math.max(1, Math.min(MAX_HUMANS, Number(c.players) || 1)),
      max: MAX_HUMANS,
      ts,
      farming: !!c.farming,
    });
    this._persistLocalRooms();
  }

  _persistLocalRooms() {
    try {
      const cut = nowSec() - ROOM_TTL;
      localStorage.setItem(LS_ROOM_KEY, JSON.stringify([...this.rooms.values()].filter((r) => r.ts >= cut)));
    } catch { /* */ }
  }

  _loadLocalRooms() {
    try {
      const list = JSON.parse(localStorage.getItem(LS_ROOM_KEY) || '[]');
      if (!Array.isArray(list)) return;
      for (const r of list) if (r?.pubkey) this._ingestRoom(r.pubkey, r, Number(r.ts) || nowSec());
    } catch { /* */ }
  }

  signal(to, msg) {
    const payload = { type: msg.type, sid: msg.sid, sdp: msg.sdp };
    const ev = finalizeEvent({
      kind: KIND_SIGNAL,
      created_at: nowSec(),
      tags: [['p', to], ['t', ROOM_TAG]],
      content: nip44.encrypt(JSON.stringify(payload), this.convKey(to)),
    }, this.sk);
    void Promise.allSettled(this.pool.publish(RELAYS, ev));
    try { this.bus?.postMessage({ t: 'signal', to, from: this.pk, msg: payload }); } catch { /* */ }
  }

  announce(closed = false) {
    clearTimeout(this.announceTimer);
    const wait = closed ? 0 : this.lastAnnounce + ANNOUNCE_GAP_MS - now();
    if (wait > 0) {
      this.announceTimer = window.setTimeout(() => { if (!this.disposed) this.announce(); }, wait);
      return;
    }
    this.lastAnnounce = now();
    const body = {
      v: 1, room: this.pk, players: this.humans(), max: MAX_HUMANS, closed,
      farming: !closed && this.started,
    };
    const ev = finalizeEvent({
      kind: KIND_ROOM,
      created_at: nowSec(),
      tags: [['d', ROOM_TAG], ['t', ROOM_TAG]],
      content: JSON.stringify(body),
    }, this.sk);
    void Promise.allSettled(this.pool.publish(RELAYS, ev));
    try { this.bus?.postMessage({ t: 'room', pubkey: this.pk, ts: nowSec(), ...body }); } catch { /* */ }
  }

  liveRooms() {
    const cut = nowSec() - ROOM_TTL;
    return [...this.rooms.values()]
      .filter((r) => r.ts >= cut && r.players < r.max)
      .sort((a, b) => b.players - a.players || b.ts - a.ts);
  }

  async matchmake() {
    for (const room of this.liveRooms()) {
      if (this.disposed) return;
      if (await this.tryJoin(room.pubkey)) return;
    }
    if (!this.disposed) this.becomeHost();
  }

  becomeHost() {
    this.role = 'host';
    this.host = null;
    this.myIdx = 0;
    netHooks.myIdx = 0;
    this.roster.set(this.pk, { idx: 0, nm: names.player || 'Host' });
    this.announce();
    clearInterval(this.heartbeat);
    this.heartbeat = window.setInterval(() => {
      if (this.role !== 'host') return;
      this.announce();
      void this.mergeLoneHost();
    }, HEARTBEAT_MS);
    this.gatherFrom = now();
    this.setStatus(`Room open · waiting… (${Math.ceil(LOBBY_MS / 1000)}s)`);
    this.setLamp(false);
  }

  async mergeLoneHost() {
    if (this.peers.size > 0 || this.joining || this.started) return;
    const target = this.liveRooms().find((r) => r.players > 1 || r.pubkey < this.pk);
    if (!target) return;
    if (await this.tryJoin(target.pubkey)) {
      clearInterval(this.heartbeat);
      this.announce(true);
    }
  }

  tryJoin(hostPk) {
    return new Promise((resolve) => {
      const pc = new RTCPeerConnection(RTC_CONFIG);
      const peer = { hostSide: false, pk: hostPk, sid: randId(), pc, ctl: null, st: null, open: false, name: '' };
      this.joining = peer;
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (this.joining === peer) this.joining = null;
        if (!ok) { try { pc.close(); } catch { /* */ } }
        resolve(ok);
      };
      const timer = setTimeout(() => finish(false), JOIN_TIMEOUT_MS);
      peer.fail = () => finish(false);

      peer.ctl = pc.createDataChannel('ctl', { ordered: true });
      peer.st = pc.createDataChannel('st', { ordered: false, maxRetransmits: 0 });
      peer.st.binaryType = 'arraybuffer';
      peer.ctl.onopen = () => {
        peer.open = true;
        this.becomeClient(peer);
        finish(true);
      };
      this.wireChannels(peer);

      void (async () => {
        try {
          await pc.setLocalDescription(await pc.createOffer());
          await waitIce(pc);
          this.signal(hostPk, { type: 'offer', sid: peer.sid, sdp: pc.localDescription?.sdp });
        } catch { finish(false); }
      })();
    });
  }

  becomeClient(peer) {
    for (const p of this.peers.values()) this.dropPeer(p, false);
    this.role = 'client';
    this.host = peer;
    this.sentReady = false;
    this.gatherFrom = 0;
    clearInterval(this.heartbeat);
    this.setStatus('Joined · connecting…');
    this.setLamp(true);
  }

  async onSignal(from, msg) {
    if (!msg || typeof msg.type !== 'string' || typeof msg.sid !== 'string') return;
    if (msg.type === 'offer' && typeof msg.sdp === 'string') {
      if (this.role !== 'host' || this.peers.has(from)) return;
      if (this.humans() >= MAX_HUMANS || this.joining) {
        this.signal(from, { type: 'full', sid: msg.sid });
        return;
      }
      const pc = new RTCPeerConnection(RTC_CONFIG);
      const peer = { hostSide: true, pk: from, sid: msg.sid, pc, ctl: null, st: null, open: false, name: '', idx: -1 };
      this.peers.set(from, peer);
      pc.ondatachannel = (e) => {
        if (e.channel.label === 'ctl') peer.ctl = e.channel;
        else if (e.channel.label === 'st') { peer.st = e.channel; peer.st.binaryType = 'arraybuffer'; }
        this.wireChannels(peer);
      };
      setTimeout(() => { if (!peer.open) this.dropPeer(peer, true); }, JOIN_TIMEOUT_MS);
      try {
        await pc.setRemoteDescription({ type: 'offer', sdp: msg.sdp });
        await pc.setLocalDescription(await pc.createAnswer());
        await waitIce(pc);
        this.signal(from, { type: 'answer', sid: msg.sid, sdp: pc.localDescription?.sdp });
      } catch { this.dropPeer(peer, true); }
      return;
    }
    const j = this.joining;
    if (!j || j.pk !== from || j.sid !== msg.sid) return;
    if (msg.type === 'answer' && typeof msg.sdp === 'string') {
      try { await j.pc.setRemoteDescription({ type: 'answer', sdp: msg.sdp }); } catch { j.fail?.(); }
    } else if (msg.type === 'full') {
      j.fail?.();
    }
  }

  wireChannels(peer) {
    const { ctl, st, pc } = peer;
    if (ctl && !ctl.__wired) {
      ctl.__wired = true;
      ctl.onmessage = (e) => {
        let m;
        try { m = JSON.parse(String(e.data)); } catch { return; }
        this.onCtl(peer, m);
      };
      ctl.onclose = () => this.lost(peer);
      if (peer.hostSide) {
        ctl.onopen = () => { peer.open = true; this.onClientJoined(peer); };
        if (ctl.readyState === 'open') { peer.open = true; this.onClientJoined(peer); }
      }
    }
    if (st && !st.__wired) {
      st.__wired = true;
      st.onmessage = (e) => { if (e.data instanceof ArrayBuffer) this.onPoses(peer, e.data); };
    }
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'failed' || pc.connectionState === 'closed') this.lost(peer);
    };
  }

  send(peer, m) {
    if (peer.ctl?.readyState === 'open') peer.ctl.send(JSON.stringify(m));
  }

  /** Reliable room-wide game event (star: client→host→all, or host→all). */
  broadcastGame(msg) {
    if (!msg || typeof msg.t !== 'string') return;
    const m = { ...msg, t: 'game', g: msg.t };
    if (this.role === 'host') {
      for (const p of this.peers.values()) if (p.open) this.send(p, m);
      return;
    }
    if (this.host) this.send(this.host, m);
  }

  humans() {
    if (this.role === 'client') return Math.max(2, this.roster.size + (this.roster.has(this.pk) ? 0 : 1));
    let n = 1;
    for (const p of this.peers.values()) if (p.open) n++;
    return n;
  }

  freeIdx() {
    const taken = new Set([0]);
    for (const p of this.peers.values()) if (p.idx >= 0) taken.add(p.idx);
    for (let i = 1; i < MAX_HUMANS; i++) if (!taken.has(i)) return i;
    return -1;
  }

  onClientJoined(peer) {
    this.announce();
    this.setLamp(true);
    this.setStatus(`Player joined · ${this.humans()}/${MAX_HUMANS}`);
    // Client will send ready; if already farming, still assign seat.
    if (this.started) {
      // wait for ready
    } else if (!this.gatherFrom) {
      this.gatherFrom = now();
    }
  }

  onCtl(peer, m) {
    if (!m || typeof m.t !== 'string') return;
    if (this.role === 'client' && peer === this.host) {
      if (m.t === 'welcome') {
        this.myIdx = Number(m.idx) | 0;
        netHooks.myIdx = this.myIdx;
        this.roster.clear();
        if (Array.isArray(m.roster)) {
          for (const r of m.roster) {
            if (r?.pk) this.roster.set(r.pk, { idx: r.idx | 0, nm: cleanName(r.nm) || 'Farmer' });
          }
        }
        this.pushRoster();
        this.setStatus('In room · get ready…');
      } else if (m.t === 'start') {
        this.myIdx = Number(m.idx) | 0;
        netHooks.myIdx = this.myIdx;
        this.beginLocal();
      } else if (m.t === 'join' && m.pk && m.pk !== this.pk) {
        this.roster.set(m.pk, { idx: m.idx | 0, nm: cleanName(m.nm) || 'Farmer' });
        netHooks.onRoster?.(m.pk, cleanName(m.nm) || 'Farmer', true);
        this.setLamp(true);
      } else if (m.t === 'leave' && m.pk) {
        this.roster.delete(m.pk);
        netHooks.onRoster?.(m.pk, '', false);
      } else if (m.t === 'wait' && typeof m.text === 'string') {
        this.setStatus(m.text);
      } else if (m.t === 'game' && typeof m.g === 'string') {
        const { t: _t, g, ...rest } = m;
        netHooks.onGame?.({ t: g, from: peer.pk, ...rest });
      }
      return;
    }
    if (this.role !== 'host') return;
    if (m.t === 'game' && typeof m.g === 'string') {
      // Host applies locally then relays to every other client
      const { t: _t, g, ...rest } = m;
      netHooks.onGame?.({ t: g, from: peer.pk, ...rest });
      for (const p of this.peers.values()) {
        if (p.open && p !== peer) this.send(p, m);
      }
      return;
    }
    if (m.t === 'ready') {
      peer.name = cleanName(m.nm) || 'Farmer';
      if (peer.idx < 0) peer.idx = this.freeIdx();
      if (peer.idx < 0) { this.send(peer, { t: 'full' }); return; }
      this.roster.set(peer.pk, { idx: peer.idx, nm: peer.name });
      const roster = [{ pk: this.pk, idx: 0, nm: names.player || 'Host' }];
      for (const p of this.peers.values()) {
        if (p.open && p.idx >= 0) roster.push({ pk: p.pk, idx: p.idx, nm: p.name || 'Farmer' });
      }
      this.send(peer, { t: 'welcome', idx: peer.idx, roster });
      for (const p of this.peers.values()) {
        if (p !== peer && p.open) this.send(p, { t: 'join', pk: peer.pk, idx: peer.idx, nm: peer.name });
      }
      netHooks.onRoster?.(peer.pk, peer.name, true);
      this.announce();
      this.setLamp(true);
      if (this.started) this.send(peer, { t: 'start', idx: peer.idx });
      else if (!this.gatherFrom) this.gatherFrom = now();
    }
  }

  tick() {
    if (this.role === 'client') {
      if (!this.sentReady && this.host?.ctl?.readyState === 'open') {
        this.sentReady = true;
        this.send(this.host, { t: 'ready', nm: names.player || 'Farmer' });
      }
      return;
    }
    if (this.role !== 'host' || this.started) return;
    if (!this.gatherFrom) return;
    const waited = now() - this.gatherFrom;
    const left = Math.ceil((LOBBY_MS - waited) / 1000);
    const n = this.humans();
    const text = left > 0
      ? `Starting in ${left}s · ${n}/${MAX_HUMANS}`
      : (n > 1 ? 'Starting…' : 'Starting solo…');
    this.setStatus(text);
    for (const p of this.peers.values()) if (p.open) this.send(p, { t: 'wait', text });
    const pending = [...this.peers.values()].some((p) => !p.open);
    const readyPeers = [...this.peers.values()].filter((p) => p.open && p.idx >= 0);
    const allReady = !pending && readyPeers.length === [...this.peers.values()].filter((p) => p.open).length;
    // Lobby window so a second PLAY a few seconds later still lands in this room.
    if (waited >= LOBBY_MS && (n === 1 || allReady || waited >= LOBBY_MS + 5000)) this.startAll();
    else if (n > 1 && allReady && waited >= GATHER_MIN_MS && waited >= LOBBY_MS * 0.55) this.startAll();
  }

  startAll() {
    if (this.started) return;
    this.started = true;
    this.gatherFrom = 0;
    for (const p of this.peers.values()) {
      if (p.open && p.idx >= 0) this.send(p, { t: 'start', idx: p.idx });
    }
    this.announce();
    this.beginLocal();
  }

  beginLocal() {
    if (this._began) return;
    this._began = true;
    this.started = true;
    this.setStatus(this.humans() > 1 ? `Online · ${this.humans()} farmers` : 'Farm open');
    this.setLamp(this.humans() > 1);
    netHooks.beginFarm?.();
  }

  pushRoster() {
    for (const [pk, r] of this.roster) {
      if (pk === this.pk) continue;
      netHooks.onRoster?.(pk, r.nm, true);
    }
  }

  packPose() {
    const pose = netHooks.getPose?.();
    if (!pose) return null;
    const buf = new ArrayBuffer(2 + POSE_BYTES);
    const dv = new DataView(buf);
    dv.setUint8(0, 1);
    dv.setUint8(1, 1);
    const off = 2;
    dv.setUint8(off, this.myIdx & 255);
    dv.setUint8(off + 1, pose.flags & 255);
    dv.setFloat32(off + 2, pose.x, true);
    dv.setFloat32(off + 6, pose.y, true);
    dv.setFloat32(off + 10, pose.z, true);
    dv.setFloat32(off + 14, pose.yaw, true);
    return buf;
  }

  sendPoses() {
    if (!this.started) return;
    if (!netHooks.getPose) return;
    if (this.role === 'client') {
      const st = this.host?.st;
      const buf = this.packPose();
      if (buf && st?.readyState === 'open' && st.bufferedAmount < 16384) st.send(buf);
      return;
    }
    if (this.role !== 'host') return;
    // Host: collect own pose + last client poses already applied; send each peer everyone else.
    // Simpler: host forwards each client's packet to others, and sends own pose to all.
    const mine = this.packPose();
    for (const p of this.peers.values()) {
      if (p.st?.readyState !== 'open' || p.st.bufferedAmount > 16384) continue;
      if (mine) p.st.send(mine);
    }
  }

  onPoses(peer, buf) {
    if (buf.byteLength < 2 + POSE_BYTES) return;
    const dv = new DataView(buf);
    if (dv.getUint8(0) !== 1) return;
    const count = dv.getUint8(1);
    for (let c = 0; c < count; c++) {
      const off = 2 + c * POSE_BYTES;
      if (off + POSE_BYTES > buf.byteLength) break;
      const idx = dv.getUint8(off);
      const flags = dv.getUint8(off + 1);
      const x = dv.getFloat32(off + 2, true);
      const y = dv.getFloat32(off + 6, true);
      const z = dv.getFloat32(off + 10, true);
      const yaw = dv.getFloat32(off + 14, true);
      if (![x, y, z, yaw].every(Number.isFinite)) continue;
      // Find pk for this idx
      let pk = peer.pk;
      if (this.role === 'client') {
        for (const [k, r] of this.roster) if (r.idx === idx) { pk = k; break; }
      } else if (this.role === 'host') {
        pk = peer.pk;
        // Relay to other clients
        for (const p of this.peers.values()) {
          if (p === peer || p.st?.readyState !== 'open') continue;
          p.st.send(buf);
        }
      }
      if (pk === this.pk) continue;
      netHooks.onRemotePose?.(pk, x, y, z, yaw, flags);
    }
  }

  lost(peer) {
    if (this.disposed) return;
    if (this.role === 'client' && this.host === peer) {
      this.host = null;
      netHooks.onRoster?.(peer.pk, '', false);
      this.becomeHost();
      return;
    }
    if (this.peers.get(peer.pk) === peer) this.dropPeer(peer, true);
  }

  dropPeer(peer, announce) {
    this.peers.delete(peer.pk);
    this.roster.delete(peer.pk);
    try { peer.pc.close(); } catch { /* */ }
    netHooks.onRoster?.(peer.pk, '', false);
    if (announce && this.role === 'host') {
      for (const p of this.peers.values()) if (p.open) this.send(p, { t: 'leave', pk: peer.pk });
      this.announce();
    }
    this.setLamp(this.humans() > 1);
  }

  leave() {
    if (this.role === 'host') this.announce(true);
    for (const p of this.peers.values()) try { p.pc.close(); } catch { /* */ }
    try { this.host?.pc.close(); } catch { /* */ }
  }
}

let instance = null;

export function netSupported() {
  const q = new URLSearchParams(location.search);
  return q.get('net') !== '0' && q.get('solo') !== '1'
    && typeof WebSocket !== 'undefined'
    && typeof RTCPeerConnection !== 'undefined';
}

export function startNet() {
  if (instance) return instance;
  if (!netSupported()) return null;
  try {
    instance = new SosNet();
    return instance;
  } catch (err) {
    console.warn('[net] disabled', err);
    return null;
  }
}

export function stopNet() {
  instance?.dispose();
  instance = null;
}

export function getNet() {
  return instance;
}

/** 'host' | 'client' | null */
export function netRole() {
  const r = instance?.role;
  return r === 'host' || r === 'client' ? r : null;
}

/** Send a shared game event to the room (pig sold, sim, etc.). */
export function netBroadcast(msg) {
  instance?.broadcastGame(msg);
}
