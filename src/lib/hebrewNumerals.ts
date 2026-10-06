const ONES = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
const TENS = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
const HUNDREDS = ['', 'ק', 'ר', 'ש', 'ת'];

/** 1–499 → Hebrew numeral letters (15 → טו, 16 → טז). Used for verse numbers. */
export function toHebrewNumeral(n: number): string {
  if (!Number.isInteger(n) || n <= 0 || n >= 500) return String(n);
  const h = HUNDREDS[Math.floor(n / 100)];
  const rest = n % 100;
  if (rest === 15) return `${h}טו`;
  if (rest === 16) return `${h}טז`;
  return `${h}${TENS[Math.floor(rest / 10)]}${ONES[rest % 10]}`;
}
