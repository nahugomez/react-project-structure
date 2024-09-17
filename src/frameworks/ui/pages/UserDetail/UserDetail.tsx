import React, { useEffect, useState, useContext } from "react";
import { User } from "../../../../domain/entities/User";
import { GetUserUseCase } from "../../../../application/use_cases/GetUserUseCase";
import { UserContext } from "../../contexts/UserContext";

interface Props {
  userID: number;
}

export const UserDatil: React.FC<Props> = ({ userID }) => {
  const { userRepository } = useContext(UserContext);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const useCase = new GetUserUseCase(userRepository);
      const userData = await useCase.execute(userID);
      setUser(userData);
    };
    getUser();
  }, [userID, userRepository]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};
