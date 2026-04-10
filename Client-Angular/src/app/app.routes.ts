import { Routes } from '@angular/router';
import { UsersPage } from './pages/users/users.page';
import { ProductsPage } from './pages/products/products.page';
import { BooksPage } from './pages/books/books.page';
import { AuthorsPage } from './pages/authors/authors.page';
import { CategoriesPage } from './pages/categories/categories.page';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales
 * - Redirección por defecto para rutas no existentes
 *
 * @see {@link UsersPage}
 * @see {@link ProductsPage}
 */
export const routes: Routes = [

  /**
   * Ruta de usuarios.
   *
   * @remarks
   * Renderiza el componente `UsersPage`, encargado
   * de mostrar y gestionar el listado de usuarios.
   */
  { path: 'users', component: UsersPage },

  /**
   * Ruta de productos.
   *
   * @remarks
   * Renderiza el componente `ProductsPage`, encargado
   * de mostrar y gestionar el listado de productos.
   */
  { path: 'products', component: ProductsPage },

  /**
   * Ruta de libros.
   *
   * @remarks
   * Renderiza el componente `BooksPage`, encargado
   * de mostrar y gestionar el listado de libros.
   */
  { path: 'books', component: BooksPage },

  /**
   * Ruta de autores.
   *
   * @remarks
   * Renderiza el componente `AuthorsPage`, encargado
   * de mostrar y gestionar el listado de autores.
   */
  { path: 'authors', component: AuthorsPage },

  /**
   * Ruta de categorías.
   *
   * @remarks
   * Renderiza el componente `CategoriesPage`, encargado
   * de mostrar y gestionar el listado de categorías de libros.
   */
  { path: 'categories', component: CategoriesPage },

  /**
   * Ruta comodín.
   *
   * @remarks
   * Captura cualquier ruta no definida y redirige
   * automáticamente a la ruta de usuarios.
   */
  { path: '**', redirectTo: 'users' },
];