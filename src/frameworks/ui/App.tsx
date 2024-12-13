import { Route, Routes } from 'react-router';
import { UserDetails } from './pages/UserDetails/UserDetails';
import { Users } from './pages/Users/Users';
import { Profile } from './pages/Profile/Profile';
import { Home } from './pages/Application/Home';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { AuthLoader } from './components/AuthLoader/AuthLoader';
import { WebSocketLoader } from './components/WebSocketLoader/WebSocketLoader';

function App() {
  return (
    <ErrorBoundary>
      <AuthLoader />
      <WebSocketLoader />
      <main className="app-main">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users" element={<Users />}>
              <Route index element={<div>Select a user to view details</div>} />
              <Route path=":id" element={<UserDetails />} />
            </Route>
            <Route path="public-area" element={<div>Public Area</div>} />
            <Route path="admin-area" element={<div>Admin Area</div>} />
          </Route>
        </Routes>
      </main>
    </ErrorBoundary>
  );
}

export default App;
