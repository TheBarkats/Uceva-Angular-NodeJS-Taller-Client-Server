import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { CategoriesService } from "./categories.service";

/**
 * Controlador de categorías.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con categorías,
 * delegando la lógica de negocio al `CategoriesService`.
 */
export class CategoriesController {

  /**
   * Servicio de categorías.
   */
  private readonly categoriesService = new CategoriesService();

  /**
   * Maneja la petición HTTP para obtener un listado de categorías.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/categories/10
   * ```
   */
  getAllCategories = (req: Request, res: Response): void => {
    const { countCategories } = req.params;

    this.categoriesService
      .getAllCategories(Number(countCategories))
      .then((categories) => res.status(200).json(categories))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para obtener una categoría por su ID.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/categories/1
   * ```
   */
  getCategoryById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.categoriesService
      .getCategoryById(Number(id))
      .then((category) => res.status(200).json(category))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para crear una nueva categoría.
   *
   * @param req Objeto de petición de Express con el cuerpo de la categoría
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * POST /api/categories
   * Content-Type: application/json
   *
   * {
   *   "name": "Ficción",
   *   "description": "Novelas, cuentos y relatos de ficción general",
   *   "icon": "book-heart"
   * }
   * ```
   */
  createCategory = (req: Request, res: Response): void => {
    const categoryData = req.body;

    this.categoriesService
      .createCategory(categoryData)
      .then((category) => res.status(201).json(category))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para actualizar una categoría existente.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * PUT /api/categories/1
   * Content-Type: application/json
   *
   * {
   *   "description": "Novelas de ficción, ciencia ficción y fantasía"
   * }
   * ```
   */
  updateCategory = (req: Request, res: Response): void => {
    const { id } = req.params;
    const categoryData = req.body;

    this.categoriesService
      .updateCategory(Number(id), categoryData)
      .then((category) => res.status(200).json(category))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para eliminar una categoría.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * DELETE /api/categories/1
   * ```
   */
  deleteCategory = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.categoriesService
      .deleteCategory(Number(id))
      .then((category) => res.status(200).json(category))
      .catch((error) => HandleError.error(error, res));
  };
}
