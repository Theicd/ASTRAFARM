// このゲームの画面：これまでのこと（はじめに）、1 日のおわりの報告、5 日間のおわり。
import { t, applyDom, onLangChange } from '../core/i18n.js';
import { BUY, PIG_SELL, SELL_PRICE } from '../game/economy.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function addGameModals(screens, atlas) {
  const icon = (n) => atlas.iconURL(n);
  fillHowtoGuide(screens, atlas);
  onLangChange(() => fillHowtoGuide(screens, atlas));
  screens.addModal('intro', `
<section id="m-intro" class="modal hidden"><div class="card story" data-scroll>
  <h2 data-i18n="intro.title">${t('intro.title')}</h2>
  <div class="story-body">
    ${[0, 1, 2, 3, 4, 5].map((i) => `<p data-i18n="intro.p${i}">${t('intro.p' + i)}</p>`).join('')}
  </div>
  <button data-act="introGo" data-i18n="intro.start">${t('intro.start')}</button>
</div></section>`);
  screens.addModal('report', `
<section id="m-report" class="modal hidden"><div class="card report">
  <h2 class="r-title"></h2>
  <div class="r-stats">
    <div class="st"><img alt="" src="${icon('item_potato')}"><span data-i18n="report.harvest">${t('report.harvest')}</span><b class="v-h"></b></div>
    <div class="st"><img alt="" src="${icon('item_powder')}"><span data-i18n="report.kills">${t('report.kills')}</span><b class="v-k"></b></div>
    <div class="st"><span class="boom"></span><span data-i18n="report.booms">${t('report.booms')}</span><b class="v-b"></b></div>
  </div>
  <p class="r-goal"></p>
  <p class="r-line"></p>
  <button data-act="nextDay" class="r-next" data-i18n="report.next">${t('report.next')}</button>
  <button data-act="toTitle" class="r-title-btn hidden" data-i18n="report.toTitle">${t('report.toTitle')}</button>
</div></section>`);
  screens.addModal('ending', `
<section id="m-ending" class="modal hidden"><div class="card ending" data-scroll>
  <h2 data-i18n="ending.title">${t('ending.title')}</h2>
  <p class="e-rank"></p>
  <div class="r-stats">
    <div class="st"><img alt="" src="${icon('item_potato')}"><span data-i18n="ending.total">${t('ending.total')}</span><b class="v-h"></b></div>
    <div class="st"><img alt="" src="${icon('item_powder')}"><span data-i18n="report.kills">${t('report.kills')}</span><b class="v-k"></b></div>
    <div class="st"><span class="star"></span><span data-i18n="ending.stars">${t('ending.stars')}</span><b class="v-s"></b></div>
    <div class="st"><img alt="" src="${icon('item_green')}"><span data-i18n="ending.green">${t('ending.green')}</span><b class="v-g"></b></div>
  </div>
  <p class="e-best"></p>
  <div class="e-lines"></div>
  <p class="e-unlock hidden" data-i18n="ending.unlock">${t('ending.unlock')}</p>
  <button data-act="endlessGo" data-i18n="ending.endless">${t('ending.endless')}</button>
  <button data-act="toTitle" data-i18n="ending.toTitle">${t('ending.toTitle')}</button>
</div></section>`);
  screens.addModal('endless', `
<section id="m-endless" class="modal hidden"><div class="card">
  <h2 data-i18n="title.endless">${t('title.endless')}</h2>
  <p class="body" data-i18n="endless.body">${t('endless.body')}</p>
  <button data-act="endlessContinue" class="en-cont"></button>
  <button data-act="endlessNew" data-i18n="endless.new">${t('endless.new')}</button>
  <button data-act="back" data-i18n="ui.back">${t('ui.back')}</button>
</div></section>`);
}

/** Icon guide for hotbar tools + economy (arcade-style howto). */
export function fillHowtoGuide(screens, atlas) {
  const box = screens.modals?.howto?.querySelector('.howto-guide');
  if (!box || !atlas) return;
  const icon = (n) => atlas.iconURL(n);
  const row = (src, titleKey, body, extra = '') => `
    <div class="guide-row">
      <img alt="" src="${src}">
      <div><b data-i18n="${titleKey}">${t(titleKey)}</b><span>${esc(body)}${extra}</span></div>
    </div>`;
  const tools = [
    ['item_sword', 'item.sword', t('howto.tool.sword')],
    ['item_hoe', 'item.hoe', t('howto.tool.hoe')],
    ['item_seed', 'item.seed', t('howto.tool.seed')],
    ['item_dirt', 'item.dirt', t('howto.tool.dirt')],
    ['item_powder', 'item.powder', t('howto.tool.powder')],
    ['item_turret', 'item.turret', t('howto.tool.turret', { n: BUY.turret })],
  ];
  const crops = [
    ['item_potato', 'item.potato', SELL_PRICE.potato],
    ['item_wheat', 'item.wheat', SELL_PRICE.wheat],
    ['item_carrot', 'item.carrot', SELL_PRICE.carrot],
    ['item_corn', 'item.corn', SELL_PRICE.corn],
  ];
  box.innerHTML = `
    <h3 data-i18n="howto.tools">${t('howto.tools')}</h3>
    <div class="guide-grid">${tools.map(([img, tk, body]) => row(icon(img), tk, body)).join('')}</div>
    <h3 data-i18n="howto.economy">${t('howto.economy')}</h3>
    <div class="guide-grid">
      <div class="guide-row">
        <span class="guide-pig" aria-hidden="true"></span>
        <div><b data-i18n="howto.pig">${t('howto.pig')}</b><span>${esc(t('howto.pigVal', { n: PIG_SELL }))}</span></div>
      </div>
      ${crops.map(([img, tk, n]) => row(icon(img), tk, t('howto.sellVal', { n }))).join('')}
    </div>`;
  applyDom(box);
}

/** エンドレスの画面の「つづきから（N 日目）」。 */
export function fillEndless(screens, day) {
  const b = screens.modals.endless.querySelector('.en-cont');
  b.textContent = t('endless.continue', { n: day });
}

export function fillReport(screens, d) {
  const m = screens.modals.report;
  m.querySelector('.r-title').textContent = t('report.title', { n: d.day });
  m.querySelector('.v-h').textContent = d.harvest;
  m.querySelector('.v-k').textContent = d.kills;
  m.querySelector('.v-b').textContent = d.booms;
  const g = m.querySelector('.r-goal');
  g.textContent = d.harvest >= d.goal ? t('report.goalOk') : t('report.goalNg', { n: d.goal - d.harvest });
  g.classList.toggle('ok', d.harvest >= d.goal);
  m.querySelector('.r-line').innerHTML = `<span class="who">${esc(t('name.astra'))}</span> ${esc(d.line)}`;
  const nb = m.querySelector('.r-next');
  nb.dataset.i18n = d.last ? 'report.last' : 'report.next';
  // エンドレス：ここで区切ってタイトルへ（つぎの日の朝として保存してある）
  m.querySelector('.r-title-btn').classList.toggle('hidden', !d.endless);
  applyDom(m);
}

export function fillEnding(screens, d) {
  const m = screens.modals.ending;
  m.querySelector('.e-rank').innerHTML = `<small>${esc(t('ending.rank'))}</small>${esc(t('rank.' + d.rank))}`;
  m.querySelector('.v-h').textContent = d.harvest;
  m.querySelector('.v-k').textContent = d.kills;
  m.querySelector('.v-s').textContent = `${d.stars} / 5`;
  m.querySelector('.v-g').textContent = d.green;
  m.querySelector('.e-best').textContent = d.newBest ? t('ending.new') : d.best ? t('ending.best', { n: d.best }) : '';
  m.querySelector('.e-best').classList.toggle('new', !!d.newBest);
  m.querySelector('.e-unlock').classList.toggle('hidden', !d.unlocked);
  m.querySelector('.e-lines').innerHTML = [0, 1, 2].map((i) => `<p><span class="who">&lt;${esc(t('name.astra'))}&gt;</span> ${esc(t('ending.line.' + i))}</p>`).join('');
}
