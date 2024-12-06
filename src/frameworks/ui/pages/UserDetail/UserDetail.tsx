import React, { useEffect, useState } from 'react';
import { User } from '../../../../domain/entities/User';
import { GetUserUseCase } from '../../../../application/use_cases/GetUserUseCase';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';

type UserDetailParams = {
  id: string;
};

export const UserDetail: React.FC = () => {
  const { id } = useParams<UserDetailParams>();
  const { userRepository } = useUserStore();
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
