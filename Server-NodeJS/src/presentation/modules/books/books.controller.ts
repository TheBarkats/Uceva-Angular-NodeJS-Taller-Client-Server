import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { BooksService } from "./books.service";

/**
 * Controlador de libros.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con libros,
 * delegando la lógica de negocio al `BooksService`.
 */
export class BooksController {

  /**
   * Servicio de libros.
   */
  private readonly booksService = new BooksService();

  /**
   * Maneja la petición HTTP para obtener un listado de libros.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/books/10
   * ```
   */
  getAllBooks = (req: Request, res: Response): void => {
    const { countBooks } = req.params;

    this.booksService
      .getAllBooks(Number(countBooks))
      .then((books) => res.status(200).json(books))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para obtener un libro por su ID.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/books/1
   * ```
   */
  getBookById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.booksService
      .getBookById(Number(id))
      .then((book) => res.status(200).json(book))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para crear un nuevo libro.
   *
   * @param req Objeto de petición de Express con el cuerpo del libro
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * POST /api/books
   * Content-Type: application/json
   *
   * {
   *   "title": "Cien años de soledad",
   *   "author": "Gabriel García Márquez",
   *   "genre": "Realismo mágico",
   *   "price": 45000,
   *   "pages": 417,
   *   "isbn": "978-3-16-148410-0"
   * }
   * ```
   */
  createBook = (req: Request, res: Response): void => {
    const bookData = req.body;

    this.booksService
      .createBook(bookData)
      .then((book) => res.status(201).json(book))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para actualizar un libro existente.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * PUT /api/books/1
   * Content-Type: application/json
   *
   * {
   *   "title": "Cien años de soledad - Edición especial"
   * }
   * ```
   */
  updateBook = (req: Request, res: Response): void => {
    const { id } = req.params;
    const bookData = req.body;

    this.booksService
      .updateBook(Number(id), bookData)
      .then((book) => res.status(200).json(book))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para eliminar un libro.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * DELETE /api/books/1
   * ```
   */
  deleteBook = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.booksService
      .deleteBook(Number(id))
      .then((book) => res.status(200).json(book))
      .catch((error) => HandleError.error(error, res));
  };
}
