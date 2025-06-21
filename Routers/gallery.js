import express from "express";
import { addGallery, getGallery, deleteGallery } from "../Controllers/gallery";
import { logger, isAdmin, verfyToken, galleryImageUpload } from "../Middleware";

const galleryRouter = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     addGallery:
 *       type: object
 *       required:
 *         - title
 *         - backdropImage
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the gallery item
 *         backdropImage:
 *           type: string
 *           description: URL or path to the backdrop image
 *         description:
 *           type: string
 *           description: A brief description of the gallery item
 *       example:
 *         title: "Beautiful Sunset"
 *         backdropImage: "https://example.com/sunset.jpg"
 *         description: "A stunning view of the sunset over the ocean."
 */



/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: API endpoints for managing Gallery 
 */

/**
 * @swagger
 * /api/v1/gallery/addGallery:
 *   post:
 *     summary: Add a new image to the gallery
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addGallery'
 *     responses:
 *       200:
 *         description: Image added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/addGallery'
 *       500:
 *         description: Internal Server Error
 */




/**
 * @swagger
 * /api/v1/gallery/getGallery:
 *   get:
 *     summary: Get the list of images in the gallery
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of images in the gallery
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/addGallery'
 *       500:
 *         description: Internal Server Error
 */



/**
 * @swagger
 * /api/v1/gallery/deleteGallery/{id}:
 *   delete:
 *     summary: Delete an image from the gallery by ID
 *     tags: [Gallery]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The image ID to delete
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/addGallery'
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal Server Error
 */


galleryRouter.post("/addGallery/", galleryImageUpload, verfyToken, addGallery);
galleryRouter.get("/getGallery/", verfyToken, getGallery);
galleryRouter.delete("/deleteGallery/:id", verfyToken, deleteGallery);

export default galleryRouter;
