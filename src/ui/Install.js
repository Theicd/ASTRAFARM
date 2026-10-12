/**
 * Install / Add to Home Screen — same flow as Kart Royale + SOS Quake:
 *   - index.html captures beforeinstallprompt early (window.__astraDeferredInstall)
 *   - download icon always visible on the title
 *   - Chrome/Edge: native prompt() on the click gesture
 *   - iOS: Share → Add to Home Screen tip
 *   - else: dialog that waits briefly for the deferred prompt
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
/* Lives in #title .title-tools (download left of settings gear) */
.af-install-btn{
  width:48px;height:48px;padding:0;min-width:0;border-radius:0;cursor:pointer;
  display:grid;place-items:center;background:#6a6a6a;border:2px solid #000;
  box-shadow:inset 2px 2px 0 #aaa,inset -2px -2px 0 #444;color:#fff;
  -webkit-tap-highlight-color:transparent;pointer-events:auto;position:relative;z-index:5;
}
.af-install-btn:hover,.af-install-btn.gp-focus{background:#7d88c4}
.af-install-btn svg{width:26px;height:26px;display:block;pointer-events:none}
.af-install-btn.hide{display:none!important}
.af-idlg{position:fixed;inset:0;z-index:220;display:none;place-items:center;padding:16px;
  background:rgba(0,0,0,.62);pointer-events:auto}
.af-idlg.show{display:grid}
.af-idlg-card{width:min(420px,100%);padding:1.15em 1.25em;background:var(--paper,#c6c6c6);
  border:3px solid #000;box-shadow:inset 3px 3px 0 #fff,inset -3px -3px 0 #555,0 10px 40px rgba(0,0,0,.45);
  color:#3a3a3a;text-align:center;font:inherit;max-height:calc(100dvh - 32px);overflow:auto;box-sizing:border-box}
.af-idlg-card img{width:64px;height:64px;image-rendering:pixelated;border:2px solid #000}
.af-idlg-card h3{margin:.6em 0 .35em;font-weight:400;font-size:1.25em}
.af-idlg-card p{margin:0 0 .4em;font-size:.92em;line-height:1.55}
.af-idlg-card ul{margin:.4em 0 .8em;padding:0;list-style:none;font-size:.88em;color:#444}
.af-idlg-card li{margin:.25em 0}
.af-idlg-card b{color:#7a4a10}
.af-idlg-row{display:flex;gap:10px;justify-content:center;margin-top:.4em}
.af-idlg-row button{flex:1;min-width:0;min-height:2.6em}
`;

const DL_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 20h14"/></svg>`;

let deferred = null;
let openDialog = () => {};

function pullDeferred() {
  try {
    if (window.__astraDeferredInstall) deferred = window.__astraDeferredInstall;
  } catch { /* ignore */ }
  return deferred;
}

function clearDeferred() {
  deferred = null;
  try { window.__astraDeferredInstall = null; } catch { /* ignore */ }
}

async function runPrompt() {
  const ev = pullDeferred();
  if (!ev || typeof ev.prompt !== 'function') return false;
  clearDeferred();
  try {
    await ev.prompt();
    await ev.userChoice;
  } catch { /* dismissed */ }
  return true;
}

export function openInstallDialog() { openDialog(); }

export function installAppButton() {
  if (!document.getElementById('af-install-css')) {
    const st = document.createElement('style');
    st.id = 'af-install-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  // Pick up event captured in index.html before modules finished loading.
  pullDeferred();

  // Register SW even if `load` already fired (module boot is often after load).
  if ('serviceWorker' in navigator) {
    const reg = () => navigator.serviceWorker.register('./sw.js?v=2').catch(() => {});
    if (document.readyState === 'complete') reg();
    else addEventListener('load', reg, { once: true });
  }

  if (isStandalone()) return;

  let btn = document.getElementById('af-install-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'af-install-btn';
    btn.className = 'af-install-btn tool-btn';
    const tools = document.querySelector('#title .title-tools');
    (tools || document.body).appendChild(btn);
  }
  btn.classList.add('af-install-btn', 'tool-btn');
  if (!btn.querySelector('svg')) btn.innerHTML = DL_SVG;
  btn.title = t('install.btn');
  btn.setAttribute('aria-label', t('install.btn'));
  btn.classList.remove('hide');

  let dlg = document.getElementById('af-install-dlg');
  if (!dlg) {
    dlg = document.createElement('div');
    dlg.id = 'af-install-dlg';
    dlg.className = 'af-idlg';
    document.body.appendChild(dlg);
  }
  const closeDlg = () => dlg.classList.remove('show');
  dlg.onclick = (e) => { if (e.target === dlg) closeDlg(); };

  const sync = () => {
    btn.classList.toggle('hide', isStandalone());
  };

  const showDialog = (opts) => {
    const perks = Array.isArray(opts.perks)
      ? `<ul>${opts.perks.map((p) => `<li>${p}</li>`).join('')}</ul>`
      : '';
    const iosLine = opts.ios
      ? `<p>${t('install.ios')}</p>`
      : '';

    if (opts.install) {
      dlg.innerHTML = `<div class="af-idlg-card">
        <img alt="" src="${ICON}">
        <h3>${opts.title}</h3>
        <p>${opts.body}</p>
        ${perks}
        <p>${t('install.confirm')}</p>
        <div class="af-idlg-row">
          <button type="button" class="af-idlg-no">${t('install.notNow')}</button>
          <button type="button" class="af-idlg-ok">${t('install.ok')}</button>
        </div>
      </div>`;
      dlg.querySelector('.af-idlg-no').onclick = closeDlg;
      dlg.querySelector('.af-idlg-ok').onclick = async () => {
        closeDlg();
        // SW may finish activating a moment after first paint — wait briefly (Quake).
        for (let i = 0; i < 25; i++) {
          pullDeferred();
          if (deferred) {
            await runPrompt();
            sync();
            return;
          }
          await new Promise((r) => setTimeout(r, 100));
        }
      };
    } else {
      dlg.innerHTML = `<div class="af-idlg-card">
        <img alt="" src="${ICON}">
        <h3>${opts.title}</h3>
        <p>${opts.body}</p>
        ${perks}
        ${iosLine}
        <div class="af-idlg-row">
          <button type="button" class="af-idlg-ok">${opts.ok || t('install.gotIt')}</button>
        </div>
      </div>`;
      dlg.querySelector('.af-idlg-ok').onclick = closeDlg;
    }
    dlg.classList.add('show');
  };

  openDialog = () => {
    void onInstallClick();
  };

  async function onInstallClick() {
    if (isStandalone()) {
      showDialog({
        title: t('install.title'),
        body: t('install.already'),
        ok: t('install.gotIt'),
      });
      return;
    }

    pullDeferred();
    if (deferred) {
      // Kart floating install: fire native prompt on the same user gesture.
      await runPrompt();
      sync();
      return;
    }

    if (isIOS()) {
      showDialog({
        title: t('install.title'),
        body: t('install.body'),
        perks: [t('install.perk0'), t('install.perk1'), t('install.perk2')],
        ios: true,
        ok: t('install.gotIt'),
      });
      return;
    }

    // Prompt may still arrive shortly after SW activates.
    showDialog({
      title: t('install.title'),
      body: t('install.body'),
      perks: [t('install.perk0'), t('install.perk1'), t('install.perk2')],
      install: true,
    });
  }

  addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
    try { window.__astraDeferredInstall = e; } catch { /* ignore */ }
    sync();
  });
  addEventListener('appinstalled', () => {
    clearDeferred();
    closeDlg();
    sync();
  });

  btn.onpointerdown = (e) => e.stopPropagation();
  btn.onclick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    void onInstallClick();
  };

  // Hide while in-game (title hidden); show again on title.
  const tick = () => {
    const title = document.getElementById('title');
    const onTitle = title && !title.classList.contains('hidden');
    btn.classList.toggle('hide', isStandalone() || !onTitle);
  };
  setInterval(tick, 500);
  tick();
  sync();
}
