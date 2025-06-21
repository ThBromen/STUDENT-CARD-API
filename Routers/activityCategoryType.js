// import express from "express";
// import { addActivityCategory, deleteActivityCategory, getActivityCategory, getActivityCategoryById } from "../Controllers/activityCategory";
// import { verifyToken } from "../Middleware";

// const activityTypeRouter = express.Router();

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
//  *           description: Type of the activity category (e.g., "milk")
//  *         description:
//  *           type: string
//  *           description: Description of the activity category (e.g., "Category for milk-related activities")
//  *       example:
//  *         categoryType: "milk"
//  *         description: "Category for milk-related activities"
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: ActivityCategory
//  *   description: API endpoints for managing activity categories
//  */

// /**
//  * @swagger
//  * /activityCategory/addActivityCategory:
//  *   post:
//  *     summary: Add a new activity category
//  *     tags: [ActivityCategory]
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
//  *         description: Activity category added successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/addCategory'
//  *       500:
//  *         description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /activityCategory/getActivityCategory:
//  *   get:
//  *     summary: Returns the list of all activity categories
//  *     tags: [ActivityCategory]
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       200:
//  *         description: The list of all activity categories
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/addCategory'
//  *       204:
//  *         description: No activity categories found in the database
//  *       403:
//  *         description: Unauthorized access
//  *       404:
//  *         description: Not found
//  *       500:
//  *         description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /activityCategory/getActivityCategoryById/{id}:
//  *   get:
//  *     summary: Get activity category by ID
//  *     tags: [ActivityCategory]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *        - in: path
//  *          name: id
//  *          schema:
//  *             type: string
//  *          required: true
//  *          description: The activity category ID
//  *        - in: header
//  *          name: Authorization
//  *          required: true
//  *          description: The user access token
//  *     responses:
//  *       200:
//  *          description: The activity category found by ID
//  *          content:
//  *             application/json:
//  *               schema:
//  *                 $ref: '#/components/schemas/addCategory'
//  *       204:
//  *          description: No activity category found in the database
//  *       403:
//  *          description: Unauthorized access
//  *       404:
//  *          description: Activity category not found
//  *       500:
//  *          description: Internal Server Error
//  */

// /**
//  * @swagger
//  * /activityCategory/deleteActivityCategory/{id}:
//  *   delete:
//  *     summary: Delete activity category by ID
//  *     tags: [ActivityCategory]
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The activity category ID
//  *       - in: header
//  *         name: Authorization
//  *         required: true
//  *         description: The user access token
//  *     responses:
//  *       200:
//  *         description: Activity category deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/addCategory'
//  *       204:
//  *         description: No activity category found in the database
//  *       401:
//  *         description: Unauthorized access
//  *       404:
//  *         description: Activity category not found
//  *       500:
//  *         description: Internal Server Error
//  */

// activityTypeRouter.post("/addActivityCategory/", addActivityCategory);
// activityTypeRouter.get("/getActivityCategory/", getActivityCategory);
// activityTypeRouter.get("/getActivityCategoryById/:id", getActivityCategoryById);
// activityTypeRouter.delete("/deleteActivityCategory/:id", deleteActivityCategory);

// export default activityTypeRouter;
