import axios from 'axios';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { UserDTO } from '../http/dtos/UserDTO';
import { UserMapper } from '../http/mappers/UserMapper';

export class UserRepositoryImplementation implements UserRepository {
  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  save(user: User): Promise<void> {
    console.info(user);
    throw new Error('Method not implemented.');
  }

  private baseUrl: string = 'https://api.ejemplo.com';

  async getByID(id: number): Promise<User | null> {
    try {
      const response = await axios.get<UserDTO>(
        `${this.baseUrl}/usuarios/${id}`,
      );
      return UserMapper.toDomain(response.data);
    } catch {
      return null;
    }
  }
}
