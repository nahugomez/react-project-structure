import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { initializePreferences } from './stores/preferencesStore';
import './styles/global.css';

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
  initializePreferences();
  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
});
