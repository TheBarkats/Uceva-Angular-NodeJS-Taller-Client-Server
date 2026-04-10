/**
 * Interfaz que representa un libro en el sistema.
 *
 * Contiene la información básica de un libro incluyendo
 * identificador, título, autor, género, precio y características.
 *
 * @remarks
 * Cada libro debe tener un `id` único, un `title` descriptivo,
 * un `author` válido, un `genre` definido, un `price` en pesos colombianos,
 * número de `pages` y un `isbn` único.
 *
 * @example
 * ```ts
 * const book: Book = {
 *   id: 1,
 *   title: 'Cien años de soledad',
 *   author: 'Gabriel García Márquez',
 *   genre: 'Realismo mágico',
 *   price: 45000,
 *   pages: 417,
 *   isbn: '978-3-16-148410-0'
 * };
 * ```
 */
export interface Book {
  /** Identificador único del libro */
  id: number;

  /** Título del libro */
  title: string;

  /** Autor del libro */
  author: string;

  /** Género literario del libro */
  genre: string;

  /** Precio del libro en pesos colombianos */
  price: number;

  /** Número de páginas del libro */
  pages: number;

  /** ISBN del libro (código único internacional) */
  isbn: string;
}
