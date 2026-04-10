import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../interfaces/books.interface';

/**
 * Servicio encargado de la gestión de libros.
 *
 * Proporciona métodos para obtener, crear, actualizar y eliminar
 * libros desde la API REST del backend.
 *
 * @example
 * ```ts
 * constructor(private booksService: BooksService) {}
 *
 * this.booksService.getAllBooks(10).subscribe(books => {
 *   console.log(books);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class BooksService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API.
   * Se inyecta usando la función `inject`.
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de libros desde el backend.
   *
   * @param countBooks Número de libros a obtener.
   * @returns Observable que emite un array de libros.
   *
   * @example
   * ```ts
   * this.booksService.getAllBooks(5).subscribe(books => {
   *   console.log(books);
   * });
   * ```
   */
  getAllBooks(countBooks: number): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`api/books/${countBooks}`);
  }

  /**
   * Obtiene un libro específico por su ID.
   *
   * @param id Identificador único del libro.
   * @returns Observable que emite el libro solicitado.
   *
   * @example
   * ```ts
   * this.booksService.getBookById(1).subscribe(book => {
   *   console.log(book);
   * });
   * ```
   */
  getBookById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`api/books/detail/${id}`);
  }

  /**
   * Crea un nuevo libro.
   *
   * @param book Objeto con los datos del libro a crear.
   * @returns Observable que emite el libro creado.
   *
   * @example
   * ```ts
   * const newBook: Omit<Book, 'id'> = {
   *   title: 'Nuevo Libro',
   *   author: 'Autor Nuevo',
   *   genre: 'Ficción',
   *   price: 50000,
   *   pages: 300,
   *   isbn: '978-3-16-148410-0'
   * };
   * this.booksService.createBook(newBook as Book).subscribe(book => {
   *   console.log('Libro creado:', book);
   * });
   * ```
   */
  createBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`api/books`, book);
  }

  /**
   * Actualiza un libro existente.
   *
   * @param id Identificador del libro a actualizar.
   * @param book Objeto con los nuevos datos del libro.
   * @returns Observable que emite el libro actualizado.
   *
   * @example
   * ```ts
   * const updatedBook: Partial<Book> = {
   *   title: 'Título actualizado'
   * };
   * this.booksService.updateBook(1, updatedBook as Book).subscribe(book => {
   *   console.log('Libro actualizado:', book);
   * });
   * ```
   */
  updateBook(id: number, book: Partial<Book>): Observable<Book> {
    return this.httpClient.put<Book>(`api/books/${id}`, book);
  }

  /**
   * Elimina un libro.
   *
   * @param id Identificador del libro a eliminar.
   * @returns Observable que emite el libro eliminado.
   *
   * @example
   * ```ts
   * this.booksService.deleteBook(1).subscribe(book => {
   *   console.log('Libro eliminado:', book);
   * });
   * ```
   */
  deleteBook(id: number): Observable<Book> {
    return this.httpClient.delete<Book>(`api/books/${id}`);
  }
}
