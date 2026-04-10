import { Router } from "express";
import { AuthorsController } from "./authors.controller";

export class AuthorsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthorsController();

    /**
     * @openapi
     * /api/authors/{countAuthors}:
     *   get:
     *     summary: Obtener listado de autores
     *     description: Retorna una lista de autores generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Authors
     *     parameters:
     *       - in: path
     *         name: countAuthors
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de autores a generar
     *     responses:
     *       200:
     *         description: Lista de autores generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: number
     *                   name:
     *                     type: string
     *                   nationality:
     *                     type: string
     *                   birthDate:
     *                     type: number
     *                   biography:
     *                     type: string
     */
    router.get("/:countAuthors", controller.getAllAuthors);

    /**
     * @openapi
     * /api/authors/detail/{id}:
     *   get:
     *     summary: Obtener autor por ID
     *     description: Retorna un autor específico basado en su identificador único.
     *     tags:
     *       - Authors
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Identificador único del autor
     *     responses:
     *       200:
     *         description: Autor obtenido exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 name:
     *                   type: string
     *                 nationality:
     *                   type: string
     *                 birthDate:
     *                   type: number
     *                 biography:
     *                   type: string
     */
    router.get("/detail/:id", controller.getAuthorById);

    /**
     * @openapi
     * /api/authors:
     *   post:
     *     summary: Crear un nuevo autor
     *     description: Crea un nuevo autor con los datos proporcionados en el cuerpo de la solicitud.
     *     tags:
     *       - Authors
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - nationality
     *               - birthDate
     *               - biography
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Gabriel García Márquez"
     *               nationality:
     *                 type: string
     *                 example: "Colombiano"
     *               birthDate:
     *                 type: number
     *                 example: 467587200
     *               biography:
     *                 type: string
     *                 example: "Escritor y periodista colombiano, ganador del Premio Nobel de Literatura"
     *     responses:
     *       201:
     *         description: Autor creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 name:
     *                   type: string
     *                 nationality:
     *                   type: string
     *                 birthDate:
     *                   type: number
     *                 biography:
     *                   type: string
     */
    router.post("/", controller.createAuthor);

    /**
     * @openapi
     * /api/authors/{id}:
     *   put:
     *     summary: Actualizar un autor existente
     *     description: Actualiza los datos de un autor específico basado en su identificador.
     *     tags:
     *       - Authors
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Identificador único del autor
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               nationality:
     *                 type: string
     *               birthDate:
     *                 type: number
     *               biography:
     *                 type: string
     *     responses:
     *       200:
     *         description: Autor actualizado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 name:
     *                   type: string
     *                 nationality:
     *                   type: string
     *                 birthDate:
     *                   type: number
     *                 biography:
     *                   type: string
     */
    router.put("/:id", controller.updateAuthor);

    /**
     * @openapi
     * /api/authors/{id}:
     *   delete:
     *     summary: Eliminar un autor
     *     description: Elimina un autor específico basado en su identificador.
     *     tags:
     *       - Authors
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Identificador único del autor
     *     responses:
     *       200:
     *         description: Autor eliminado exitosamente
     */
    router.delete("/:id", controller.deleteAuthor);

    return router;
  }
}
