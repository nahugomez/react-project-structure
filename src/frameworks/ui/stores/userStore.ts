import { create } from 'zustand';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UserRepositoryImplementation } from '../../../infrastructure/repositories/UserRepositoryImplementation';

interface UserStore {
  userRepository: UserRepository;
}

const userRepository = new UserRepositoryImplementation();

export const useUserStore = create<UserStore>(() => ({
  userRepository: userRepository,
}));
