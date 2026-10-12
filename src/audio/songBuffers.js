// Pre-render songs to AudioBuffers so gameplay never schedules oscillators in real time.
// That was the main cause of intermittent music glitches under Three.js load.
import { createMixer } from './mixer.js';
import { Sequencer, compile } from './sequencer.js';

const cache = new Map(); // `${sampleRate}:${id}` → AudioBuffer

function songLoopDuration(song) {
  const c = compile(song);
  const stepDur = 60 / (song.bpm || 120) / 4;
  return c.bars.length * c.steps * stepDur;
}

/** Soften loop seam (pads bleed across bar lines). */
function crossfadeLoop(buf, fadeSec = 0.05) {
  const n = Math.min(buf.length >> 1, Math.max(1, Math.floor(fadeSec * buf.sampleRate)));
  for (let ch = 0; ch < buf.numberOfChannels; ch++) {
    const d = buf.getChannelData(ch);
    const len = d.length;
    for (let i = 0; i < n; i++) {
      const t = i / n;
      const a = d[i];
      const b = d[len - n + i];
      d[len - n + i] = b * (1 - t) + a * t;
    }
  }
  return buf;
}

function sliceBuffer(onlineCtx, src, startSample, length) {
  const out = onlineCtx.createBuffer(src.numberOfChannels, length, src.sampleRate);
  for (let ch = 0; ch < src.numberOfChannels; ch++) {
    const from = src.getChannelData(ch);
    out.getChannelData(ch).set(from.subarray(startSample, startSample + length));
  }
  return out;
}

/**
 * Render one song to a playable buffer (cached per sample rate).
 * Looping songs render two passes and keep the second (stable sustain).
 */
export async function getSongBuffer(onlineCtx, song) {
  const key = `${onlineCtx.sampleRate}:${song.id}`;
  if (cache.has(key)) return cache.get(key);

  const loopDur = songLoopDuration(song);
  const looping = song.loop !== false;
  const passes = looping ? 2 : 1;
  const seconds = loopDur * passes + 1.2;
  const sr = onlineCtx.sampleRate;
  const offline = new OfflineAudioContext(2, Math.ceil(seconds * sr), sr);
  // Bake reverb into the buffer; playback connects dry-only
  const mix = createMixer(offline, offline.destination, { master: 1, music: 1, sfx: 0 });
  const seq = new Sequencer(offline, mix.music, { ...song, loop: true });
  seq.prime(loopDur * passes + 0.02, 0);
  const rendered = await offline.startRendering();

  let buf;
  if (!looping) {
    const len = Math.min(rendered.length, Math.floor((loopDur + 1.0) * sr));
    buf = sliceBuffer(onlineCtx, rendered, 0, len);
  } else {
    const start = Math.floor(loopDur * sr);
    const len = Math.floor(loopDur * sr);
    buf = sliceBuffer(onlineCtx, rendered, Math.min(start, Math.max(0, rendered.length - len)), len);
    crossfadeLoop(buf, 0.06);
  }

  cache.set(key, buf);
  return buf;
}

/** Warm common tracks in the background after unlock. */
export function warmSongBuffers(onlineCtx, songs, ids) {
  for (const id of ids) {
    const song = songs[id];
    if (!song) continue;
    getSongBuffer(onlineCtx, song).catch(() => {});
  }
}
