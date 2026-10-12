// タイトル・一時停止・設定・あそびかたの画面。上に重なる画面（モーダル）は積み重ねで管理し、
// いちばん上の画面を MenuNav が操作する。文言はすべて i18n のキー（data-i18n）で書く。
//
//   const screens = new Screens(uiRoot, { onStart, onResume, onRetry, onToTitle, onSettings, onAction });
//   screens.showTitle(true)  screens.open('pause')  screens.back()  screens.current()
//   screens.addModal('report', html)   作品の画面を足す（data-act のボタンは onAction(act) に届く）
import { t, applyDom, LANGS } from '../core/i18n.js';
import { settings, QUALITIES, PAD_TYPES, MOB_GUIDES } from '../core/settings.js';
import { names, NAME_MAX } from '../net/names.js';
import { installAppButton } from './Install.js';

const opt = (v, key) => `<option value="${v}" data-i18n="${key}">${t(key)}</option>`;
const slider = (k) => `<label class="row"><span data-i18n="settings.${k}">${t('settings.' + k)}</span>
  <input type="range" min="0" max="100" step="5" data-vol="${k}" value="${Math.round(settings.volume[k] * 100)}"></label>`;
const key = (g, k) => `<dt data-glyph="${g}"></dt><dd data-i18n="${k}">${t(k)}</dd>`;

const GEAR_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`;

export class Screens {
  constructor(root, cb) {
    this.cb = cb;
    this.root = root;
    this.stack = [];
    root.insertAdjacentHTML('beforeend', `
<section id="title" class="screen hidden">
  <div class="title-tools" dir="ltr">
    <button type="button" id="af-install-btn" class="tool-btn af-install-btn" data-i18n-aria="install.btn" aria-label="${t('install.btn')}"></button>
    <button type="button" data-act="settings" class="tool-btn tool-gear" data-i18n-aria="title.settings" aria-label="${t('title.settings')}">${GEAR_SVG}</button>
  </div>
  <div class="logo">
    <h1 data-i18n="game.title">${t('game.title')}</h1>
    <div class="splash"></div>
  </div>
  <p class="tagline" data-i18n="game.tagline">${t('game.tagline')}</p>
  <div class="menu">
    <button data-act="continue" class="continue hidden" data-i18n="title.continue">${t('title.continue')}</button>
    <label class="af-name">
      <span data-i18n="title.name">${t('title.name')}</span>
      <input class="af-name-input" type="text" maxlength="${NAME_MAX}" autocomplete="off" spellcheck="false"
        placeholder="${t('title.namePh')}" value="${names.player.replace(/"/g, '&quot;')}">
    </label>
    <button data-act="start" class="start" data-i18n="title.play">${t('title.play')}</button>
    <p class="af-net-status" aria-live="polite"></p>
    <button data-act="howto" data-i18n="title.howto">${t('title.howto')}</button>
  </div>
  <p class="best"></p>
  <footer class="copyright">© 2026 <span data-i18n="game.title">${t('game.title')}</span></footer>
</section>
<section id="m-pause" class="modal hidden"><div class="card">
  <h2 data-i18n="pause.title">${t('pause.title')}</h2>
  <button data-act="resume" data-i18n="pause.resume">${t('pause.resume')}</button>
  <button data-act="howto" data-i18n="title.howto">${t('title.howto')}</button>
  <button data-act="settings" data-i18n="title.settings">${t('title.settings')}</button>
  <button data-act="retry" data-i18n="pause.retry">${t('pause.retry')}</button>
  <button data-act="toTitle" data-i18n="pause.toTitle">${t('pause.toTitle')}</button>
</div></section>
<section id="m-settings" class="modal hidden"><div class="card settings">
  <header class="card-head">
    <h2 data-i18n="settings.title">${t('settings.title')}</h2>
    <button type="button" class="card-x" data-act="back" data-i18n-aria="ui.close" aria-label="${t('ui.close')}">✕</button>
  </header>
  <div class="card-scroll">
    ${slider('master')}${slider('music')}${slider('sfx')}
    <label class="row"><span data-i18n="settings.sens">${t('settings.sens')}</span>
      <input type="range" min="20" max="200" step="10" data-set-num="sens" value="${Math.round((settings.sens ?? 1) * 100)}"></label>
    <label class="row"><span data-i18n="settings.mobGuide">${t('settings.mobGuide')}</span>
      <select data-set="mobGuide">${MOB_GUIDES.map((g) => opt(g, 'settings.mobGuide.' + g)).join('')}</select></label>
    <label class="row"><span data-i18n="settings.quality">${t('settings.quality')}</span>
      <select data-set="quality">${QUALITIES.map((q) => opt(q, 'settings.quality.' + q)).join('')}</select></label>
    <label class="row"><span data-i18n="settings.lang">${t('settings.lang')}</span>
      <select data-set="lang">${LANGS.map((l) => `<option value="${l.id}">${l.label}</option>`).join('')}</select></label>
    <label class="row pad-only"><span data-i18n="settings.pad">${t('settings.pad')}</span>
      <select data-set="padType">${PAD_TYPES.map((p) => opt(p, 'settings.pad.' + p)).join('')}</select></label>
  </div>
  <button data-act="back" class="card-close" data-i18n="ui.close">${t('ui.close')}</button>
</div></section>
<section id="m-howto" class="modal hidden"><div class="card wide howto">
  <header class="card-head">
    <h2 data-i18n="howto.title">${t('howto.title')}</h2>
    <button type="button" class="card-x" data-act="back" data-i18n-aria="ui.close" aria-label="${t('ui.close')}">✕</button>
  </header>
  <div class="card-scroll howto-body">
    <p class="body" data-i18n="howto.body">${t('howto.body')}</p>
    <p class="body" data-i18n="howto.body2">${t('howto.body2')}</p>
    <div class="howto-guide"></div>
    <dl class="keys">
      ${key('move', 'howto.move')}${key('look', 'howto.look')}${key('jump', 'howto.jump')}${key('sprint', 'howto.sprint')}
      ${key('attack', 'howto.attack')}${key('use', 'howto.use')}${key('slots', 'howto.slots')}${key('eat', 'howto.eat')}${key('pause', 'howto.pause')}
    </dl>
    <p class="body touchonly" data-i18n="howto.touch">${t('howto.touch')}</p>
  </div>
  <button data-act="back" class="card-close" data-i18n="ui.close">${t('ui.close')}</button>
</div></section>`);
    this.title = root.querySelector('#title');
    this.modals = { pause: root.querySelector('#m-pause'), settings: root.querySelector('#m-settings'), howto: root.querySelector('#m-howto') };
    this.netStatus = this.title.querySelector('.af-net-status');
    installAppButton();

    const nameIn = this.title.querySelector('.af-name-input');
    if (nameIn) {
      nameIn.value = names.player;
      nameIn.addEventListener('input', () => names.setPlayer(nameIn.value));
      nameIn.addEventListener('blur', () => { nameIn.value = names.player; });
      for (const ev of ['pointerdown', 'click', 'touchstart', 'keyup']) {
        nameIn.addEventListener(ev, (e) => e.stopPropagation());
      }
      nameIn.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.key === 'Enter' || e.key === 'Escape') nameIn.blur();
      });
    }

    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]');
      if (!b) return;
      const act = b.dataset.act;
      cb.onClick?.(act);
      if (act === 'start') {
        const v = root.querySelector('.af-name-input')?.value;
        if (v != null) names.setPlayer(v);
        cb.onStart?.();
      }
      else if (act === 'continue') cb.onContinue?.();
      else if (act === 'howto') this.open('howto');
      else if (act === 'settings') this.open('settings');
      else if (act === 'resume') cb.onResume?.();
      else if (act === 'retry') cb.onRetry?.();
      else if (act === 'toTitle') cb.onToTitle?.();
      else if (act === 'back') this.back();
      else cb.onAction?.(act, b);
    });
    const s = this.modals.settings;
    for (const r of s.querySelectorAll('[data-vol]')) {
      r.addEventListener('input', () => { settings.volume[r.dataset.vol] = +r.value / 100; cb.onSettings?.('volume'); });
    }
    for (const r of s.querySelectorAll('[data-set-num]')) {
      r.addEventListener('input', () => { settings[r.dataset.setNum] = +r.value / 100; cb.onSettings?.(r.dataset.setNum); });
    }
    for (const sel of s.querySelectorAll('[data-set]')) {
      sel.addEventListener('change', () => { settings[sel.dataset.set] = sel.value; cb.onSettings?.(sel.dataset.set); });
    }
  }

  /** 作品の画面を足す。html は <section id="m-名前" class="modal hidden"> … </section> */
  addModal(name, html) {
    this.root.insertAdjacentHTML('beforeend', html);
    this.modals[name] = this.root.querySelector('#m-' + name);
    return this.modals[name];
  }

  /** 設定画面の表示を、今の設定にそろえる（開くたびに呼ぶ）。 */
  syncSettings() {
    const s = this.modals.settings;
    for (const r of s.querySelectorAll('[data-vol]')) r.value = Math.round(settings.volume[r.dataset.vol] * 100);
    for (const r of s.querySelectorAll('[data-set-num]')) r.value = Math.round((settings[r.dataset.setNum] ?? 1) * 100);
    for (const sel of s.querySelectorAll('[data-set]')) sel.value = settings[sel.dataset.set];
  }

  showTitle(on) { this.title.classList.toggle('hidden', !on); }

  setNetStatus(text) {
    if (!this.netStatus) return;
    this.netStatus.textContent = text || '';
    this.netStatus.classList.toggle('on', !!text);
  }

  setPlayBusy(on) {
    const st = this.title.querySelector('.start');
    if (st) st.disabled = !!on;
  }

  /** タイトルの「つづきから」を出すか（セーブのある作品で。main.js の onContinue とつなぐ）。 */
  setContinue(on) {
    this.title.querySelector('.continue')?.classList.toggle('hidden', !on);
    const st = this.title.querySelector('.start');
    // PLAY always means online quick-play (Kart / Quake style). Continue = solo save.
    st.dataset.i18n = 'title.play';
    st.textContent = t('title.play');
  }

  /** タイトルの「エンドレスじゃがいモード」を出すか（5 日間をクリアしたら）。 */
  /** Shore Season is reached from the ending screen — not a title shortcut. */
  setEndless() { this.title.querySelector('.endless')?.classList.add('hidden'); }

  open(name) {
    const m = this.modals[name];
    if (name === 'settings') this.syncSettings();
    applyDom(m);
    m.classList.remove('hidden');
    // 同じ画面を 2 回積まない（2 回積むと、もどる 1 回では閉じきらず、状態がその画面のまま戻れなくなる）。開いていれば、いちばん上へ
    const i = this.stack.indexOf(m);
    if (i >= 0) this.stack.splice(i, 1);
    this.stack.push(m);
    if (i < 0) this.cb.onModal?.(name, true);
  }

  /** いちばん上の画面を閉じる。閉じたら true。 */
  back() {
    const m = this.stack.pop();
    if (!m) return false;
    m.classList.add('hidden');
    this.cb.onModal?.(m.id.slice(2), false);
    return true;
  }

  closeAll() { while (this.back()); }

  get top() { return this.stack[this.stack.length - 1] || null; }
  isOpen(name) { return this.stack.includes(this.modals[name]); }

  /** MenuNav が操作する画面：いちばん上のモーダル、なければ（出ていれば）タイトルのメニュー。 */
  current() {
    if (this.top) return this.top;
    return this.title.classList.contains('hidden') ? null : this.title.querySelector('.menu');
  }
}
