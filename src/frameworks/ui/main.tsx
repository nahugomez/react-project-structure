import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { usePreferencesStore } from './stores/preferencesStore';
import { notificationWs } from '../../infrastructure/websocket/notificationWebSocket.ts';
import './styles/global.css';
import { AuthProvider } from './contexts/AuthContext';

// Initialize preferences and WebSocket
const initialize = () => {
  const { theme, language, fontSize, reducedMotion } =
    usePreferencesStore.getState();

  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('lang', language);
  document.documentElement.style.fontSize = `${fontSize}px`;
  document.documentElement.setAttribute(
    'data-reduced-motion',
    reducedMotion.toString(),
  );

  // Initialize WebSocket connection
  notificationWs.connect();
};

async function initMockServiceWorker() {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('../../infrastructure/mocks/browser');
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
  return Promise.resolve();
}

// Initialize MSW before rendering the app
initMockServiceWorker().then(() => {
  initialize();
  createRoot(document.getElementById('root')!).render(
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>,
  );
});
