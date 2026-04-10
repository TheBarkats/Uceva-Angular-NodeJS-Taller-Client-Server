/**
 * Interfaz que representa una categoría de libros en el sistema.
 *
 * Contiene información para clasificar y organizar libros
 * dentro del catálogo del sistema.
 *
 * @remarks
 * Cada categoría debe tener un `id` único, un `name` descriptivo,
 * una `description` detallada y un `icon` para representación visual.
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

  /** Descripción detallada de la categoría */
  description: string;

  /** Icono representativo de la categoría */
  icon: string;
}
