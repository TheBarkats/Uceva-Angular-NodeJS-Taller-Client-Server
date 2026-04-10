import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/categories.interface';

/**
 * Servicio encargado de la gestión de categorías.
 *
 * Proporciona métodos para obtener, crear, actualizar y eliminar
 * categorías desde la API REST del backend.
 *
 * @example
 * ```ts
 * constructor(private categoriesService: CategoriesService) {}
 *
 * this.categoriesService.getAllCategories(5).subscribe(categories => {
 *   console.log(categories);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API.
   * Se inyecta usando la función `inject`.
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de categorías desde el backend.
   *
   * @param countCategories Número de categorías a obtener.
   * @returns Observable que emite un array de categorías.
   *
   * @example
   * ```ts
   * this.categoriesService.getAllCategories(5).subscribe(categories => {
   *   console.log(categories);
   * });
   * ```
   */
  getAllCategories(countCategories: number): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`api/categories/${countCategories}`);
  }

  /**
   * Obtiene una categoría específica por su ID.
   *
   * @param id Identificador único de la categoría.
   * @returns Observable que emite la categoría solicitada.
   *
   * @example
   * ```ts
   * this.categoriesService.getCategoryById(1).subscribe(category => {
   *   console.log(category);
   * });
   * ```
   */
  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`api/categories/detail/${id}`);
  }

  /**
   * Crea una nueva categoría.
   *
   * @param category Objeto con los datos de la categoría a crear.
   * @returns Observable que emite la categoría creada.
   *
   * @example
   * ```ts
   * const newCategory: Omit<Category, 'id'> = {
   *   name: 'Nueva Categoría',
   *   description: 'Descripción de la categoría',
   *   icon: 'book-heart'
   * };
   * this.categoriesService.createCategory(newCategory as Category).subscribe(category => {
   *   console.log('Categoría creada:', category);
   * });
   * ```
   */
  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(`api/categories`, category);
  }

  /**
   * Actualiza una categoría existente.
   *
   * @param id Identificador de la categoría a actualizar.
   * @param category Objeto con los nuevos datos de la categoría.
   * @returns Observable que emite la categoría actualizada.
   *
   * @example
   * ```ts
   * const updatedCategory: Partial<Category> = {
   *   name: 'Nombre actualizado'
   * };
   * this.categoriesService.updateCategory(1, updatedCategory as Category).subscribe(category => {
   *   console.log('Categoría actualizada:', category);
   * });
   * ```
   */
  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.httpClient.put<Category>(`api/categories/${id}`, category);
  }

  /**
   * Elimina una categoría.
   *
   * @param id Identificador de la categoría a eliminar.
   * @returns Observable que emite la categoría eliminada.
   *
   * @example
   * ```ts
   * this.categoriesService.deleteCategory(1).subscribe(category => {
   *   console.log('Categoría eliminada:', category);
   * });
   * ```
   */
  deleteCategory(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(`api/categories/${id}`);
  }
}
