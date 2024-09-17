// src/application/use_cases/GetUserUseCase.ts
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';

/**
 * Caso de uso para obtener un usuario por su ID.
 */
export class GetUserUseCase {
  /**
   * Repositorio de usuarios para acceder a los datos.
   * @type {UserRepository}
   * @private
   */
  private userRepository: UserRepository;

  /**
   * Crea una instancia del caso de uso GetUserUseCase.
   * @param {UserRepository} userRepository - El repositorio de usuarios que se utilizará para obtener los datos.
   */
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Ejecuta el caso de uso para obtener un usuario por su ID.
   * @param {number} id - El identificador único del usuario.
   * @returns {Promise<User | null>} Una promesa que resuelve en el usuario si se encuentra, o `null` si no se encuentra.
   */
  async execute(id: number): Promise<User | null> {
    return await this.userRepository.getByID(id);
  }
}
