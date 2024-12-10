import { Route, Routes } from 'react-router-dom';
import { UserDetail } from './pages/UserDetail/UserDetail';
import { NotificationCenter } from './components/Notifications/NotificationCenter';
import { Preferences } from './components/Preferences/Preferences';
import { Button } from './ui/button';
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
          <Button variant="outline">Hello</Button>
          <Preferences />
        </div>
      </div>

      <Routes>
        <Route path="users">
          <Route path=":id" element={<UserDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
