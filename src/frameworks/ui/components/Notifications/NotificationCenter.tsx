import React from 'react';
import {
  useBoundStore,
  useNotifications,
  useUnreadCount,
} from '../../stores/store';
import './NotificationCenter.css';

export const NotificationCenter: React.FC = () => {
  const notifications = useNotifications();
  const unreadCount = useUnreadCount();
  const { markAsRead, markAllAsRead, removeNotification, wsConnected } =
    useBoundStore();

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h3>Notifications {unreadCount > 0 && `(${unreadCount})`}</h3>
        <div className="notification-actions">
          <button onClick={markAllAsRead}>Mark all as read</button>
          <span
            className={`connection-status ${wsConnected ? 'connected' : 'disconnected'}`}
          >
            {wsConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="notification-list">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
          >
            <div className="notification-content">
              <p>{notification.message}</p>
              <small>{new Date(notification.timestamp).toLocaleString()}</small>
            </div>
            <div className="notification-actions">
              {!notification.read && (
                <button onClick={() => markAsRead(notification.id)}>
                  Mark as read
                </button>
              )}
              <button onClick={() => removeNotification(notification.id)}>
                Dismiss
              </button>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="no-notifications">No notifications</div>
        )}
      </div>
    </div>
  );
};
