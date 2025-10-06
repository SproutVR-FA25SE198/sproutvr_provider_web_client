export function normalizeText(str: string): string {
  return str
    .normalize('NFD') // separate accents from base letters
    .replace(/[\u0300-\u036f]/g, '') // remove accent marks
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}
