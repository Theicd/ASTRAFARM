/**
 * Install / Add to Home Screen — same shape as Kart Royale + SOS Quake:
 * Chrome/Edge → beforeinstallprompt; iOS → Share tip; desktop → install / shortcut.
 */
import { t } from '../core/i18n.js';

const isStandalone = () =>
  matchMedia('(display-mode: fullscreen), (display-mode: standalone)').matches
  || navigator.standalone === true;

const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent)
  || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const ICON = './icons/icon-192.png';

const CSS = `
.af-install-btn{
  position:absolute;z-index:5;top:calc(env(safe-area-inset-top,0px) + 10px);
  inset-inline-end:calc(env(safe-area-inset-right,0px) + 10px);
  width:44px;height:44px;padding:0;min-width:0;border-radius:0;cursor:pointer;
  display:grid;place-items:center;background:#6a6a6a;border:2px solid #000;
  box-shadow:inset 2px 2px 0 #aaa,inset -2px -2px 0 #444;color:#fff;
}
.af-install-btn:hover,.af-install-btn.gp-focus{background:#7d88c4}
.af-install-btn svg{width:24px;height:24px;display:block}
.af-install-btn.hide{display:none}
.af-idlg{position:fixed;inset:0;z-index:200;display:none;place-items:center;padding:16px;
  background:rgba(0,0,0,.55);pointer-events:auto}
.af-idlg.show{display:grid}
.af-idlg-card{width:min(420px,100%);padding:1.1em 1.2em;background:var(--paper,#c6c6c6);
  border:3px solid #000;box-shadow:inset 3px 3px 0 #fff,inset -3px -3px 0 #555,0 10px 40px rgba(0,0,0,.45);
  color:#3a3a3a;text-align:center;font:inherit}
.af-idlg-card img{width:64px;height:64px;image-rendering:pixelated;border:2px solid #000}
.af-idlg-card h3{margin:.6em 0 .35em;font-weight:400;font-size:1.25em}
.af-idlg-card p{margin:0 0 .4em;font-size:.92em;line-height:1.55}
.af-idlg-card ul{margin:.4em 0 .8em;padding:0;list-style:none;font-size:.88em;color:#444}
.af-idlg-card li{margin:.25em 0}
.af-idlg-card b{color:#7a4a10}
.af-idlg-row{display:flex;gap:10px;justify-content:center;margin-top:.4em}
.af-idlg-row button{flex:1;min-width:0}
`;

const DL_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 20h14"/></svg>`;

let deferred = null;
let openDialog = () => {};

export function openInstallDialog() { openDialog(); }

export function installAppButton(titleEl) {
  if ('serviceWorker' in navigator) {
    addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  if (!document.getElementById('af-install-css')) {
    const st = document.createElement('style');
    st.id = 'af-install-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  const host = titleEl || document.querySelector('#title');
  if (!host) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'af-install-btn';
  btn.title = t('install.btn');
  btn.setAttribute('aria-label', t('install.btn'));
  btn.innerHTML = DL_SVG;
  host.appendChild(btn);

  const dlg = document.createElement('div');
  dlg.className = 'af-idlg';
  document.body.appendChild(dlg);
  const closeDlg = () => dlg.classList.remove('show');
  dlg.addEventListener('pointerdown', (e) => { e.stopPropagation(); if (e.target === dlg) closeDlg(); });
  dlg.addEventListener('click', (e) => e.stopPropagation());

  const sync = () => {
    btn.classList.toggle('hide', isStandalone());
  };

  const runPrompt = async () => {
    if (!deferred) return false;
    const d = deferred;
    deferred = null;
    try { await d.prompt(); await d.userChoice; } catch { /* dismissed */ }
    sync();
    return true;
  };

  openDialog = () => {
    const head = `<img alt="" src="${ICON}"><h3>${t('install.title')}</h3>`
      + `<p>${t('install.body')}</p>`
      + `<ul><li>${t('install.perk0')}</li><li>${t('install.perk1')}</li><li>${t('install.perk2')}</li></ul>`;

    if (isStandalone()) {
      dlg.innerHTML = `<div class="af-idlg-card">${head}<p>${t('install.already')}</p>`
        + `<div class="af-idlg-row"><button type="button" class="af-idlg-no">${t('install.gotIt')}</button></div></div>`;
      dlg.querySelector('.af-idlg-no').onclick = closeDlg;
      dlg.classList.add('show');
      return;
    }

    if (deferred) {
      dlg.innerHTML = `<div class="af-idlg-card">${head}<p>${t('install.confirm')}</p>`
        + `<div class="af-idlg-row"><button type="button" class="af-idlg-no">${t('install.notNow')}</button>`
        + `<button type="button" class="af-idlg-ok">${t('install.ok')}</button></div></div>`;
      dlg.querySelector('.af-idlg-ok').onclick = () => { closeDlg(); void runPrompt(); };
      dlg.querySelector('.af-idlg-no').onclick = closeDlg;
      dlg.classList.add('show');
      return;
    }

    if (isIOS()) {
      dlg.innerHTML = `<div class="af-idlg-card">${head}`
        + `<p>${t('install.ios')}</p>`
        + `<div class="af-idlg-row"><button type="button" class="af-idlg-no">${t('install.gotIt')}</button></div></div>`;
      dlg.querySelector('.af-idlg-no').onclick = closeDlg;
      dlg.classList.add('show');
      return;
    }

    dlg.innerHTML = `<div class="af-idlg-card">${head}<p>${t('install.desktop')}</p>`
      + `<div class="af-idlg-row"><button type="button" class="af-idlg-no">${t('install.gotIt')}</button></div></div>`;
    dlg.querySelector('.af-idlg-no').onclick = closeDlg;
    dlg.classList.add('show');
  };

  addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
    sync();
  });
  addEventListener('appinstalled', () => { deferred = null; closeDlg(); sync(); });

  btn.addEventListener('pointerdown', (e) => e.stopPropagation());
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (deferred) void runPrompt();
    else openDialog();
  });

  sync();
}
