import { faker } from '@faker-js/faker';
import { Book } from '../../../domain/interfaces/books.interface';

/**
 * Servicio encargado de la generación y gestión de libros.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar libros
 * ficticios con información coherente de título, autor, género,
 * precio y características literarias.
 */
export class BooksService {

  /**
   * Géneros literarios disponibles para los libros.
   *
   * @remarks
   * Se utilizan para asignar aleatoriamente un género
   * a cada libro generado.
   */
  private genres: string[] = [
    'Ficción',
    'Realismo mágico',
    'Thriller',
    'Romance',
    'Aventura',
    'Ciencia ficción',
    'Fantasía',
    'Ensayo',
    'Poesía',
    'Biografía'
  ];

  /**
   * Obtiene un listado de libros generados dinámicamente.
   *
   * @param countBooks Cantidad de libros a generar
   * @returns Promesa que resuelve un arreglo de libros
   *
   * @example
   * ```ts
   * const books = await booksService.getAllBooks(10);
   * ```
   */
  public async getAllBooks(countBooks: number): Promise<Book[]> {
    const books: Promise<Book>[] = [];

    for (let i = 1; i <= countBooks; i++) {
      books.push(this.generateBook(i));
    }

    return Promise.all(books);
  }

  /**
   * Obtiene un libro específico por su ID.
   *
   * @param id Identificador único del libro
   * @returns Promesa que resuelve el libro generado
   */
  public async getBookById(id: number): Promise<Book> {
    return this.generateBook(id);
  }

  /**
   * Crea un nuevo libro con los datos proporcionados.
   *
   * @param book Datos del libro a crear
   * @returns Promesa que resuelve el libro creado
   */
  public async createBook(book: Book): Promise<Book> {
    return Promise.resolve(book);
  }

  /**
   * Actualiza un libro existente.
   *
   * @param id Identificador del libro a actualizar
   * @param bookData Nuevos datos del libro
   * @returns Promesa que resuelve el libro actualizado
   */
  public async updateBook(id: number, bookData: Partial<Book>): Promise<Book> {
    const book = await this.generateBook(id);
    return Promise.resolve({ ...book, ...bookData, id });
  }

  /**
   * Elimina un libro por su ID.
   *
   * @param id Identificador del libro a eliminar
   * @returns Promesa que resuelve el libro eliminado
   */
  public async deleteBook(id: number): Promise<Book> {
    return this.generateBook(id);
  }

  /**
   * Genera un libro ficticio.
   *
   * @param id Identificador único del libro
   * @returns Promesa que resuelve un libro generado
   */
  private generateBook(id: number): Promise<Book> {
    return Promise.resolve({
      id,
      title: faker.book.title(),
      author: faker.person.fullName(),
      genre: faker.helpers.arrayElement(this.genres),
      price: Number(faker.commerce.price({ min: 10000, max: 150000, dec: 0 })),
      pages: faker.number.int({ min: 100, max: 800 }),
      isbn: `${faker.string.numeric(3)}-${faker.string.numeric(2)}-${faker.string.numeric(6)}-${faker.string.numeric(1)}`
    });
  }
}
