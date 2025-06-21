// import express from "express";
// import { addCowCategory, getCowCategory, getCowCategoryById, deleteCowCategory } from "../Controllers/cowCategory";
// import { verfyToken } from "../Middleware";

// const categoryRouter = express.Router();


// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     BearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *   schemas:
//  *     addCategory:
//  *       type: object
//  *       required:
//  *         - categoryType
//  *         - description
//  *       properties:
//  *         categoryType:
//  *           type: string
//  *           description: Type of cow category
//  *         description:
//  *           type: string
//  *           description: Description of the cow category
//  *       example:
//  *         categoryType: milk
//  *         description: 10
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: CowCategory
//  *   description: API endpoints for managing cow categories
//  */

// /**
//  * @swagger
//  * /cowCategory/addCowCategory:
//  *   post:
//  *     summary: Add a new cow category
//  *     tags: [CowCategory]
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/addCategory'
//  *     responses:
//  *       201:
//  *         description: Cow category added successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/addCategory'
//  *       500:
//  *         description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /cowCategory/getCowCategory:
//  *   get:
//  *     summary: Returns the list of all cow categories
//  *     tags: [CowCategory]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: The list of all cow categories
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/addCategory'
//  *       204:
//  *         description: No cow categories found in the database
//  *       403:
//  *         description: Unauthorized access
//  *       404:
//  *         description: Not found
//  *       500:
//  *         description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /cowCategory/getCowCategoryById/{id}:
//  *   get:
//  *     summary: Get cow category by ID
//  *     tags: [CowCategory]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *        - in: path
//  *          name: id
//  *          schema:
//  *             type: string
//  *          required: true
//  *          description: The cow category ID
//  *        - in: header
//  *          name: Authorization
//  *          required: true
//  *          description: The user access token
//  *     responses:
//  *       200:
//  *          description: The cow category found by ID
//  *          content:
//  *             application/json:
//  *               schema:
//  *                 $ref: '#/components/schemas/addCategory'
//  *       204:
//  *          description: No cow category found in the database
//  *       403:
//  *          description: Unauthorized access
//  *       404:
//  *          description: Cow category not found
//  *       500:
//  *          description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /cowCategory/deleteCowCategory/{id}:
//  *   delete:
//  *     summary: Delete cow category by ID
//  *     tags: [CowCategory]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The cow category ID
//  *       - in: header
//  *         name: Authorization
//  *         required: true
//  *         description: The user access token
//  *     responses:
//  *       200:
//  *         description: Cow category deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/addCategory'
//  *       204:
//  *         description: No cow category found in the database
//  *       401:
//  *         description: Unauthorized access
//  *       404:
//  *         description: Cow category not found
//  *       500:
//  *         description: Internal Server Error
//  */



// categoryRouter.post("/addCowCategory/", addCowCategory);
// categoryRouter.get("/getCowCategory/", getCowCategory);
// categoryRouter.get("/getCowCategoryById/:id", getCowCategoryById);
// categoryRouter.delete("/deleteCowCategory/:id", deleteCowCategory);


// export default categoryRouter;
