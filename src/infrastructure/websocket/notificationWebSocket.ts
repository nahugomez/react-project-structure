import { useNotificationStore } from '../../frameworks/ui/stores/notificationStore';

class NotificationWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: number = 1000;

  connect() {
    const wsUrl =
      import.meta.env.VITE_WS_URL || 'ws://localhost:8080/notifications';

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = this.handleOpen;
    this.ws.onmessage = this.handleMessage;
    this.ws.onclose = this.handleClose;
    this.ws.onerror = this.handleError;
  }

  private handleOpen = () => {
    this.reconnectAttempts = 0;
    useNotificationStore.getState().setWsConnected(true);
  };

  private handleMessage = (event: MessageEvent) => {
    try {
      const notification = JSON.parse(event.data);
      console.log('Received notification:', notification);
      useNotificationStore.getState().addNotification(notification);
    } catch (error) {
      console.error('Failed to parse notification:', error);
    }
  };

  private handleClose = () => {
    useNotificationStore.getState().setWsConnected(false);
    this.attemptReconnect();
  };

  private handleError = (error: Event) => {
    console.error('WebSocket error:', error);
    useNotificationStore.getState().setWsConnected(false);
  };

  private attemptReconnect = () => {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        this.connect();
      }, this.reconnectTimeout * this.reconnectAttempts);
    }
  };

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const notificationWs = new NotificationWebSocket();
