import { http, HttpResponse } from 'msw';
import { UserDTO } from '../http/dtos/UserDTO';

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
];
