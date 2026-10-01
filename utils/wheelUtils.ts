const TAU = 2 * Math.PI;
export const normalizeAngle = (angle: number): number => ((angle % TAU) + TAU) % TAU;

// The pointer is at 3 o'clock. Stop at the middle of the chosen slice.
export function rotationForIndex(index: number, count: number, current: number): number {
  const target = normalizeAngle(-(index + 0.5) * TAU / count);
  return current + 5 * TAU + normalizeAngle(target - normalizeAngle(current));
}

export function indexAtPointer(rotation: number, count: number): number {
  return Math.floor(normalizeAngle(-rotation) / (TAU / count));
}
