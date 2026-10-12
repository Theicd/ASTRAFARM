// In-game HUD: crosshair, prompts, day/goal, warehouse (money + tower), Astra face, chat, hearts, hotbar, alarm.
import { t, onLangChange, applyDom } from '../core/i18n.js';
import { glyph } from './glyphs.js';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export class GameHud {
  constructor(root, { atlas, drawFace, glyphCtx, onSlot }) {
    this.atlas = atlas;
    this.onSlot = onSlot;
    this.drawFace = drawFace;
    this.glyphCtx = glyphCtx;
    const icon = (n) => atlas.iconURL(n);
    root.insertAdjacentHTML('beforeend', `
<div id="hud" class="hidden">
  <div class="hurt"></div>
  <div class="arrows"></div>
  <div class="alarm" aria-hidden="true"><div class="kozak"><i class="blue"></i><i class="red"></i></div></div>
  <div class="crosshair"></div>
  <div class="prompt hidden"><span class="pg"></span><b></b></div>
  <div class="tl">
    <div class="day"><span class="sunmoon"></span><b class="dayname"></b><span class="clock"><i></i></span></div>
    <div class="goal"><span class="lbl" data-i18n="hud.goal">${t('hud.goal')}</span><b class="goalval"></b><div class="bar"><i></i></div></div>
    <div class="obj hidden"></div>
    <div class="warehouse">
      <div class="wh-top">
        <span class="wh-title" data-i18n="panel.coins">${t('panel.coins')}</span>
        <b class="wh-money"></b>
      </div>
      <div class="wh-meta">
        <span class="wh-helpers"></span>
        <span class="wh-hoe"></span>
      </div>
      <div class="wh-stock"></div>
    </div>
  </div>
  <div class="robot"><canvas width="16" height="12"></canvas><div class="rtext"><b data-i18n="name.astra">${t('name.astra')}</b><span class="rstate"></span></div></div>
  <div class="chat"></div>
  <div class="bottom">
    <div class="hearts">${Array.from({ length: 10 }, () => `<img alt="" src="${icon('heart_full')}">`).join('')}</div>
    <div class="slotname"></div>
    <div class="hotbar">
      <i class="hb-side" data-glyph="slotPrev"></i>
      ${['sword', 'hoe', 'seed', 'dirt', 'powder', 'turret'].map((k, i) => {
        const counted = k === 'seed' || k === 'powder' || k === 'turret';
        return `<div class="slot" data-k="${k}" data-n="${i + 1}"><img alt="" src="${icon('item_' + k)}"><em>${i + 1}</em>${counted ? '<span></span>' : ''}</div>`;
      }).join('')}
      <div class="slot extra" data-k="green"><img alt="" src="${icon('item_green')}"><span></span></div>
      <i class="hb-side" data-glyph="slotNext"></i>
    </div>
  </div>
  <div class="hints">
    <span><i data-glyph="attack"></i><b data-i18n="howto.attack.short">${t('howto.attack.short')}</b></span>
    <span><i data-glyph="use"></i><b data-i18n="howto.use.short">${t('howto.use.short')}</b></span>
    <span><i data-glyph="slots"></i><b data-i18n="howto.slots.short">${t('howto.slots.short')}</b></span>
    <span><i data-glyph="eat"></i><b data-i18n="howto.eat">${t('howto.eat')}</b></span>
    <span><i data-glyph="pause"></i><b data-i18n="howto.pause">${t('howto.pause')}</b></span>
  </div>
  <div class="banner"><h2></h2><p></p></div>
  <div class="deadmsg hidden"><h2 data-i18n="banner.dead">${t('banner.dead')}</h2><p data-i18n="banner.deadSub">${t('banner.deadSub')}</p></div>
</div>`);
    const el = (this.el = root.querySelector('#hud'));
    const q = (s) => el.querySelector(s);
    this.$ = {
      hurt: q('.hurt'), arrows: q('.arrows'), alarm: q('.alarm'), prompt: q('.prompt'), pg: q('.prompt .pg'), pt: q('.prompt b'),
      sunmoon: q('.sunmoon'), dayname: q('.dayname'), clock: q('.clock i'), goal: q('.goal'), goalval: q('.goalval'), goalbar: q('.goal .bar i'),
      obj: q('.obj'), face: q('.robot canvas'), rstate: q('.rstate'), robot: q('.robot'), chat: q('.chat'),
      hearts: [...el.querySelectorAll('.hearts img')], slots: Object.fromEntries([...el.querySelectorAll('.slot')].map((s) => [s.dataset.k, s])),
      banner: q('.banner'), bh: q('.banner h2'), bp: q('.banner p'), dead: q('.deadmsg'), slotname: q('.slotname'),
      wh: q('.warehouse'), whMoney: q('.wh-money'), whStock: q('.wh-stock'),
      whHelpers: q('.wh-helpers'), whHoe: q('.wh-hoe'),
    };
    this.faceCtx = this.$.face.getContext('2d');
    for (const sl of el.querySelectorAll('.slot[data-n]')) {
      sl.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); this.onSlot?.(sl.dataset.k); });
    }
    this.nameT = 0;
    this.prev = {};
    this.lines = [];
    this.bannerT = 0;
    this.arrowEls = [];
    this.hurtK = 0;
    this.heartIcons = { full: icon('heart_full'), half: icon('heart_half'), empty: icon('heart_empty') };
    onLangChange(() => { this.prev = {}; applyDom(this.el); });
  }

  show(on) { this.el.classList.toggle('hidden', !on); }

  _set(key, v, fn) { if (this.prev[key] !== v) { this.prev[key] = v; fn(v); } }

  setHearts(hp, max = 20) {
    this._set('hp', hp, () => {
      for (let i = 0; i < this.$.hearts.length; i++) {
        const v = hp - i * 2;
        const kind = v >= 2 ? 'full' : v === 1 ? 'half' : 'empty';
        this.$.hearts[i].src = this.heartIcons[kind];
      }
      this.$.hearts[0].parentElement.classList.toggle('low', hp <= 6);
    });
    void max;
  }

  setInventory({ bags, powder, green, stock, turretsAfford = 0, seedTotal = 0, nextSeed = null }) {
    const b = bags || { potato: stock ?? 0, wheat: 0, carrot: 0, corn: 0 };
    const total = seedTotal || ((b.potato | 0) + (b.wheat | 0) + (b.carrot | 0) + (b.corn | 0));
    this._set('inv', `${total}|${nextSeed || ''}|${powder}|${green}|${turretsAfford}`, () => {
      const S = this.$.slots;
      if (S.seed) {
        const span = S.seed.querySelector('span');
        if (span) span.textContent = total;
        S.seed.classList.toggle('empty', total <= 0);
        const img = S.seed.querySelector('img');
        if (img) img.src = this.atlas.iconURL(nextSeed ? 'item_' + nextSeed : 'item_seed');
      }
      S.powder.querySelector('span').textContent = powder;
      S.green.querySelector('span').textContent = green;
      S.powder.classList.toggle('empty', powder <= 0);
      S.green.classList.toggle('empty', green <= 0);
      if (S.turret) {
        S.turret.querySelector('span').textContent = turretsAfford;
        S.turret.classList.toggle('empty', turretsAfford <= 0);
        S.turret.classList.toggle('ready', turretsAfford > 0);
      }
    });
  }

  setWarehouse({
    money = 0, bags = {}, helpers = 0, helperCap = 0, hoeLevel = 0,
  } = {}) {
    const key = `${money}|${bags.potato}|${bags.wheat}|${bags.carrot}|${bags.corn}|${helpers}|${helperCap}|${hoeLevel}`;
    this._set('wh', key, () => {
      this.$.whMoney.textContent = t('panel.money', { n: money | 0 });
      // Show total grower robots on the farm (main Astra + helpers), cap 3
      this.$.whHelpers.textContent = t('panel.helpers', { n: 1 + (helpers | 0), m: 1 + (helperCap | 0) });
      this.$.whHoe.textContent = t('panel.hoeLevel', { n: (hoeLevel | 0) + 1 });
      const rows = ['potato', 'wheat', 'carrot', 'corn'].map((k) => {
        const n = bags[k] | 0;
        return `<div class="wh-row" data-crop="${k}">
          <img alt="" src="${this.atlas.iconURL('item_' + k)}"><b>${t('item.' + k)}</b><em>×${n}</em>
        </div>`;
      }).join('');
      this.$.whStock.innerHTML = rows;
    });
  }

  setAlarm(on) {
    this._set('alarm', on ? 1 : 0, () => this.$.alarm.classList.toggle('on', !!on));
  }

  setHeld(k, nextSeed = null) {
    this._set('held', `${k}|${nextSeed || ''}`, () => {
      for (const [n, s] of Object.entries(this.$.slots)) s.classList.toggle('sel', n === k);
      if (k === 'seed' && nextSeed) this.$.slotname.textContent = t('item.seed') + ' · ' + t('item.' + nextSeed);
      else this.$.slotname.textContent = t('item.' + k);
      this.nameT = this.prev.heldShown ? 1.6 : 0;
      this.prev.heldShown = true;
    });
  }

  setDay(n, phase, k, endless = false) {
    this._set('day', `${n}|${phase}|${endless}`, () => {
      this.$.dayname.textContent = t(endless ? 'hud.dayEndless' : 'hud.day', { n });
      this.$.sunmoon.className = 'sunmoon ' + (phase === 'night' || phase === 'dusk' ? 'moon' : 'sun');
      this.$.sunmoon.title = t('hud.phase.' + phase);
    });
    const w = Math.round(k * 100);
    this._set('clock', w, () => { this.$.clock.style.width = w + '%'; });
  }

  setGoal(n, m) {
    this._set('goal', `${n}/${m}`, () => {
      this.$.goalval.textContent = t('hud.goalVal', { n, m });
      this.$.goalbar.style.width = Math.min(100, (n / Math.max(1, m)) * 100) + '%';
      this.$.goal.classList.toggle('done', n >= m);
    });
  }

  setObjective(text) {
    this._set('obj', text || '', (v) => {
      this.$.obj.classList.toggle('hidden', !v);
      this.$.obj.textContent = v;
    });
  }

  setRobot(status, face, time) {
    this._set('rstate', status, () => {
      this.$.rstate.textContent = t('hud.robot.' + status);
      this.$.robot.dataset.s = status;
    });
    const fk = face + (face === 'scared' ? Math.floor(time * 8) % 3 : '');
    this._set('rface', fk, () => this.drawFace(this.faceCtx, face, time));
  }

  setPrompt(action, label, dim = false) {
    const { device, padType } = this.glyphCtx();
    const key = action ? `${action}|${label}|${device}|${padType}|${dim}` : '';
    this._set('prompt', key, () => {
      this.$.prompt.classList.toggle('hidden', !action);
      this.$.prompt.classList.toggle('dim', dim);
      if (!action) return;
      let g = '';
      if (device !== 'touch') {
        if (action.startsWith('slot:')) g = device === 'pad' ? glyph('slots', device, padType) : `<kbd class="gl gl-key">${action.slice(5)}</kbd>`;
        else g = glyph(action, device, padType);
      }
      this.$.pg.innerHTML = g;
      this.$.pt.textContent = label;
    });
  }

  chat(text, kind = 'astra', name = '') {
    const div = document.createElement('div');
    div.className = 'line ' + kind;
    div.innerHTML = kind === 'astra' ? `<span class="who">&lt;${esc(name)}&gt;</span> ${esc(text)}` : esc(text);
    this.$.chat.appendChild(div);
    this.lines.push({ div, t: 0 });
    while (this.lines.length > 6) { const l = this.lines.shift(); l.div.remove(); }
  }
  clearChat() { for (const l of this.lines) l.div.remove(); this.lines = []; }

  banner(title, sub = '', dur = 3) {
    this.$.bh.textContent = title;
    this.$.bp.textContent = sub;
    this.bannerT = dur;
    this.bannerDur = dur;
  }

  setDead(on) { this.$.dead.classList.toggle('hidden', !on); }

  hurt(k) { this.hurtK = Math.max(this.hurtK, k); }

  setArrows(list) {
    while (this.arrowEls.length < list.length) {
      const a = document.createElement('div');
      a.className = 'arrow';
      a.innerHTML = '<i></i>';
      this.$.arrows.appendChild(a);
      this.arrowEls.push(a);
    }
    this.arrowEls.forEach((a, i) => {
      const it = list[i];
      if (!it) { a.style.display = 'none'; return; }
      a.style.display = '';
      a.style.left = (it.x * 100).toFixed(2) + '%';
      a.style.top = (it.y * 100).toFixed(2) + '%';
      a.style.transform = `translate(-50%, -50%) rotate(${it.ang.toFixed(3)}rad)`;
      a.classList.toggle('fuse', !!it.fuse);
      a.classList.toggle('big', !!it.big);
    });
  }

  update(dt) {
    for (const l of this.lines) {
      l.t += dt;
      const o = l.t < 9 ? 1 : Math.max(0, 1 - (l.t - 9) / 1.5);
      l.div.style.opacity = o.toFixed(2);
    }
    if (this.bannerT > 0) {
      this.bannerT -= dt;
      const k = this.bannerDur - this.bannerT;
      const o = Math.min(1, k / 0.35, Math.max(0, this.bannerT) / 0.6);
      this.$.banner.style.opacity = o.toFixed(2);
    } else this.$.banner.style.opacity = '0';
    this.nameT = Math.max(0, this.nameT - dt);
    this.$.slotname.style.opacity = Math.min(1, this.nameT / 0.4).toFixed(2);
    this.hurtK = Math.max(0, this.hurtK - dt * 1.6);
    this.$.hurt.style.opacity = this.hurtK.toFixed(2);
  }
}
