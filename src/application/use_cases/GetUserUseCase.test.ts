import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import { GetUserUseCase } from './GetUserUseCase';

describe('GetUserUseCase', () => {
  let userRepository: UserRepository;
  let useCase: GetUserUseCase;

  beforeEach(() => {
    userRepository = {
      getByID: vi.fn(),
      getAll: vi.fn(),
      save: vi.fn().mockResolvedValue(undefined),
    };
    useCase = new GetUserUseCase(userRepository);
  });

  it('should return a user', async () => {
    userRepository.getByID = vi
      .fn()
      .mockResolvedValue(
        new User({ id: 1, name: 'John Doe', email: 'john.doe@example.com' }),
      );

    const user = await useCase.execute(1);
    expect(user).toBeInstanceOf(User);
    expect(user?.id).toBe(1);
    expect(user?.name).toBe('John Doe');
    expect(user?.email).toBe('john.doe@example.com');
  });

  it('should return null if user not found', async () => {
    userRepository.getByID = vi.fn().mockResolvedValue(null);

    const user = await useCase.execute(1);
    expect(user).toBeNull();
  });
});
