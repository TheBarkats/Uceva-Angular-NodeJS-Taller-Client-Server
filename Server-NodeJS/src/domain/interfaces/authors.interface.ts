/**
 * Interfaz que representa un autor en el sistema.
 *
 * Contiene información sobre autores de libros, incluyendo
 * datos personales adicionales como nacionalidad y biografía.
 *
 * @remarks
 * Cada autor debe tener un `id` único, un `name` válido,
 * una `nationality` específica, una `birthDate` numérica
 * (timestamp) y una `biography` descriptiva.
 *
 * @example
 * ```ts
 * const author: Author = {
 *   id: 1,
 *   name: 'Gabriel García Márquez',
 *   nationality: 'Colombiano',
 *   birthDate: 467587200,
 *   biography: 'Escritor y periodista colombiano, ganador del Premio Nobel de Literatura'
 * };
 * ```
 */
export interface Author {
  /** Identificador único del autor */
  id: number;

  /** Nombre completo del autor */
  name: string;

  /** Nacionalidad del autor */
  nationality: string;

  /** Fecha de nacimiento como timestamp en segundos */
  birthDate: number;

  /** Biografía breve del autor */
  biography: string;
}
