import { Router } from "express";
import { UsersRoutes } from "./modules/users/users.routes";
import { ProductsRoutes } from "./modules/products/products.routes";
import { BooksRoutes } from "./modules/books/books.routes";
import { AuthorsRoutes } from "./modules/authors/authors.routes";
import { CategoriesRoutes } from "./modules/categories/categories.routes";

/**
 * Clase encargada de centralizar todas las rutas de la aplicación.
 *
 * @remarks
 * Proporciona un único punto de acceso a los endpoints
 * del backend, agrupando los módulos de usuarios y productos.
 *
 * @example
 * ```ts
 * import express from 'express';
 * import { AppRoutes } from './app.routes';
 *
 * const app = express();
 * app.use(AppRoutes.routes);
 * ```
 */
export class AppRoutes {

  /**
   * Devuelve el router principal de la aplicación.
   *
   * @returns Router de Express con todas las rutas registradas
   */
  static get routes(): Router {
    const router = Router();

    // Definir rutas
    router.use("/api/users", UsersRoutes.routes);
    router.use("/api/products", ProductsRoutes.routes);
    router.use("/api/books", BooksRoutes.routes);
    router.use("/api/authors", AuthorsRoutes.routes);
    router.use("/api/categories", CategoriesRoutes.routes);

    return router;
  }
}