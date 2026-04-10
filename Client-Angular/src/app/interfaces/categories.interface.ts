/**
 * Interfaz que representa una categoría en Angular.
 *
 * Contiene toda la información de una categoría de libros
 * necesaria para mostrar en componentes de la aplicación.
 *
 * @remarks
 * Se utiliza en servicios, componentes y en la comunicación
 * con el backend.
 *
 * @example
 * ```ts
 * const category: Category = {
 *   id: 1,
 *   name: 'Ficción',
 *   description: 'Novelas, cuentos y relatos de ficción general',
 *   icon: 'book-heart'
 * };
 * ```
 */
export interface Category {
  /** Identificador único de la categoría */
  id: number;

  /** Nombre de la categoría */
  name: string;

  /** Descripción de la categoría */
  description: string;

  /** Icono representativo */
  icon: string;
}
