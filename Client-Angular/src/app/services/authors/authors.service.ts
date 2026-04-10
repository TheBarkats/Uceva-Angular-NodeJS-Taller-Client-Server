import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../../interfaces/authors.interface';

/**
 * Servicio encargado de la gestión de autores.
 *
 * Proporciona métodos para obtener, crear, actualizar y eliminar
 * autores desde la API REST del backend.
 *
 * @example
 * ```ts
 * constructor(private authorsService: AuthorsService) {}
 *
 * this.authorsService.getAllAuthors(10).subscribe(authors => {
 *   console.log(authors);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class AuthorsService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API.
   * Se inyecta usando la función `inject`.
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de autores desde el backend.
   *
   * @param countAuthors Número de autores a obtener.
   * @returns Observable que emite un array de autores.
   *
   * @example
   * ```ts
   * this.authorsService.getAllAuthors(5).subscribe(authors => {
   *   console.log(authors);
   * });
   * ```
   */
  getAllAuthors(countAuthors: number): Observable<Author[]> {
    return this.httpClient.get<Author[]>(`api/authors/${countAuthors}`);
  }

  /**
   * Obtiene un autor específico por su ID.
   *
   * @param id Identificador único del autor.
   * @returns Observable que emite el autor solicitado.
   *
   * @example
   * ```ts
   * this.authorsService.getAuthorById(1).subscribe(author => {
   *   console.log(author);
   * });
   * ```
   */
  getAuthorById(id: number): Observable<Author> {
    return this.httpClient.get<Author>(`api/authors/detail/${id}`);
  }

  /**
   * Crea un nuevo autor.
   *
   * @param author Objeto con los datos del autor a crear.
   * @returns Observable que emite el autor creado.
   *
   * @example
   * ```ts
   * const newAuthor: Omit<Author, 'id'> = {
   *   name: 'Nuevo Autor',
   *   nationality: 'Colombiano',
   *   birthDate: 467587200,
   *   biography: 'Escritor destacado'
   * };
   * this.authorsService.createAuthor(newAuthor as Author).subscribe(author => {
   *   console.log('Autor creado:', author);
   * });
   * ```
   */
  createAuthor(author: Author): Observable<Author> {
    return this.httpClient.post<Author>(`api/authors`, author);
  }

  /**
   * Actualiza un autor existente.
   *
   * @param id Identificador del autor a actualizar.
   * @param author Objeto con los nuevos datos del autor.
   * @returns Observable que emite el autor actualizado.
   *
   * @example
   * ```ts
   * const updatedAuthor: Partial<Author> = {
   *   biography: 'Biografía actualizada'
   * };
   * this.authorsService.updateAuthor(1, updatedAuthor as Author).subscribe(author => {
   *   console.log('Autor actualizado:', author);
   * });
   * ```
   */
  updateAuthor(id: number, author: Partial<Author>): Observable<Author> {
    return this.httpClient.put<Author>(`api/authors/${id}`, author);
  }

  /**
   * Elimina un autor.
   *
   * @param id Identificador del autor a eliminar.
   * @returns Observable que emite el autor eliminado.
   *
   * @example
   * ```ts
   * this.authorsService.deleteAuthor(1).subscribe(author => {
   *   console.log('Autor eliminado:', author);
   * });
   * ```
   */
  deleteAuthor(id: number): Observable<Author> {
    return this.httpClient.delete<Author>(`api/authors/${id}`);
  }
}
