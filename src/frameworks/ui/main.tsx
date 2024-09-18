import { createRoot } from 'react-dom/client';
import { UserProvider } from './contexts/UserContext.tsx';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import('./../../infrastructure/mocks/browser.ts');
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>,
  );
});
