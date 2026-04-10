import { faker } from '@faker-js/faker';
import { Author } from '../../../domain/interfaces/authors.interface';

/**
 * Servicio encargado de la generación y gestión de autores.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar autores
 * ficticios con información coherente de nombre, nacionalidad,
 * fecha de nacimiento y biografía.
 */
export class AuthorsService {

  /**
   * Nacionalidades disponibles para los autores.
   *
   * @remarks
   * Se utilizan para asignar aleatoriamente una nacionalidad
   * a cada autor generado.
   */
  private nationalities: string[] = [
    'Colombiano',
    'Español',
    'Mexicano',
    'Argentino',
    'Chileno',
    'Peruano',
    'Venezolano',
    'Ecuatoriano',
    'Portugués',
    'Brasileño'
  ];

  /**
   * Obtiene un listado de autores generados dinámicamente.
   *
   * @param countAuthors Cantidad de autores a generar
   * @returns Promesa que resuelve un arreglo de autores
   *
   * @example
   * ```ts
   * const authors = await authorsService.getAllAuthors(10);
   * ```
   */
  public async getAllAuthors(countAuthors: number): Promise<Author[]> {
    const authors: Promise<Author>[] = [];

    for (let i = 1; i <= countAuthors; i++) {
      authors.push(this.generateAuthor(i));
    }

    return Promise.all(authors);
  }

  /**
   * Obtiene un autor específico por su ID.
   *
   * @param id Identificador único del autor
   * @returns Promesa que resuelve el autor generado
   */
  public async getAuthorById(id: number): Promise<Author> {
    return this.generateAuthor(id);
  }

  /**
   * Crea un nuevo autor con los datos proporcionados.
   *
   * @param author Datos del autor a crear
   * @returns Promesa que resuelve el autor creado
   */
  public async createAuthor(author: Author): Promise<Author> {
    return Promise.resolve(author);
  }

  /**
   * Actualiza un autor existente.
   *
   * @param id Identificador del autor a actualizar
   * @param authorData Nuevos datos del autor
   * @returns Promesa que resuelve el autor actualizado
   */
  public async updateAuthor(id: number, authorData: Partial<Author>): Promise<Author> {
    const author = await this.generateAuthor(id);
    return Promise.resolve({ ...author, ...authorData, id });
  }

  /**
   * Elimina un autor por su ID.
   *
   * @param id Identificador del autor a eliminar
   * @returns Promesa que resuelve el autor eliminado
   */
  public async deleteAuthor(id: number): Promise<Author> {
    return this.generateAuthor(id);
  }

  /**
   * Genera un autor ficticio.
   *
   * @param id Identificador único del autor
   * @returns Promesa que resuelve un autor generado
   */
  private generateAuthor(id: number): Promise<Author> {
    return Promise.resolve({
      id,
      name: faker.person.fullName(),
      nationality: faker.helpers.arrayElement(this.nationalities),
      birthDate: Math.floor(faker.date.birthdate({ min: 30, max: 80, mode: 'age' }).getTime() / 1000),
      biography: faker.lorem.sentences({ min: 2, max: 4 })
    });
  }
}
