export function formatNumber(num: number | null): string {
  if (num === null) {
    return "N/A";  
  }
  return num.toString();
}