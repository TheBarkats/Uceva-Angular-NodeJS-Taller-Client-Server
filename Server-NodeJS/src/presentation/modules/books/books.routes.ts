import { Router } from "express";
import { BooksController } from "./books.controller";

export class BooksRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new BooksController();

    /**
     * @openapi
     * /api/books/{countBooks}:
     *   get:
     *     summary: Obtener listado de libros
     *     description: Retorna una lista de libros generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Books
     *     parameters:
     *       - in: path
     *         name: countBooks
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de libros a generar
     *     responses:
     *       200:
     *         description: Lista de libros generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: number
     *                   title:
     *                     type: string
     *                   author:
     *                     type: string
     *                   genre:
     *                     type: string
     *                   price:
     *                     type: number
     *                   pages:
     *                     type: number
     *                   isbn:
     *                     type: string
     */
    router.get("/:countBooks", controller.getAllBooks);

    /**
     * @openapi
     * /api/books/detail/{id}:
     *   get:
     *     summary: Obtener libro por ID
     *     description: Retorna un libro específico basado en su identificador único.
     *     tags:
     *       - Books
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Identificador único del libro
     *     responses:
     *       200:
     *         description: Libro obtenido exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 title:
     *                   type: string
     *                 author:
     *                   type: string
     *                 genre:
     *                   type: string
     *                 price:
     *                   type: number
     *                 pages:
     *                   type: number
     *                 isbn:
     *                   type: string
     */
    router.get("/detail/:id", controller.getBookById);

    /**
     * @openapi
     * /api/books:
     *   post:
     *     summary: Crear un nuevo libro
     *     description: Crea un nuevo libro con los datos proporcionados en el cuerpo de la solicitud.
     *     tags:
     *       - Books
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - title
     *               - author
     *               - genre
     *               - price
     *               - pages
     *               - isbn
     *             properties:
     *               title:
     *                 type: string
     *                 example: "Cien años de soledad"
     *               author:
     *                 type: string
     *                 example: "Gabriel García Márquez"
     *               genre:
     *                 type: string
     *                 example: "Realismo mágico"
     *               price:
     *                 type: number
     *                 example: 45000
     *               pages:
     *                 type: number
     *                 example: 417
     *               isbn:
     *                 type: string
     *                 example: "978-3-16-148410-0"
     *     responses:
     *       201:
     *         description: Libro creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 title:
     *                   type: string
     *                 author:
     *                   type: string
     *                 genre:
     *                   type: string
     *                 price:
     *                   type: number
     *                 pages:
     *                   type: number
     *                 isbn:
     *                   type: string
     */
    router.post("/", controller.createBook);

    /**
     * @openapi
     * /api/books/{id}:
     *   put:
     *     summary: Actualizar un libro existente
     *     description: Actualiza los datos de un libro específico basado en su identificador.
     *     tags:
     *       - Books
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Identificador único del libro
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               author:
     *                 type: string
     *               genre:
     *                 type: string
     *               price:
     *                 type: number
     *               pages:
     *                 type: number
     *               isbn:
     *                 type: string
     *     responses:
     *       200:
     *         description: Libro actualizado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 title:
     *                   type: string
     *                 author:
     *                   type: string
     *                 genre:
     *                   type: string
     *                 price:
     *                   type: number
     *                 pages:
     *                   type: number
     *                 isbn:
     *                   type: string
     */
    router.put("/:id", controller.updateBook);

    /**
     * @openapi
     * /api/books/{id}:
     *   delete:
     *     summary: Eliminar un libro
     *     description: Elimina un libro específico basado en su identificador.
     *     tags:
     *       - Books
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Identificador único del libro
     *     responses:
     *       200:
     *         description: Libro eliminado exitosamente
     */
    router.delete("/:id", controller.deleteBook);

    return router;
  }
}
