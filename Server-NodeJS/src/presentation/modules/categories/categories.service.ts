import { faker } from '@faker-js/faker';
import { Category } from '../../../domain/interfaces/categories.interface';

/**
 * Servicio encargado de la generación y gestión de categorías.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar categorías
 * ficticias con información coherente de nombre, descripción
 * e icono representativo.
 */
export class CategoriesService {

  /**
   * Iconos disponibles para las categorías.
   *
   * @remarks
   * Se utilizan para representar visualmente cada categoría
   * en la interfaz del usuario.
   */
  private icons: string[] = [
    'book-heart',
    'book-open',
    'book-marked',
    'book-sparkles',
    'book-dashed',
    'book-user',
    'book-check',
    'book-x',
    'book-plus',
    'book-search'
  ];

  /**
   * Obtiene un listado de categorías generadas dinámicamente.
   *
   * @param countCategories Cantidad de categorías a generar
   * @returns Promesa que resuelve un arreglo de categorías
   *
   * @example
   * ```ts
   * const categories = await categoriesService.getAllCategories(10);
   * ```
   */
  public async getAllCategories(countCategories: number): Promise<Category[]> {
    const categories: Promise<Category>[] = [];

    for (let i = 1; i <= countCategories; i++) {
      categories.push(this.generateCategory(i));
    }

    return Promise.all(categories);
  }

  /**
   * Obtiene una categoría específica por su ID.
   *
   * @param id Identificador único de la categoría
   * @returns Promesa que resuelve la categoría generada
   */
  public async getCategoryById(id: number): Promise<Category> {
    return this.generateCategory(id);
  }

  /**
   * Crea una nueva categoría con los datos proporcionados.
   *
   * @param category Datos de la categoría a crear
   * @returns Promesa que resuelve la categoría creada
   */
  public async createCategory(category: Category): Promise<Category> {
    return Promise.resolve(category);
  }

  /**
   * Actualiza una categoría existente.
   *
   * @param id Identificador de la categoría a actualizar
   * @param categoryData Nuevos datos de la categoría
   * @returns Promesa que resuelve la categoría actualizada
   */
  public async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category> {
    const category = await this.generateCategory(id);
    return Promise.resolve({ ...category, ...categoryData, id });
  }

  /**
   * Elimina una categoría por su ID.
   *
   * @param id Identificador de la categoría a eliminar
   * @returns Promesa que resuelve la categoría eliminada
   */
  public async deleteCategory(id: number): Promise<Category> {
    return this.generateCategory(id);
  }

  /**
   * Genera una categoría ficticia.
   *
   * @param id Identificador único de la categoría
   * @returns Promesa que resuelve una categoría generada
   */
  private generateCategory(id: number): Promise<Category> {
    return Promise.resolve({
      id,
      name: faker.word.noun(),
      description: faker.lorem.sentences({ min: 1, max: 2 }),
      icon: faker.helpers.arrayElement(this.icons)
    });
  }
}
