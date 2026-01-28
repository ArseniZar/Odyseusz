
export function getFlagUrl(countryCode: string, size: number = 64): string {
  const code = countryCode.toUpperCase();
  return `https://flagsapi.com/${code}/shiny/${size}.png`;
}

