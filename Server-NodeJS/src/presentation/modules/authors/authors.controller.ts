import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { AuthorsService } from "./authors.service";

/**
 * Controlador de autores.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con autores,
 * delegando la lógica de negocio al `AuthorsService`.
 */
export class AuthorsController {

  /**
   * Servicio de autores.
   */
  private readonly authorsService = new AuthorsService();

  /**
   * Maneja la petición HTTP para obtener un listado de autores.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/authors/10
   * ```
   */
  getAllAuthors = (req: Request, res: Response): void => {
    const { countAuthors } = req.params;

    this.authorsService
      .getAllAuthors(Number(countAuthors))
      .then((authors) => res.status(200).json(authors))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para obtener un autor por su ID.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/authors/1
   * ```
   */
  getAuthorById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.authorsService
      .getAuthorById(Number(id))
      .then((author) => res.status(200).json(author))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para crear un nuevo autor.
   *
   * @param req Objeto de petición de Express con el cuerpo del autor
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * POST /api/authors
   * Content-Type: application/json
   *
   * {
   *   "name": "Gabriel García Márquez",
   *   "nationality": "Colombiano",
   *   "birthDate": 467587200,
   *   "biography": "Escritor y periodista colombiano, ganador del Premio Nobel de Literatura"
   * }
   * ```
   */
  createAuthor = (req: Request, res: Response): void => {
    const authorData = req.body;

    this.authorsService
      .createAuthor(authorData)
      .then((author) => res.status(201).json(author))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para actualizar un autor existente.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * PUT /api/authors/1
   * Content-Type: application/json
   *
   * {
   *   "biography": "Escritor colombiano destacado a nivel mundial"
   * }
   * ```
   */
  updateAuthor = (req: Request, res: Response): void => {
    const { id } = req.params;
    const authorData = req.body;

    this.authorsService
      .updateAuthor(Number(id), authorData)
      .then((author) => res.status(200).json(author))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para eliminar un autor.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * DELETE /api/authors/1
   * ```
   */
  deleteAuthor = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.authorsService
      .deleteAuthor(Number(id))
      .then((author) => res.status(200).json(author))
      .catch((error) => HandleError.error(error, res));
  };
}
