export function calculateRadius(radius: number | null): number | null {
  return radius === null ? null : Number((Math.PI * radius ** 2).toFixed(2));
}