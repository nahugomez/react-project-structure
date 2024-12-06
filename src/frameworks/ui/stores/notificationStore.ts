import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: number;
  read: boolean;
  data?: unknown;
}

interface NotificationState {
  // State
  notifications: Notification[];
  wsConnected: boolean;

  // Actions
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  setWsConnected: (connected: boolean) => void;
}

export const useNotificationStore = create<NotificationState>()(
  devtools(set => ({
    notifications: [],
    wsConnected: false,

    addNotification: notification =>
      set(state => ({
        notifications: [
          {
            ...notification,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            read: false,
          },
          ...state.notifications,
        ].slice(0, 100), // Keep only last 100 notifications
      })),

    markAsRead: id =>
      set(state => ({
        notifications: state.notifications.map(notification =>
          notification.id === id
            ? { ...notification, read: true }
            : notification,
        ),
      })),

    markAllAsRead: () =>
      set(state => ({
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true,
        })),
      })),

    removeNotification: id =>
      set(state => ({
        notifications: state.notifications.filter(
          notification => notification.id !== id,
        ),
      })),

    clearAllNotifications: () => set({ notifications: [] }),

    setWsConnected: connected => set({ wsConnected: connected }),
  })),
);
