import express from "express";
import { addCardRequest, getCardRequests, deleteCardRequest, updateCardRequestStatus, generateCardImage, getAllCards } from "../Controllers/cardRequest/cardRequestController";
import { cardRequestImageUpload, galleryImageUpload } from "../Middleware/cloudinary";

const cardRequestRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     CardRequest:
 *       type: object
 *       required:
 *         - title
 *         - photo
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the card request
 *         photo:
 *           type: string
 *           description: URL or path to the uploaded photo
 *         description:
 *           type: string
 *           description: A brief description of the card request
 *       example:
 *         title: "Student ID Request"
 *         photo: "https://example.com/photo.jpg"
 *         description: "Request for a new student ID card."
 */

/**
 * @swagger
 * tags:
 *   name: CardRequest
 *   description: API endpoints for managing card requests
 */

/**
 * @swagger
 * /api/v1/cardRequest:
 *   post:
 *     summary: Add a new card request with a photo
 *     tags: [CardRequest]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CardRequest'
 *     responses:
 *       201:
 *         description: Card request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CardRequest'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/cardRequest:
 *   get:
 *     summary: Get the list of card requests
 *     tags: [CardRequest]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of card requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CardRequest'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/cardRequest/{id}:
 *   delete:
 *     summary: Delete a card request by ID
 *     tags: [CardRequest]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The card request ID to delete
 *     responses:
 *       200:
 *         description: Card request deleted successfully
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Card request not found
 *       500:
 *         description: Internal Server Error
 */

// Routes
cardRequestRouter.post("/card", cardRequestImageUpload  , addCardRequest);
cardRequestRouter.get("/card/all-cards", getAllCards);
cardRequestRouter.patch("/card/:id", updateCardRequestStatus);
// cardRequestRouter.post("/card/:id/image", generateCardImage);
cardRequestRouter.get("/card", getCardRequests);
cardRequestRouter.delete("/card/:id", deleteCardRequest);

export default cardRequestRouter;
