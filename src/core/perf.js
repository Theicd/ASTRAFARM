// Device capability hints for quality presets and auto-scaling.
export function isTouchPrimary() {
  if (typeof navigator === 'undefined') return false;
  try {
    if (typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches) return true;
  } catch { /* ignore */ }
  return (navigator.maxTouchPoints | 0) > 0;
}

/** Phones / weak GPUs: start cheaper and cap resolution harder. */
export function isWeakDevice() {
  if (typeof navigator === 'undefined') return false;
  if (isTouchPrimary()) return true;
  const cores = navigator.hardwareConcurrency | 0;
  const mem = navigator.deviceMemory | 0; // Chrome only; GB
  if (cores && cores <= 4) return true;
  if (mem && mem <= 4) return true;
  try {
    if (navigator.connection?.saveData) return true;
  } catch { /* ignore */ }
  return false;
}
