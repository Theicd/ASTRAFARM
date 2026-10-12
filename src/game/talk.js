// Astra dialogue + system notices. Keys live in i18n (numbered variants like 'astra.idle.3').
import { t, variantDict } from '../core/i18n.js';

const variants = new Map();
function countVariants(prefix) {
  if (variants.has(prefix)) return variants.get(prefix);
  const dict = variantDict();
  let n = 0;
  while ((`${prefix}.${n}`) in dict) n++;
  variants.set(prefix, n);
  return n;
}

export class Talk {
  constructor({ onLine, onSys }) {
    this.onLine = onLine;
    this.onSys = onSys;
    this.queue = [];
    this.gap = 0;
    this.cool = new Map();
    this.last = new Map();
    this.time = 0;
  }

  reset() { this.queue = []; this.gap = 0; this.cool.clear(); }

  say(key, opts = {}) {
    const { random = false, cool = 3, delay = 0, vars, low = false } = opts;
    if ((this.cool.get(key) ?? -1e9) > this.time) return false;
    if (low && (this.queue.length || this.gap > 0)) return false;
    let k = key;
    if (random) {
      const n = countVariants(key);
      if (!n) return false;
      let i = Math.floor(Math.random() * n);
      if (n > 1 && i === this.last.get(key)) i = (i + 1) % n;
      this.last.set(key, i);
      k = `${key}.${i}`;
    }
    this.cool.set(key, this.time + cool);
    this.queue.push({ k, vars, at: this.time + delay });
    return true;
  }

  sys(key, vars, kind = 'sys') { this.onSys(t(key, vars), kind); }

  update(dt) {
    this.time += dt;
    this.gap -= dt;
    if (this.gap > 0 || !this.queue.length) return;
    const i = this.queue.findIndex((q) => q.at <= this.time);
    if (i < 0) return;
    const q = this.queue.splice(i, 1)[0];
    const text = t(q.k, q.vars);
    this.onLine(text, q.k);
    this.gap = Math.min(3.2, 1.2 + text.length * 0.045);
  }
}
