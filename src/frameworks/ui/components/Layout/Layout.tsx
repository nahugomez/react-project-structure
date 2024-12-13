import { Outlet } from 'react-router';
import { Navbar } from '../Navbar/Navbar';

export const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '10px' }}>
        <Outlet />
      </div>
    </>
  );
};
