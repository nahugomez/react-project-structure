import { http, ws, HttpResponse } from 'msw';

import { UserDTO } from '../http/dtos/UserDTO';

const WS_URL =
  import.meta.env.VITE_WS_URL || 'ws://localhost:8080/notifications';

// Mock notifications that will be sent through WebSocket
const mockNotifications = [
  {
    id: 1,
    message: 'New message from John',
    type: 'message',
    read: false,
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    message: 'System maintenance scheduled',
    type: 'system',
    read: false,
    timestamp: new Date().toISOString(),
  },
];

const notifications = ws.link(WS_URL);

export const handlers = [
  http.get(`${import.meta.env.CLIENT_API_URL}/users/:id`, ({ params }) => {
    const { id } = params;
    console.log(`Captured a [GET] /users/${id} request`);
    const user: UserDTO = {
      id: Number(id),
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: '2019-01-15T13:13:42.22054Z',
      updatedAt: '2019-01-15T13:13:42.22054Z',
    };
    return HttpResponse.json(user);
  }),
  notifications.addEventListener('connection', ({ client }) => {
    console.log(`Client connected to WebSocket' ${client.id}`);
    // Send a notification every 5 seconds
    const intervalId = setInterval(() => {
      const types = ['system', 'message', 'alert'];
      const messages = ['New notification', 'System update', 'Important alert'];
      const randomIndex = Math.floor(Math.random() * types.length);
      const notification = {
        id: Date.now(),
        message: `${messages[randomIndex]} at ${new Date().toLocaleTimeString()}`,
        type: types[randomIndex],
        read: false,
        timestamp: new Date().toISOString(),
      };

      client.send(JSON.stringify(notification));
    }, 2500);

    // Send initial notifications
    mockNotifications.forEach(notification => {
      client.send(JSON.stringify(notification));
    });

    // Cleanup interval when client disconnects
    return () => {
      clearInterval(intervalId);
    };
  }),
];
