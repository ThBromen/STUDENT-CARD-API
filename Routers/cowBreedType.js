// import express from "express";
// import { addCowBreed, getCowBreed, getCowBreedById, deleteCowBreed } from "../Controllers/breed";
// import { verfyToken } from "../Middleware";

// const breedRouter = express.Router();

// /**
//  * @swagger
//  * components:
//  *   securitySchemes:
//  *     BearerAuth:
//  *       type: http
//  *       scheme: bearer
//  *       bearerFormat: JWT
//  *   schemas:
//  *     addBreed:
//  *       type: object
//  *       required:
//  *         - breedType
//  *         - description
//  *       properties:
//  *         breedType:
//  *           type: string
//  *           description: The type of cow breed
//  *         description:
//  *           type: string
//  *           description: Description of the cow breed
//  *       example:
//  *         breedType: Ankole
//  *         description: Cow breed
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: BreedCategory
//  *   description: API endpoints for managing cow BreedCategorys
//  */

// /**
//  * @swagger
//  * /cowBreed/getCowBreed:
//  *   get:
//  *     summary: Returns the list of all cow breeds
//  *     tags: [BreedCategory]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: The list of all cow breeds
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/addBreed'
//  *       204:
//  *         description: No cow breeds found in the database
//  *       403:
//  *         description: Unauthorized access
//  *       404:
//  *         description: Not found
//  *       500:
//  *         description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /cowBreed/getCowBreedById/{id}:
//  *   get:
//  *     summary: Get cow breed by ID
//  *     tags: [BreedCategory]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *        - in: path
//  *          name: id
//  *          schema:
//  *             type: string
//  *          required: true
//  *          description: The cow breed ID
//  *        - in: header
//  *          name: Authorization
//  *          required: true
//  *          description: The user access token
//  *     responses:
//  *       200:
//  *          description: The cow breed found by ID
//  *          content:
//  *             application/json:
//  *               schema:
//  *                 $ref: '#/components/schemas/addBreed'
//  *       204:
//  *          description: No cow breed found in the database
//  *       403:
//  *          description: Unauthorized access
//  *       404:
//  *          description: Cow breed not found
//  *       500:
//  *          description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /cowBreed/addCowBreed:
//  *   post:
//  *     summary: Add a new cow breed
//  *     tags: [BreedCategory]
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/addBreed'
//  *     responses:
//  *       201:
//  *         description: Cow breed added successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/addBreed'
//  *       500:
//  *         description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /cowBreed/deleteCowBreed/{id}:
//  *   delete:
//  *     summary: Delete cow breed by ID
//  *     tags: [BreedCategory]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The cow breed ID
//  *       - in: header
//  *         name: Authorization
//  *         required: true
//  *         description: The user access token
//  *     responses:
//  *       200:
//  *         description: Cow breed deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/addBreed'
//  *       204:
//  *         description: No cow breed found in the database
//  *       401:
//  *         description: Unauthorized access
//  *       404:
//  *         description: Cow breed not found
//  *       500:
//  *         description: Internal Server Error
//  */



// breedRouter.post("/addCowBread", verfyToken, addCowBreed);
// breedRouter.get("/getCowBreed/", verfyToken, getCowBreed);
// breedRouter.get("/getCowBreedById/:id", verfyToken, getCowBreedById);
// breedRouter.delete("/deleteCowBreed/:id", verfyToken, deleteCowBreed);

// export default breedRouter;
