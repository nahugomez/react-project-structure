import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'es' | 'fr' | 'pt' | 'de';

interface Region {
  code: string;
  timezone: string;
  currency: string;
}

interface PreferencesState {
  // State
  theme: Theme;
  language: Language;
  region: Region;
  fontSize: number;
  type: 'user' | 'system';
  reducedMotion: boolean;

  // Actions
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setRegion: (region: Region) => void;
  setFontSize: (size: number) => void;
  setReducedMotion: (enabled: boolean) => void;
  resetPreferences: () => void;
}

const defaultPreferences = {
  theme: 'system' as Theme,
  language: 'en' as Language,
  type: 'user' as 'user' | 'system',
  region: {
    code: 'US',
    timezone: 'America/New_York',
    currency: 'USD',
  },
  fontSize: 16,
  reducedMotion: false,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    set => ({
      // Initial state
      ...defaultPreferences,

      // Actions
      setTheme: theme =>
        set(() => {
          // Apply theme to document
          document.documentElement.setAttribute('data-theme', theme);
          return { theme };
        }),

      setLanguage: language =>
        set(() => {
          // Update document lang attribute
          document.documentElement.setAttribute('lang', language);
          return { language };
        }),

      setRegion: region => set({ region }),

      setFontSize: fontSize =>
        set(() => {
          // Apply font size to root element
          document.documentElement.style.fontSize = `${fontSize}px`;
          return { fontSize };
        }),

      setReducedMotion: reducedMotion =>
        set(() => {
          // Apply reduced motion preference
          document.documentElement.setAttribute(
            'data-reduced-motion',
            reducedMotion.toString(),
          );
          return { reducedMotion };
        }),

      resetPreferences: () => set(defaultPreferences),
    }),
    {
      name: 'user-preferences',
      // Only store these values in localStorage
      partialize: state => ({
        theme: state.theme,
        type: state.type,
        language: state.language,
        region: state.region,
        fontSize: state.fontSize,
        reducedMotion: state.reducedMotion,
      }),
    },
  ),
);

// Selector hooks for optimal re-rendering
export const useTheme = () => usePreferencesStore(state => state.theme);
export const useLanguage = () => usePreferencesStore(state => state.language);
export const useRegion = () => usePreferencesStore(state => state.region);
export const useFontSize = () => usePreferencesStore(state => state.fontSize);
export const useReducedMotion = () =>
  usePreferencesStore(state => state.reducedMotion);
