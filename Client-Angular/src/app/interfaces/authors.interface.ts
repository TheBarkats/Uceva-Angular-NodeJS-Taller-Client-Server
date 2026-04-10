/**
 * Interfaz que representa un autor en Angular.
 *
 * Contiene toda la información de un autor necesaria para
 * mostrar en componentes o tablas de la aplicación.
 *
 * @remarks
 * Se utiliza en servicios, componentes y en la comunicación
 * con el backend.
 *
 * @example
 * ```ts
 * const author: Author = {
 *   id: 1,
 *   name: 'Gabriel García Márquez',
 *   nationality: 'Colombiano',
 *   birthDate: 467587200,
 *   biography: 'Escritor y periodista colombiano'
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

  /** Fecha de nacimiento como timestamp */
  birthDate: number;

  /** Biografía del autor */
  biography: string;
}
