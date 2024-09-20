import { User } from '../../../domain/entities/User';
import { UserDTO } from '../dtos/UserDTO';
import { UserMapper } from './UserMapper';

describe('UserMapper', () => {
  it('should map a UserDTO to a User', () => {
    const dto: UserDTO = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };

    const user = UserMapper.toDomain(dto);
    expect(user).toBeInstanceOf(User);
    expect(user?.id).toBe(1);
    expect(user?.name).toBe('John Doe');
    expect(user?.email).toBe('john.doe@example.com');
  });

  it('should map a list of UserDTO to a list of User', () => {
    const dtos: UserDTO[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
      },
    ];

    const users = UserMapper.toDomainList(dtos);
    expect(users).toHaveLength(2);
    expect(users[0]).toBeInstanceOf(User);
    expect(users[0]?.id).toBe(1);
    expect(users[0]?.name).toBe('John Doe');
    expect(users[0]?.email).toBe('john.doe@example.com');
    expect(users[1]).toBeInstanceOf(User);
    expect(users[1]?.id).toBe(2);
    expect(users[1]?.name).toBe('Jane Doe');
    expect(users[1]?.email).toBe('jane.doe@example.com');
  });
});
