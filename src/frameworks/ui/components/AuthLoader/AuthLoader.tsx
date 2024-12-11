import { useEffect } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

export const AuthLoader = () => {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return null;
};
