import React from 'react';
import {
  usePreferencesStore,
  Theme,
  Language,
} from '../../stores/preferencesStore';

const availableThemes: Theme[] = ['light', 'dark', 'system'];
const availableLanguages: Language[] = ['en', 'es', 'fr', 'pt', 'de'];
const availableRegions = [
  { code: 'US', timezone: 'America/New_York', currency: 'USD' },
  { code: 'GB', timezone: 'Europe/London', currency: 'GBP' },
  { code: 'FR', timezone: 'Europe/Paris', currency: 'EUR' },
  // Add more regions as needed
];

export const Settings: React.FC = () => {
  const {
    theme,
    language,
    region,
    fontSize,
    reducedMotion,
    setTheme,
    setLanguage,
    setRegion,
    setFontSize,
    setReducedMotion,
    resetPreferences,
  } = usePreferencesStore();

  return (
    <div className="settings">
      <h2>Settings</h2>

      <section>
        <h3>Theme</h3>
        <select value={theme} onChange={e => setTheme(e.target.value as Theme)}>
          {availableThemes.map(t => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </section>

      <section>
        <h3>Language</h3>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value as Language)}
        >
          {availableLanguages.map(lang => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </section>

      <section>
        <h3>Region</h3>
        <select
          value={region.code}
          onChange={e => {
            const selectedRegion = availableRegions.find(
              r => r.code === e.target.value,
            );
            if (selectedRegion) setRegion(selectedRegion);
          }}
        >
          {availableRegions.map(r => (
            <option key={r.code} value={r.code}>
              {r.code} ({r.currency})
            </option>
          ))}
        </select>
      </section>

      <section>
        <h3>Font Size</h3>
        <input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={e => setFontSize(Number(e.target.value))}
        />
        <span>{fontSize}px</span>
      </section>

      <section>
        <h3>Accessibility</h3>
        <label>
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={e => setReducedMotion(e.target.checked)}
          />
          Reduce Motion
        </label>
      </section>

      <button onClick={resetPreferences}>Reset to Defaults</button>
    </div>
  );
};
