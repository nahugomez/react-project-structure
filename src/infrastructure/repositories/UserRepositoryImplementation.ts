import useSWR from 'swr';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { UserDTO } from '../http/dtos/UserDTO';
import { UserMapper } from '../http/mappers/UserMapper';
import { axiosInstance } from '../http/axios-config';

export class UserRepositoryImplementation implements UserRepository {
  async getAll(): Promise<User[]> {
    const response = await axiosInstance.get<UserDTO[]>('/users');
    return response.data.map(UserMapper.toDomain);
  }

  save(user: User): Promise<void> {
    console.info(user);
    throw new Error('Method not implemented.');
  }

  async getByID(id: number): Promise<User | null> {
    const response = await axiosInstance.get<UserDTO>(`/users/${id}`);
    return UserMapper.toDomain(response.data);
  }
}

export function useUser(id: number) {
  const repository = new UserRepositoryImplementation();
  const { data, error, isLoading } = useSWR<User | null>(
    id ? `user-${id}` : null,
    () => repository.getByID(id),
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export function useUsers() {
  const repository = new UserRepositoryImplementation();
  const { data, error, isLoading } = useSWR<User[]>('users', () =>
    repository.getAll(),
  );

  return {
    users: data || [],
    isLoading,
    isError: error,
  };
}
