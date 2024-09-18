import React, { useEffect, useState, useContext } from 'react';
import { User } from '../../../../domain/entities/User';
import { GetUserUseCase } from '../../../../application/use_cases/GetUserUseCase';
import { UserContext } from '../../contexts/UserContext';
import { useParams } from 'react-router-dom';

type UserDetailParams = {
  id: string;
};

export const UserDatil: React.FC = () => {
  const { id } = useParams<UserDetailParams>();
  const { userRepository } = useContext(UserContext);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const useCase = new GetUserUseCase(userRepository);
      const userData = await useCase.execute(Number(id));
      setUser(userData);
    };
    getUser();
  }, [id, userRepository]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Identificador: {user.id}</p>
    </div>
  );
};
