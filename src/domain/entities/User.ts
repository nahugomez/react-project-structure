/**
 * Representa un usuario con un ID, nombre y correo electrónico.
 */
export class User {
  /**
   * El identificador único del usuario.
   * @type {number}
   */
  public id: number;

  /**
   * El nombre del usuario.
   * @type {string}
   */
  public name: string;

  /**
   * La dirección de correo electrónico del usuario.
   * @type {string}
   */
  public email: string;

  /**
   * Crea una instancia de la clase User.
   * @param {Object} params - Los parámetros para el usuario.
   * @param {number} params.id - El identificador único del usuario.
   * @param {string} params.name - El nombre del usuario.
   * @param {string} params.email - La dirección de correo electrónico del usuario.
   */
  constructor(params: { id: number; name: string; email: string }) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
  }
}
