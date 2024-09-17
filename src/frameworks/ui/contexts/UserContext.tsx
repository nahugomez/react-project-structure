import React, { createContext } from "react";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UserRepositoryImplementation } from "../../../infrastructure/repositories/UserRepositoryImplementation";

const userRepository: UserRepository = new UserRepositoryImplementation();

export const UserContext = createContext<{
  userRepository: UserRepository;
}>({
  userRepository: userRepository,
});

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  return (
    <UserContext.Provider value={{ userRepository }}>
      {children}
    </UserContext.Provider>
  );
};
