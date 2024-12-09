import { Route, Routes } from 'react-router';
import { UserDetails } from './pages/UserDetails/UserDetails';
import { Home } from './pages/Application/Home';
import { Layout } from './components/Layout';
import { useEffect } from 'react';
import { useAuthStore } from './stores/useAuthStore';

function App() {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div className="app">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="me" element={<UserDetails />} />
          <Route path="public-area" element={<div>Public Area</div>} />
          <Route path="admin-area" element={<div>Admin Area</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
