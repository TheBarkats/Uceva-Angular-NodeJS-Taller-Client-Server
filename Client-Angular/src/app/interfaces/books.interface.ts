/**
 * Interfaz que representa un libro en Angular.
 *
 * Contiene toda la información de un libro necesaria para
 * mostrar en componentes o tablas de la aplicación.
 *
 * @remarks
 * Se utiliza en servicios, componentes y en la comunicación
 * con el backend.
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

  /** Género literario */
  genre: string;

  /** Precio en pesos colombianos */
  price: number;

  /** Número de páginas */
  pages: number;

  /** ISBN internacional */
  isbn: string;
}
