import { Router } from "express";
import { CategoriesController } from "./categories.controller";

export class CategoriesRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new CategoriesController();

    /**
     * @openapi
     * /api/categories/{countCategories}:
     *   get:
     *     summary: Obtener listado de categorías
     *     description: Retorna una lista de categorías generadas dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Categories
     *     parameters:
     *       - in: path
     *         name: countCategories
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 5
     *         description: Cantidad de categorías a generar
     *     responses:
     *       200:
     *         description: Lista de categorías generadas
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
     *                   description:
     *                     type: string
     *                   icon:
     *                     type: string
     */
    router.get("/:countCategories", controller.getAllCategories);

    /**
     * @openapi
     * /api/categories/detail/{id}:
     *   get:
     *     summary: Obtener categoría por ID
     *     description: Retorna una categoría específica basada en su identificador único.
     *     tags:
     *       - Categories
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Identificador único de la categoría
     *     responses:
     *       200:
     *         description: Categoría obtenida exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 name:
     *                   type: string
     *                 description:
     *                   type: string
     *                 icon:
     *                   type: string
     */
    router.get("/detail/:id", controller.getCategoryById);

    /**
     * @openapi
     * /api/categories:
     *   post:
     *     summary: Crear una nueva categoría
     *     description: Crea una nueva categoría con los datos proporcionados en el cuerpo de la solicitud.
     *     tags:
     *       - Categories
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - description
     *               - icon
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Ficción"
     *               description:
     *                 type: string
     *                 example: "Novelas, cuentos y relatos de ficción general"
     *               icon:
     *                 type: string
     *                 example: "book-heart"
     *     responses:
     *       201:
     *         description: Categoría creada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 name:
     *                   type: string
     *                 description:
     *                   type: string
     *                 icon:
     *                   type: string
     */
    router.post("/", controller.createCategory);

    /**
     * @openapi
     * /api/categories/{id}:
     *   put:
     *     summary: Actualizar una categoría existente
     *     description: Actualiza los datos de una categoría específica basada en su identificador.
     *     tags:
     *       - Categories
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Identificador único de la categoría
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *               icon:
     *                 type: string
     *     responses:
     *       200:
     *         description: Categoría actualizada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 name:
     *                   type: string
     *                 description:
     *                   type: string
     *                 icon:
     *                   type: string
     */
    router.put("/:id", controller.updateCategory);

    /**
     * @openapi
     * /api/categories/{id}:
     *   delete:
     *     summary: Eliminar una categoría
     *     description: Elimina una categoría específica basada en su identificador.
     *     tags:
     *       - Categories
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           example: 1
     *         description: Identificador único de la categoría
     *     responses:
     *       200:
     *         description: Categoría eliminada exitosamente
     */
    router.delete("/:id", controller.deleteCategory);

    return router;
  }
}
