import express from "express";
import { addWorker, getWorker, deleteWorker, updateWorker, getWorkerById } from "../Controllers/worker";
import { verfyToken } from "../Middleware";

const workerRouter = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Worker:
 *       type: object
 *       required:
 *         - email
 *         - fullNames
 *         - phoneNumber
 *         - location
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the worker
 *         fullNames:
 *           type: string
 *           description: Full names of the worker
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the worker
 *         location:
 *           type: string
 *           description: Location of the worker
 *       example:
 *         email: "worker@example.com"
 *         fullNames: "John Doe"
 *         phoneNumber: "+1234567890"
 *         location: "Office"
 */

/**
 * @swagger
 * tags:
 *   name: Worker
 *   description: API endpoints for managing Worker
 */

/**
 * @swagger
 * /api/v1/Worker/addWorker:
 *   post:
 *     summary: Add a new worker
 *     tags: [Worker]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Worker'
 *     responses:
 *       201:
 *         description: Worker added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Worker'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/Worker/getWorker:
 *   get:
 *     summary: Get the list of workers
 *     tags: [Worker]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of workers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Worker'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/Worker/deleteWorker/{id}:
 *   delete:
 *     summary: Delete a worker by ID
 *     tags: [Worker]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The worker ID to delete
 *     responses:
 *       200:
 *         description: Worker deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Worker'
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Worker not found
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /api/v1/Worker/updateWorker/{id}:
 *   put:
 *     summary: Update a worker by ID
 *     tags: [Worker]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The worker ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Worker'
 *     responses:
 *       200:
 *         description: Worker updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Worker'
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Worker not found
 *       500:
 *         description: Internal Server Error
 */




/**
 * @swagger
 * /api/v1/Worker/getWorkerById/{id}:
 *   get:
 *     summary: Get a worker by ID
 *     tags: [Worker]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The worker ID to fetch
 *     responses:
 *       200:
 *         description: Worker details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Worker '
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Worker not found
 *       500:
 *         description: Internal Server Error
 */


workerRouter.post("/addworker", addWorker);
workerRouter.get("/getworker", getWorker);
workerRouter.delete("/deleteworker/:id", deleteWorker);
workerRouter.put("/updateworker/:id", updateWorker);
workerRouter.get("/getworkerById", getWorkerById);


export default workerRouter;