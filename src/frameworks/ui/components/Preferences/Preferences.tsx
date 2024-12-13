import React from 'react';
import {
  Language,
  Theme,
  usePreferencesStore,
} from '../../stores/preferencesStore';
import './Preferences.css';

export const Preferences: React.FC = () => {
  const {
    theme,
    language,
    fontSize,
    reducedMotion,
    setTheme,
    setLanguage,
    setFontSize,
    setReducedMotion,
  } = usePreferencesStore();

  return (
    <div className="preferences-panel">
      <h3>Preferences</h3>

      <div className="preference-group">
        <label>
          Theme:
          <select
            value={theme}
            onChange={e => setTheme(e.target.value as Theme)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </label>
      </div>

      <div className="preference-group">
        <label>
          Language:
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as Language)}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </label>
      </div>

      <div className="preference-group">
        <label>
          Font Size:
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
          />
          <span>{fontSize}px</span>
        </label>
      </div>

      <div className="preference-group">
        <label>
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={e => setReducedMotion(e.target.checked)}
          />
          Reduce Motion
        </label>
      </div>
    </div>
  );
};
