import { User } from '../entities/User';

/**
 * Interfaz del repositorio de usuarios.
 */
export interface UserRepository {
  /**
   * Obtiene un usuario por su ID.
   * @param {number} id - El identificador único del usuario.
   * @returns {Promise<User | null>} Una promesa que resuelve en el usuario si se encuentra, o `null` si no se encuentra.
   */
  getByID(id: number): Promise<User | null>;

  /**
   * Obtiene todos los usuarios.
   * @returns {Promise<User[]>} Una promesa que resuelve en una lista de usuarios.
   */
  getAll(): Promise<User[]>;

  /**
   * Guarda un usuario en el repositorio.
   * @param {User} user - El usuario a guardar.
   * @returns {Promise<void>} Una promesa que se resuelve cuando el usuario ha sido guardado.
   */
  save(user: User): Promise<void>;
}
