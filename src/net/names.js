/** Local player display name — saved on this device, no accounts. */
const KEY = 'astra-farm-name';
export const NAME_MAX = 12;

export function cleanName(v) {
  if (typeof v !== 'string') return '';
  return v.replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, NAME_MAX);
}

function load() {
  try { return cleanName(localStorage.getItem(KEY)); } catch { return ''; }
}

export const names = {
  player: load(),
  setPlayer(v) {
    this.player = cleanName(v);
    try { localStorage.setItem(KEY, this.player); } catch { /* blocked */ }
  },
};
