import { useEffect } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { notificationWs } from '@/infrastructure/websocket/notificationWebSocket';

export const WebSocketLoader = () => {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      notificationWs.connect();
    }

    return () => {
      notificationWs.disconnect();
    };
  }, [isAuthenticated]);

  return null;
};
