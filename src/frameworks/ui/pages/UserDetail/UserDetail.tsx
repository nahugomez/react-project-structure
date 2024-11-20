import React from 'react';
import { useAuth } from '../../contexts/useAuth';

export const UserDetail: React.FC = () => {
  const { isAuthenticated, profile } = useAuth();

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Detail</h1>
      <p>Username: {profile?.username}</p>
      <p>Email: {profile?.email}</p>
    </div>
  );
};
