import express from "express";
import { addFinancial, getFinancial, updateFinancial, getFinancialById, deleteFinancial } from "../Controllers/Financial";
import { verfyToken } from "../Middleware";

const financialRouter = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Financial:
 *       type: object
 *       required:
 *         - sales
 *         - litresSold
 *         - animalEarTag
 *         - financeType
 *         - notes
 *         - dateOfRecord
 *         - paymentDate
 *         - amount
 *         - administrator
 *       properties:
 *         sales:
 *           type: string
 *           description: The sales the farmer made
 *         litresSold:
 *           type: string
 *           description: The number of liters sold
 *         animalEarTag:
 *           type: string
 *           description: The cow tag for the cow that provides the milk
 *         financeType:
 *           type: string
 *           description: Type of financial record (e.g., expense, income)
 *         notes:
 *           type: string
 *           description: Additional notes or details about the financial record
 *         dateOfRecord:
 *           type: string
 *           format: date
 *           description: Date when the financial record was recorded
 *         paymentDate:
 *           type: string
 *           format: date
 *           description: Date when the payment is due or received
 *         amount:
 *           type: number
 *           description: The financial amount associated with the record
 *         administrator:
 *           type: string
 *           description: Administrator responsible for the financial record
 *       example:
 *         sales: milk
 *         litresSold: 10
 *         animalEarTag: M 23
 *         financeType: income
 *         notes: Milk sales revenue
 *         dateOfRecord: 2023-01-01
 *         paymentDate: 2023-01-15
 *         amount: 1000
 *         administrator: John Doe
 */

/**
 * @swagger
 * tags:
 *   - name: Financial
 *     description: API endpoints for managing financial records
 */

/**
 * @swagger
 * /api/v1/financial/getFinancial:
 *   get:
 *     summary: Returns the list of all financial records
 *     tags:
 *       - Financial
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: The list of all financial records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Financial'
 *       '204':
 *         description: No financial records found in the database
 *       '403':
 *         description: Unauthorized access
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/financial/financialById/{id}:
 *   get:
 *     summary: Get the Financial by ID
 *     tags:
 *       - Financial
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The financial ID
 *     responses:
 *       '200':
 *         description: The Financial found by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Financial'
 *       '204':
 *         description: No financial data found in the database
 *       '403':
 *         description: Unauthorized access
 *       '404':
 *         description: Financial data not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/financial/addFinancial:
 *   post:
 *     summary: Record financial data
 *     tags:
 *       - Financial
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Financial'
 *     responses:
 *       '201':
 *         description: Financial data recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Financial'
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/financial/updateFinancial/{id}:
 *   put:
 *     summary: Update financial data by ID
 *     tags:
 *       - Financial
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Financial'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The financial data ID
 *     responses:
 *       '200':
 *         description: Financial data modified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Financial'
 *       '204':
 *         description: No financial data found in the database
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Financial data not found
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/financial/deleteFinancial/{id}:
 *   delete:
 *     summary: Delete financial data by ID
 *     tags:
 *       - Financial
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The financial data ID
 *     responses:
 *       '200':
 *         description: Financial data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Financial'
 *       '204':
 *         description: No financial data found in the database
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Financial data not found
 *       '500':
 *         description: Internal Server Error
 */


financialRouter.post("/addFinancial", addFinancial);
financialRouter.get("/getFinancial/", getFinancial);
financialRouter.get("/financialById/:id", getFinancialById);
financialRouter.delete("/deleteFinancial/:id", deleteFinancial);
financialRouter.put("/updateFinancial/:id", updateFinancial);

export default financialRouter;
