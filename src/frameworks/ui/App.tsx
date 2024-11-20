import { Route, Routes } from 'react-router-dom';
import { UserDetail } from './pages/UserDetail/UserDetail';
import { Home } from './pages/Application/Home';
import { NotificationCenter } from './components/Notifications/NotificationCenter';
import { Preferences } from './components/Preferences/Preferences';

function App() {
  return (
    <div className="app">
      <div className="floating-panels">
        <div
          className="notification-wrapper"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            maxWidth: '400px',
            width: '100%',
          }}
        >
          <NotificationCenter />
        </div>

        <div
          className="preferences-wrapper"
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
          }}
        >
          <Preferences />
        </div>
      </div>

      <Routes>
        <Route index element={<Home />} />
        <Route path="users">
          <Route path=":id" element={<UserDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
