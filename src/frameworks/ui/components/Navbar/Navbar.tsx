import { Link, useLocation } from 'react-router';
import { useAuthStore } from '../../stores/useAuthStore';
import { useUnreadCount } from '../../stores/store';
import { usePreferencesStore } from '../../stores/preferencesStore';
import { NotificationCenter } from '../Notifications/NotificationCenter';
import { Preferences } from '../Preferences/Preferences';
import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

export function Navbar() {
  const location = useLocation();
  const { profile, logout, login } = useAuthStore();
  const unreadCount = useUnreadCount();
  const { theme } = usePreferencesStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const preferencesRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/public-area', label: 'Public Area' },
    { path: '/users', label: 'Users' },
    { path: '/admin-area', label: 'Admin Area', requiresAdmin: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showNotifications &&
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        showPreferences &&
        preferencesRef.current &&
        !preferencesRef.current.contains(event.target as Node)
      ) {
        setShowPreferences(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showPreferences]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2L3 9L16 16L29 9L16 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 23L16 30L29 23"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 16L16 23L29 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Your App</span>
          </Link>
        </div>

        <div className="navbar-menu">
          {navItems.map(({ path, label, requiresAdmin }) =>
            requiresAdmin && !profile?.attributes?.['isAdmin'] ? null : (
              <Link
                key={path}
                to={path}
                className={`navbar-item ${isActive(path) ? 'active' : ''}`}
              >
                {label}
              </Link>
            ),
          )}
        </div>

        <div className="navbar-end">
          {profile ? (
            <div className="navbar-user-menu">
              <div className="navbar-dropdown-container" ref={notificationsRef}>
                <button
                  className="navbar-icon-button"
                  onClick={e => {
                    e.stopPropagation();
                    setShowNotifications(!showNotifications);
                    setShowPreferences(false);
                  }}
                >
                  <span className="icon">🔔</span>
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </button>
                {showNotifications && (
                  <div className="navbar-dropdown notifications-dropdown">
                    <NotificationCenter />
                  </div>
                )}
              </div>

              <div className="navbar-dropdown-container" ref={preferencesRef}>
                <button
                  className="navbar-icon-button"
                  onClick={e => {
                    e.stopPropagation();
                    setShowPreferences(!showPreferences);
                    setShowNotifications(false);
                  }}
                >
                  <span className="icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
                </button>
                {showPreferences && (
                  <div className="navbar-dropdown preferences-dropdown">
                    <Preferences />
                  </div>
                )}
              </div>

              <Link to="/profile" className="navbar-profile">
                <div className="navbar-avatar">
                  {profile.firstName?.[0]?.toUpperCase() || 'U'}
                </div>
                <span>{profile.firstName}</span>
              </Link>
              <button onClick={logout} className="navbar-logout">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => login()} className="navbar-login">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
