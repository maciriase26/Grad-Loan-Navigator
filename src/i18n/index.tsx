import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DICTIONARIES,
  LANGUAGES,
  en,
  type Language,
  type TranslationKey,
} from "./translations";

const STORAGE_KEY = "grad-navigator-lang";

type I18nValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => en[key],
});

function isLanguage(value: string | null | undefined): value is Language {
  return !!value && LANGUAGES.some((l) => l.code === value);
}

function detectLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) return stored;
  } catch {
    /* storage unavailable */
  }
  const candidates = [navigator.language, ...(navigator.languages ?? [])];
  for (const candidate of candidates) {
    const base = candidate?.split("-")[0]?.toLowerCase();
    if (isLanguage(base)) return base;
  }
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always render English first so SSR markup matches the initial client render.
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const detected = detectLanguage();
    if (detected !== "en") setLangState(detected);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const dict = DICTIONARIES[lang] ?? {};
    return {
      lang,
      setLang,
      t: (key: TranslationKey) => dict[key] ?? en[key],
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export { LANGUAGES };
export type { Language, TranslationKey };
