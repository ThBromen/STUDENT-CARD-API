import express from "express";
import {
    recordCow, recordHeifers, recordCalves, recordBull,
    deleteCow, getAllCow, getCowBytype, updateCow, getCowByEarTag
} from "../Controllers/cows";

import { verfyToken } from "../Middleware";

const cowRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Cows:
 *       type: object
 *       required:
 *         - earTag
 *         - categoryType
 *         - breedType
 *         - status
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         categoryType:
 *           type: string
 *           description: The category type of the cow (e.g., Dairy, Beef)
 *         breedType:
 *           type: string
 *           description: The breed type of the cow
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the cow
 *         calfNumber:
 *           type: string
 *           description: The calf number of the cow
 *         lactating:
 *           type: string
 *           description: Indicates if the cow is lactating (Yes/No)
 *         numberOfCalving:
 *           type: integer
 *           description: The number of calving events
 *         litresOfMilkItProduces:
 *           type: integer
 *           description: The amount of milk the cow produces
 *         mothersEarTag:
 *           type: string
 *           description: The ear tag of the mother cow
 *         siresEarTag:
 *           type: string
 *           description: The ear tag of the sire (father) cow
 *         weightAtBirth:
 *           type: string
 *           description: The weight of the cow at birth
 *         weaningPeriod:
 *           type: string
 *           description: The weaning period of the cow
 *         castrationPeriod:
 *           type: string
 *           description: The castration period of the cow (Yes/No)
 *         inseminationPeriod:
 *           type: string
 *           description: The insemination period of the cow (Yes/No)
 *         whereItWasPurchased:
 *           type: string
 *           description: The place where the cow was purchased
 *         purchasedDate:
 *           type: string
 *           format: date
 *           description: The date when the cow was purchased
 *         purchasedWeight:
 *           type: string
 *           description: The purchased weight of the cow
 *         dateOfGivingBirth:
 *           type: string
 *           format: date
 *           description: The date when the cow gave birth
 *         lifeStatus:
 *           type: string
 *           description: The life status of the cow (e.g., Alive, Deceased)
 *         status:
 *           type: string
 *           description: The current status of the cow
 *         purchasedPrice:
 *           type: string
 *           description: The price at which the cow was purchased
 *         yearlingDate:
 *           type: string
 *           format: date
 *           description: The date when the cow becomes a yearling
 *         yearlingWeight:
 *           type: string
 *           description: The weight of the cow when it becomes a yearling
 *       example:
 *         earTag: "C001"
 *         categoryType: "Dairy"
 *         breedType: "Holstein"
 *         dateOfBirth: "2022-01-01"
 *         calfNumber: "CN001"
 *         lactating: "Yes"
 *         numberOfCalving: 1
 *         litresOfMilkItProduces: 20
 *         mothersEarTag: "M001"
 *         siresEarTag: "S001"
 *         weightAtBirth: "50 kg"
 *         weaningPeriod: "3 months"
 *         castrationPeriod: "No"
 *         inseminationPeriod: "Yes"
 *         whereItWasPurchased: "Farm A"
 *         purchasedDate: "2021-12-01"
 *         purchasedWeight: "500 kg"
 *         dateOfGivingBirth: "2023-01-15"
 *         lifeStatus: "Alive"
 *         status: "Healthy"
 *         purchasedPrice: "$1000"
 *         yearlingDate: "2023-12-01"
 *         yearlingWeight: "600 kg"
 *     Heifers:
 *       type: object
 *       required:
 *         - earTag
 *         - categoryType
 *         - breedType
 *         - status
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         categoryType:
 *           type: string
 *           description: The category type of the cow (e.g., Cow, Bull)
 *         breedType:
 *           type: string
 *           description: The breed type of the cow
 *         status:
 *           type: string
 *           description: The current status of the cow
 *         calfNumber:
 *           type: string
 *           description: The calf number of the cow
 *         lactating:
 *           type: string
 *           description: Indicates if the cow is lactating (Yes/No)
 *         numberOfCalving:
 *           type: integer
 *           description: The number of calving events
 *         litresOfMilkItProduces:
 *           type: integer
 *           description: The amount of milk the cow produces
 *         inseminationPeriod:
 *           type: string
 *           description: The insemination period of the cow (Yes/No)
 *       example:
 *         earTag: "C001"
 *         categoryType: "Dairy"
 *         breedType: "Holstein"
 *         status: "Pregnancy"
 *         calfNumber: "CN001"
 *         lactating: "Yes"
 *         numberOfCalving: 4
 *         litresOfMilkItProduces: 20
 *         inseminationPeriod: "Yes"
 *     Calves:
 *       type: object
 *       required:
 *         - earTag
 *         - categoryType
 *         - breedType
 *         - status
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the Calve
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the Calve
 *         mothersEarTag:
 *           type: string
 *           description: The ear tag of the mother Calve
 *         siresEarTag:
 *           type: string
 *           description: The ear tag of the sire (father) Calve
 *         weightAtBirth:
 *           type: string
 *           description: The weight of the cow at birth
 *         weaningPeriod:
 *           type: string
 *           description: The weaning period of the Calve
 *       example:
 *         earTag: "C001"
 *         dateOfBirth: "2022-01-01"
 *         mothersEarTag: "M001"
 *         siresEarTag: "S001"
 *         weightAtBirth: "50 kg"
 *         weaningPeriod: "3 months"
 *     Bull:
 *       type: object
 *       required:
 *         - earTag
 *         - categoryType
 *         - breedType
 *         - status
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the bull
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The date of birth of the bull
 *         mothersEarTag:
 *           type: string
 *           description: The ear tag of the mother bull
 *         siresEarTag:
 *           type: string
 *           description: The ear tag of the sire (father) bull
 *         weightAtBirth:
 *           type: string
 *           description: The weight of the cow at birth
 *         castrationPeriod:
 *           type: string
 *           description: The Castration period of the bull
 *       example:
 *         earTag: "C001"
 *         dateOfBirth: "2022-01-01"
 *         mothersEarTag: "M001"
 *         siresEarTag: "S001"
 *         weightAtBirth: "50 kg"
 *         castrationPeriod: "3 months"
 */

/**
 * @swagger
 * tags:
 *   name: Cow
 *   description: The Cow managing API
 */

/**
 * @swagger
 * /api/v1/createCow/recordCow:
 *   post:
 *     summary: Record cow data
 *     tags: [Cow]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cows'
 *     responses:
 *       201:
 *         description: Cow data recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cows'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/createCow/recordHeifers:
 *   post:
 *     summary: Record heifers data
 *     tags: [Cow]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Heifers'
 *     responses:
 *       201:
 *         description: Heifers data recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Heifers'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/createCow/recordCalves:
 *   post:
 *     summary: Record calves data
 *     tags: [Cow]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Calves'
 *     responses:
 *       201:
 *         description: Calves data recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calves'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/createCow/recordBull:
 *   post:
 *     summary: Record bull data
 *     tags: [Cow]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bull'
 *     responses:
 *       201:
 *         description: Bull data recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bull'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/createCow/getCow:
 *   get:
 *     summary: Returns the list of all cows
 *     tags: [Cow]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The list of all cows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cows'
 *       204:
 *         description: No cows found in the database
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /api/v1/createCow/getCowBytype/{type}:
 *   get:
 *     summary: Get cows by type
 *     tags: [Cow]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: The cow type
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: The user access token
 *     responses:
 *       200:
 *         description: The list of cows by type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cows'
 *       204:
 *         description: No cows found for the given type
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Cow not found
 *       500:
 *         description: Internal Server Error
 */




/**
 * @swagger
 * /api/v1/createCow/getCowByEarTag/{earTag}:
 *   get:
 *     summary: Get cow by ear tag
 *     tags: [Cow]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: earTag
 *         schema:
 *           type: string
 *         required: true
 *         description: The cow ear tag
 *     responses:
 *       200:
 *         description: The cow found by ear tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cows'
 *       204:
 *         description: No cow found for the given ear tag
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Cow not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/createCow/deleteCow/{id}:
 *   delete:
 *     summary: Delete cow by ID
 *     tags: [Cow]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The cow ID
 *     responses:
 *       200:
 *         description: Cow deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cows'
 *       204:
 *         description: No cow found in the database
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Cow not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/createCow/updateCow/{earTag}:
 *   put:
 *     summary: Update cow by ID
 *     tags: [Cow]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: earTag
 *         schema:
 *           type: string
 *         required: true
 *         description: The cow ear tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cows'
 *     responses:
 *       200:
 *         description: Cow updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cows'
 *       204:
 *         description: No cow found in the database
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Cow not found
 *       500:
 *         description: Internal Server Error
 */


cowRouter.post("/recordCow/", recordCow);
cowRouter.post("/recordHeifers/", recordHeifers);
cowRouter.post("/recordCalves/", recordCalves);
cowRouter.post("/recordBull/", recordBull);
cowRouter.get("/getCow/", getAllCow);
cowRouter.get("/getCowBytype/:type", getCowBytype);
cowRouter.get("/getCowByEarTag/:earTag", getCowByEarTag);
cowRouter.delete("/deleteCow/:id", deleteCow);
cowRouter.put("/updateCow/:earTag", updateCow);

export default cowRouter;