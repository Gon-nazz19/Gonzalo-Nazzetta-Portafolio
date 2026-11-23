// Tarjetas que reaccionan al mouse: actualiza --mx/--my (brillo y borde)
// y, en las .fx-tilt, una inclinación 3D sutil. Solo con mouse.
const punteroFino = matchMedia('(hover: hover) and (pointer: fine)');
const movReducido = matchMedia('(prefers-reduced-motion: reduce)');
const INCLINACION = 7; // grados máximos

let actual: HTMLElement | null = null;
let ultimo: PointerEvent | null = null;
let frame = 0;

function soltar(card: HTMLElement) {
  card.classList.remove('inclinada');
  for (const v of ['--rx', '--ry', '--lift']) card.style.removeProperty(v);
}

function aplicar() {
  frame = 0;
  const e = ultimo;
  if (!e) return;
  const card = (e.target as Element | null)?.closest?.<HTMLElement>('.fx-card') ?? null;
  if (actual && actual !== card) soltar(actual);
  actual = card;
  if (!card) return;

  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  card.style.setProperty('--mx', `${x}px`);
  card.style.setProperty('--my', `${y}px`);

  if (card.classList.contains('fx-tilt') && !movReducido.matches) {
    const px = Math.min(Math.max(x / r.width, 0), 1) - 0.5;
    const py = Math.min(Math.max(y / r.height, 0), 1) - 0.5;
    card.style.setProperty('--ry', `${(px * INCLINACION * 2).toFixed(2)}deg`);
    card.style.setProperty('--rx', `${(-py * INCLINACION * 2).toFixed(2)}deg`);
    card.style.setProperty('--lift', '-4px');
    card.classList.add('inclinada');
  }
}

document.addEventListener(
  'pointermove',
  (e) => {
    if (e.pointerType !== 'mouse' || !punteroFino.matches) return;
    ultimo = e;
    if (!frame) frame = requestAnimationFrame(aplicar);
  },
  { passive: true },
);
document.documentElement.addEventListener('mouseleave', () => {
  if (actual) soltar(actual);
  actual = null;
});
