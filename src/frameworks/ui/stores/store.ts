import { useUserStore } from './userStore';
import { usePreferencesStore } from './preferencesStore';
import { useNotificationStore } from './notificationStore';

export const useBoundStore = () => ({
  ...useUserStore(),
  ...usePreferencesStore(),
  ...useNotificationStore(),
});

// Type-safe selectors
export const useNotifications = () =>
  useNotificationStore(state => state.notifications);
export const useUnreadCount = () =>
  useNotificationStore(
    state => state.notifications.filter(n => !n.read).length,
  );
