// HUD icons that stay readable at a small size: a gold coin face, and one seed pile.

function canvas() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  return c;
}

function coinURL() {
  const c = canvas();
  const g = c.getContext('2d');
  g.clearRect(0, 0, 128, 128);
  // Edge thickness so it reads as a coin, not a flat stamp.
  g.fillStyle = '#8a5a0c';
  g.beginPath();
  g.ellipse(64, 74, 46, 40, 0, 0, Math.PI * 2);
  g.fill();
  const face = g.createRadialGradient(50, 52, 6, 64, 60, 48);
  face.addColorStop(0, '#fff8d0');
  face.addColorStop(0.35, '#ffe14a');
  face.addColorStop(0.72, '#f0b429');
  face.addColorStop(1, '#c48412');
  g.fillStyle = face;
  g.beginPath();
  g.ellipse(64, 58, 44, 38, 0, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = '#7a4e08';
  g.lineWidth = 4;
  g.stroke();
  g.strokeStyle = '#fff3b0';
  g.lineWidth = 3;
  g.beginPath();
  g.ellipse(64, 58, 28, 22, 0, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = '#fff6c4';
  g.beginPath();
  g.ellipse(48, 46, 8, 5, -0.4, 0, Math.PI * 2);
  g.fill();
  return c.toDataURL('image/png');
}

function seedsURL() {
  const c = canvas();
  const g = c.getContext('2d');
  g.clearRect(0, 0, 128, 128);
  const seeds = [
    [64, 78, 22, 12, 0.4, '#e2b84a'],
    [40, 64, 18, 10, -0.5, '#c4923a'],
    [88, 62, 18, 10, 0.6, '#f0d060'],
    [62, 48, 16, 9, 0.15, '#d6a040'],
  ];
  for (const [x, y, rx, ry, rot, color] of seeds) {
    g.save();
    g.translate(x, y);
    g.rotate(rot);
    g.fillStyle = '#6e4a16';
    g.beginPath();
    g.ellipse(2, 3, rx, ry, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = color;
    g.beginPath();
    g.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = 'rgba(255,248,210,0.7)';
    g.beginPath();
    g.ellipse(-rx * 0.25, -ry * 0.3, rx * 0.28, ry * 0.22, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }
  return c.toDataURL('image/png');
}

/** Data URLs for the arcade strip. */
export function icon3dURLs() {
  return { coin: coinURL(), seeds: seedsURL() };
}
