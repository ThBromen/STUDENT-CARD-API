import express from "express";
import { addPasture, getPasture, updatePasture, getPastureById, deletePasture } from "../Controllers/pasture";
import { verfyToken } from "../Middleware";

const pastureRouter = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Pasture:
 *       type: object
 *       required:
 *         - pastureName
 *         - Owner
 *         - area
 *       properties:
 *         pastureName:
 *           type: string
 *           description: The name of the pasture
 *         Owner:
 *           type: string
 *           description: The owner of the pasture
 *         area:
 *           type: string
 *           description: The area of the pasture
 *         numberOfCattles:
 *           type: string
 *           description: The number of cattle in the pasture
 *       example:
 *         pastureName: Meadow
 *         Owner: John Doe
 *         area: 10 acres
 *         numberOfCattles: 50
 */

/**
 * @swagger
 * tags:
 *   name: Pasture
 *   description: API endpoints for managing Pasture records
 */

/**
 * @swagger
 * /api/v1/pasture/getPasture:
 *   get:
 *     summary: Returns the list of all Pasture records
 *     tags: [Pasture]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The list of all Pasture records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pasture'
 *       204:
 *         description: No Pasture records found in the database
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/pasture/getPastureById/{id}:
 *   get:
 *     summary: Get the Pasture by id
 *     tags: [Pasture]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The pasture ID
 *     responses:
 *       200:
 *          description: The Pasture found by id
 *          content:
 *             application/json:
 *       204:
 *          description: No Pasture found in the database
 *       403:
 *          description: Unauthorized access
 *       404:
 *          description: Pasture not found
 *       500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/pasture/addPasture:
 *   post:
 *     summary: Record Pasture data
 *     tags: [Pasture]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pasture'
 *     responses:
 *       201:
 *         description: Pasture data recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pasture'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/pasture/updatePasture/{id}:
 *   put:
 *     summary: Update Pasture data by ID
 *     tags: [Pasture]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pasture'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Pasture data ID
 *     responses:
 *       200:
 *         description: Pasture data modified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pasture'
 *       204:
 *         description: No Pasture data found in the database
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Pasture data not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/pasture/deletePasture/{id}:
 *   delete:
 *     summary: Delete Pasture data by ID
 *     tags: [Pasture]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Pasture data ID
 *     responses:
 *       200:
 *         description: Pasture data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pasture'
 *       204:
 *         description: No Pasture data found in the database
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Pasture data not found
 *       500:
 *         description: Internal Server Error
 */


pastureRouter.post("/addPasture", addPasture);
pastureRouter.get("/getPasture", getPasture);
pastureRouter.get("/getPastureById/:id", getPastureById);
pastureRouter.delete("/deletePasture/:id", deletePasture);
pastureRouter.put("/updatePasture/:id", updatePasture);

export default pastureRouter;
