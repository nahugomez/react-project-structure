import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

export const UserDetails: React.FC = () => {
  const { isAuthenticated, profile } = useAuthStore();

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
