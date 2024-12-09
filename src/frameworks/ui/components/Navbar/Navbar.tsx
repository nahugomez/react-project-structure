import { Link } from 'react-router';
import { NotificationCenter } from '../Notifications/NotificationCenter';
import { Preferences } from '../Preferences/Preferences';
import { useAuthStore } from '../../stores/useAuthStore';
import { notificationWs } from '../../../../infrastructure/websocket/notificationWebSocket';
import { useEffect } from 'react';

export const Navbar = () => {
  const { isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      notificationWs.connect();
    }
  }, [isAuthenticated]);

  const onlyAuthenticated = !isAuthenticated ? { display: 'none' } : {};

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>Title</div>
      <ul style={{ display: 'flex', gap: '10px' }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/public-area">Public Area</Link>
        </li>
        <li style={onlyAuthenticated}>
          <Link to="/me">Profile</Link>
        </li>
        <li style={onlyAuthenticated}>
          <Link to="/admin-area">Admin Area</Link>
        </li>
      </ul>
      <div>
        {isAuthenticated ? (
          <button onClick={() => logout()}>Cerrar sessión</button>
        ) : (
          <button onClick={() => login()}>Iniciar sessión</button>
        )}
      </div>
      <div style={{ display: 'flex', gap: '10px', ...onlyAuthenticated }}>
        <NotificationCenter />
        <Preferences />
      </div>
    </div>
  );
};
