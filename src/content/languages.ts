/**
 * The 70 content languages of the project.
 *
 * `code` is a BCP 47 tag; it is used for `lang` attributes, Intl.DisplayNames
 * and as the key for translation files (src/content/verses/*.json → translations[code]).
 *
 * These modern 70 languages are a conceptual bridge to the "seventy languages"
 * of classical Jewish tradition — they are NOT the same list. See /seventy.
 */
export type Region =
  | 'europe'
  | 'middleEast'
  | 'southAsia'
  | 'eastAsia'
  | 'southeastAsia'
  | 'centralAsia'
  | 'africa'
  | 'classical';

export interface ContentLanguage {
  code: string;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
  region: Region;
  /** Shown on the home page "70 languages" constellation. */
  featured?: boolean;
}

const l = (
  code: string,
  nativeName: string,
  englishName: string,
  region: Region,
  opts: { rtl?: boolean; featured?: boolean } = {},
): ContentLanguage => ({
  code,
  nativeName,
  englishName,
  region,
  dir: opts.rtl ? 'rtl' : 'ltr',
  featured: opts.featured,
});

export const LANGUAGES: readonly ContentLanguage[] = [
  l('en', 'English', 'English', 'europe', { featured: true }),
  l('zh', '中文', 'Chinese', 'eastAsia', { featured: true }),
  l('hi', 'हिन्दी', 'Hindi', 'southAsia', { featured: true }),
  l('es', 'Español', 'Spanish', 'europe', { featured: true }),
  l('ar', 'العربية', 'Arabic', 'middleEast', { rtl: true, featured: true }),
  l('fr', 'Français', 'French', 'europe', { featured: true }),
  l('bn', 'বাংলা', 'Bengali', 'southAsia', { featured: true }),
  l('pt', 'Português', 'Portuguese', 'europe', { featured: true }),
  l('ru', 'Русский', 'Russian', 'europe', { featured: true }),
  l('ur', 'اردو', 'Urdu', 'southAsia', { rtl: true }),
  l('id', 'Bahasa Indonesia', 'Indonesian', 'southeastAsia', { featured: true }),
  l('de', 'Deutsch', 'German', 'europe', { featured: true }),
  l('ja', '日本語', 'Japanese', 'eastAsia', { featured: true }),
  l('pa', 'ਪੰਜਾਬੀ', 'Punjabi', 'southAsia'),
  l('mr', 'मराठी', 'Marathi', 'southAsia'),
  l('te', 'తెలుగు', 'Telugu', 'southAsia'),
  l('tr', 'Türkçe', 'Turkish', 'middleEast', { featured: true }),
  l('vi', 'Tiếng Việt', 'Vietnamese', 'southeastAsia'),
  l('ko', '한국어', 'Korean', 'eastAsia', { featured: true }),
  l('fa', 'فارسی', 'Persian', 'middleEast', { rtl: true, featured: true }),
  l('he', 'עברית', 'Hebrew', 'middleEast', { rtl: true, featured: true }),
  l('yi', 'ייִדיש', 'Yiddish', 'europe', { rtl: true }),
  l('it', 'Italiano', 'Italian', 'europe', { featured: true }),
  l('pl', 'Polski', 'Polish', 'europe', { featured: true }),
  l('nl', 'Nederlands', 'Dutch', 'europe'),
  l('uk', 'Українська', 'Ukrainian', 'europe', { featured: true }),
  l('be', 'Беларуская', 'Belarusian', 'europe'),
  l('hu', 'Magyar', 'Hungarian', 'europe'),
  l('cs', 'Čeština', 'Czech', 'europe'),
  l('el', 'Ελληνικά', 'Greek', 'europe'),
  l('ro', 'Română', 'Romanian', 'europe'),
  l('bg', 'Български', 'Bulgarian', 'europe'),
  l('sr', 'Српски', 'Serbian', 'europe'),
  l('da', 'Dansk', 'Danish', 'europe'),
  l('fi', 'Suomi', 'Finnish', 'europe'),
  l('nb', 'Norsk', 'Norwegian', 'europe'),
  l('sv', 'Svenska', 'Swedish', 'europe'),
  l('ms', 'Bahasa Melayu', 'Malay', 'southeastAsia'),
  l('th', 'ไทย', 'Thai', 'southeastAsia', { featured: true }),
  l('kk', 'Қазақ тілі', 'Kazakh', 'centralAsia'),
  l('uz', 'Oʻzbekcha', 'Uzbek', 'centralAsia'),
  l('ka', 'ქართული', 'Georgian', 'centralAsia'),
  l('hy', 'Հայերեն', 'Armenian', 'centralAsia'),
  l('az', 'Azərbaycanca', 'Azerbaijani', 'centralAsia'),
  l('tt', 'Татарча', 'Tatar', 'centralAsia'),
  l('am', 'አማርኛ', 'Amharic', 'africa'),
  l('sq', 'Shqip', 'Albanian', 'europe'),
  l('lv', 'Latviešu', 'Latvian', 'europe'),
  l('lt', 'Lietuvių', 'Lithuanian', 'europe'),
  l('et', 'Eesti', 'Estonian', 'europe'),
  l('is', 'Íslenska', 'Icelandic', 'europe'),
  l('cy', 'Cymraeg', 'Welsh', 'europe'),
  l('sw', 'Kiswahili', 'Swahili', 'africa'),
  l('zu', 'isiZulu', 'Zulu', 'africa'),
  l('af', 'Afrikaans', 'Afrikaans', 'africa'),
  l('ta', 'தமிழ்', 'Tamil', 'southAsia'),
  l('gu', 'ગુજરાતી', 'Gujarati', 'southAsia'),
  l('kn', 'ಕನ್ನಡ', 'Kannada', 'southAsia'),
  l('ml', 'മലയാളം', 'Malayalam', 'southAsia'),
  l('si', 'සිංහල', 'Sinhala', 'southAsia'),
  l('my', 'မြန်မာ', 'Burmese', 'southeastAsia'),
  l('km', 'ខ្មែរ', 'Khmer', 'southeastAsia'),
  l('lo', 'ລາວ', 'Lao', 'southeastAsia'),
  l('mn', 'Монгол', 'Mongolian', 'eastAsia'),
  l('tl', 'Tagalog', 'Tagalog', 'southeastAsia'),
  l('mk', 'Македонски', 'Macedonian', 'europe'),
  l('sl', 'Slovenščina', 'Slovenian', 'europe'),
  l('sk', 'Slovenčina', 'Slovak', 'europe'),
  l('la', 'Latina', 'Latin', 'classical'),
  l('eo', 'Esperanto', 'Esperanto', 'classical'),
];

export const LANGUAGE_BY_CODE: ReadonlyMap<string, ContentLanguage> = new Map(
  LANGUAGES.map((lang) => [lang.code, lang]),
);

export const FEATURED_LANGUAGES = LANGUAGES.filter((lang) => lang.featured);

export const REGIONS: readonly Region[] = [
  'europe',
  'middleEast',
  'southAsia',
  'eastAsia',
  'southeastAsia',
  'centralAsia',
  'africa',
  'classical',
];

export function getLanguage(code: string): ContentLanguage | undefined {
  return LANGUAGE_BY_CODE.get(code);
}
