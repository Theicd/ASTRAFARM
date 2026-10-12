// Localization. Dictionaries live in src/i18n/<lang>.js (same keys). Missing keys fall back to English.
import { en } from '../i18n/en.js';
import { he } from '../i18n/he.js';

export const LANGS = [
  { id: 'he', label: 'עברית' },
  { id: 'en', label: 'English' },
];
const DICTS = { he, en };

let current = 'en';
const listeners = new Set();

export const isLang = (v) => typeof v === 'string' && v in DICTS;

/** Pick language from the browser (Hebrew or English). */
export function detectLang() {
  const list = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const l of list) {
    const base = String(l || '').toLowerCase().split('-')[0];
    if (base === 'iw' || base === 'he') return 'he';
    if (isLang(base)) return base;
  }
  return 'en';
}

export const getLang = () => current;

export function setLang(l) {
  if (!isLang(l)) return;
  current = l;
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'he' ? 'rtl' : 'ltr';
  applyDom();
  for (const fn of listeners) fn(l);
}

export function onLangChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

export function t(key, p) {
  const raw = DICTS[current][key] ?? DICTS.en[key] ?? key;
  if (!p) return raw;
  return raw.replace(/\{(\w+)\}/g, (m, name) => (name in p ? String(p[name]) : m));
}

export function applyDom(root = document) {
  for (const el of root.querySelectorAll('[data-i18n]')) el.textContent = t(el.dataset.i18n);
  for (const el of root.querySelectorAll('[data-i18n-title]')) el.title = t(el.dataset.i18nTitle);
  for (const el of root.querySelectorAll('[data-i18n-aria]')) el.setAttribute('aria-label', t(el.dataset.i18nAria));
}

export function missingKeys() {
  const base = Object.keys(DICTS.en);
  return Object.fromEntries(Object.entries(DICTS).map(([l, d]) => [l, base.filter((k) => !(k in d))]));
}

/** Canonical dict for numbered dialogue variants. */
export function variantDict() { return DICTS.en; }
