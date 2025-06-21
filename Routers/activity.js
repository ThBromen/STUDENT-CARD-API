import express from "express";
import {
    recordActivity, recordTreatment, recordCastration, recordWeaning, recordBreeding,
    deleteActivity, getActivityBytype, getAllActivity, updateActivity, getActivityById,
    recordSales, recordNewbirth, recordDead, recordPromoted, recordPurginacy
} from "../Controllers/activity";

import { verfyToken } from "../Middleware";

const activityRouter = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         treatmentDate:
 *           type: string
 *           format: date
 *           description: Date of treatment
 *         diseaseDiagnosed:
 *           type: string
 *           description: Diagnosed disease
 *         dosageInml:
 *           type: string
 *           description: Dosage in milliliters
 *         routeType:
 *           type: string
 *           description: Type of administration route
 *         vaccinationDate:
 *           type: string
 *           format: date
 *           description: Date of vaccination
 *         vaccineAdministered:
 *           type: string
 *           description: Administered vaccine
 *         castrationDate:
 *           type: string
 *           format: date
 *           description: Date of castration
 *         castratedBy:
 *           type: string
 *           description: Person who performed castration
 *         castrationMethod:
 *           type: string
 *           description: Method of castration
 *         howItWent:
 *           type: string
 *           default: Successful
 *           description: Outcome description
 *         weaningDate:
 *           type: string
 *           format: date
 *           description: Date of weaning
 *         weaningWeight:
 *           type: string
 *           description: Weight at weaning
 *         breedingDate:
 *           type: string
 *           format: date
 *           description: Date of breeding
 *         methodOfBreeding:
 *           type: string
 *           description: Breeding method
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of the activity
 *         saleDate:
 *           type: string
 *           format: date
 *           description: Date of sale
 *         salePrice:
 *           type: string
 *           description: Sale price of the cow
 *         soldTo:
 *           type: string
 *           description: Person or entity to which the cow was sold
 *         notes:
 *           type: string
 *           description: Additional notes related to the activity
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Date of birth
 *         birthWeight:
 *           type: string
 *           description: Birth weight of the calf
 *         checkDate:
 *           type: string
 *           format: date
 *           description: Date of activity check
 *         method:
 *           type: string
 *           description: Method used in the activity
 *         result:
 *           type: string
 *           description: Result of the activity
 *         promotionDate:
 *           type: string
 *           format: date
 *           description: Date of promotion
 *       example:
 *         earTag: "C001"
 *         treatmentDate: "2023-01-01"
 *         diseaseDiagnosed: "Fever"
 *         dosageInml: "5"
 *         routeType: "Oral"
 *         vaccinationDate: "2023-02-01"
 *         vaccineAdministered: "Vaccine A"
 *         castrationDate: "2023-03-01"
 *         castratedBy: "Veterinarian X"
 *         castrationMethod: "Surgical"
 *         howItWent: "Successful"
 *         weaningDate: "2023-04-01"
 *         weaningWeight: "150"
 *         breedingDate: "2023-05-01"
 *         methodOfBreeding: "Artificial Insemination"
 *         endDate: "2023-06-01"
 *         saleDate: "2023-07-01"
 *         salePrice: "500"
 *         soldTo: "Buyer Y"
 *         notes: "Additional notes"
 *         birthDate: "2023-08-01"
 *         birthWeight: "30"
 *         checkDate: "2023-09-01"
 *         method: "Observation"
 *         result: "Healthy"
 *         promotionDate: "2023-10-01"
 *
 *     Treatment:
 *       type: object
 *       required:
 *         - earTag
 *         - treatmentDate
 *         - diseaseDiagnosed
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         treatmentDate:
 *           type: string
 *           format: date
 *           description: Date of treatment
 *         diseaseDiagnosed:
 *           type: string
 *           description: Diagnosed disease
 *         dosageInml:
 *           type: string
 *           description: Dosage in milliliters
 *         routeType:
 *           type: string
 *           description: Type of administration route
 *         vaccinationDate:
 *           type: string
 *           format: date
 *           description: Date of vaccination
 *         vaccineAdministered:
 *           type: string
 *           description: Administered vaccine
 *       example:
 *         earTag: "C001"
 *         treatmentDate: "2023-01-01"
 *         diseaseDiagnosed: "Fever"
 *         dosageInml: "5"
 *         routeType: "Oral"
 *         vaccinationDate: "2023-02-01"
 *         vaccineAdministered: "Hitimana"
 *
 *     Castration:
 *       type: object
 *       required:
 *         - earTag
 *         - castrationDate
 *         - castratedBy
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         castrationDate:
 *           type: string
 *           format: date
 *           description: Date of castration
 *         castratedBy:
 *           type: string
 *           description: Person who performed castration
 *         castrationMethod:
 *           type: string
 *           description: Method of castration
 *         howItWent:
 *           type: string
 *           default: Successful
 *           description: Outcome description
 *       example:
 *         earTag: "C001"
 *         castrationDate: "2023-03-01"
 *         castratedBy: "Veterinarian X"
 *         castrationMethod: "Surgical"
 *         howItWent: "Successful"
 *
 *     Weaning:
 *       type: object
 *       required:
 *         - earTag
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         weaningDate:
 *           type: string
 *           format: date
 *           description: Date of weaning
 *         weaningWeight:
 *           type: string
 *           description: Weight at weaning
 *       example:
 *         earTag: "C001"
 *         weaningDate: "2023-04-01"
 *         weaningWeight: "150"
 *
 *     Breeding:
 *       type: object
 *       required:
 *         - earTag
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         breedingDate:
 *           type: string
 *           format: date
 *           description: Date of breeding
 *         methodOfBreeding:
 *           type: string
 *           description: Breeding method
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of the activity
 *       example:
 *         earTag: "C001"
 *         breedingDate: "2023-05-01"
 *         methodOfBreeding: "Artificial Breeding"
 *         endDate: "2023-06-01"
 *
 *     Sales:
 *       type: object
 *       required:
 *         - earTag
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         saleDate:
 *           type: string
 *           format: date
 *           description: Date of sale
 *         salePrice:
 *           type: string
 *           description: Sale price of the cow
 *         soldTo:
 *           type: string
 *           description: Person or entity to which the cow was sold
 *         notes:
 *           type: string
 *           description: Additional notes
 *       example:
 *         earTag: "C001"
 *         saleDate: "2023-05-01"
 *         salePrice: "500"
 *         soldTo: "Buyer Y"
 *         notes: "Additional notes"
 *
 *     NewBirth:
 *       type: object
 *       required:
 *         - earTag
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Date of birth
 *         birthWeight:
 *           type: string
 *           description: Birth weight of the calf
 *         notes:
 *           type: string
 *           description: Additional notes
 *       example:
 *         earTag: "C001"
 *         birthDate: "2023-08-01"
 *         birthWeight: "30"
 *         notes: "Additional notes"
 *
 *     DeadActivity:
 *       type: object
 *       required:
 *         - Date
 *         - earTag
 *         - deathCause
 *         - DeathDate
 *         - Notes
 *         - activityType
 *       properties:
 *         Date:
 *           type: string
 *           format: date
 *           description: The date of the dead activity
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         deathCause:
 *           type: string
 *           description: The cause of death
 *         DeathDate:
 *           type: string
 *           format: date
 *           description: The date of death
 *         Notes:
 *           type: string
 *           description: Additional notes
 *         activityType:
 *           type: string
 *           default: "DeadCow"
 *           description: The type of activity (e.g., DeadCow)
 *       example:
 *         Date: "2023-01-01"
 *         earTag: "C001"
 *         deathCause: "Natural causes"
 *         DeathDate: "2023-01-15"
 *         Notes: "Found dead in the barn"
 *         activityType: "DeadCow"
 *
 *     Promoted:
 *       type: object
 *       required:
 *         - earTag
 *         - promotionDate
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         promotionDate:
 *           type: string
 *           format: date
 *           description: Promoted to bull date
 *         notes:
 *           type: string
 *           description: Additional notes about promotion
 *       example:
 *         earTag: "C001"
 *         promotionDate: "2023-10-01"
 *         notes: "Cow showed symptoms of illness and passed away on this date."
 *
 *     Purginacy:
 *       type: object
 *       required:
 *         - earTag
 *         - checkDate
 *         - method
 *         - result
 *       properties:
 *         earTag:
 *           type: string
 *           description: The ear tag of the cow
 *         checkDate:
 *           type: string
 *           format: date
 *           description: The date
 *         method:
 *           type: string
 *           description: Method used
 *         result:
 *           type: string
 *           format: date
 *           description: How pagination went
 *         notes:
 *           type: string
 *           description: Pugination process
 *       example:
 *         earTag: "C001"
 *         checkDate: "2023-05-01"
 *         method: "Method used"
 *         result: "The result"
 *         notes: "How pugination check done."
 */


/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: The Activity managing API
 */

/**
 * @swagger
 * /api/v1/Activity/recordActivity:
 *   post:
 *     summary: Record cow  activity
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treatment'
 *     responses:
 *       201:
 *         description: Cow treatment activity recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /api/v1/Activity/recordTreatment:
 *   post:
 *     summary: Record cow treatment activity
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treatment'
 *     responses:
 *       201:
 *         description: Cow treatment activity recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treatment'
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 * /api/v1/Activity/recordCastration:
 *   post:
 *     summary: Record cow castration activity
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Castration'
 *     responses:
 *       201:
 *         description: Cow castration activity recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Castration'
 *       500:
 *         description: Internal Server Error
 */



/**
 * @swagger
 * /api/v1/Activity/recordDeadActivity:
 *   post:
 *     summary: Record cow Dead Cow activity
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeadActivity'
 *     responses:
 *       201:
 *         description: Cow castration activity recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeadActivity'
 *       500:
 *         description: Internal Server Error
 */





/**
 * @swagger
 * /api/v1/Activity/recordWeaning:
 *   post:
 *     summary: Record cow weaning activity
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Weaning'
 *     responses:
 *       201:
 *         description: Cow weaning activity recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weaning'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/Activity/recordBreeding:
 *   post:
 *     summary: Record cow breeding activity
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Breeding'
 *     responses:
 *       201:
 *         description: Cow breeding activity recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Breeding'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/Activity/recordPromoted:
 *   post:
 *     summary: Record cow Promoted to bull activity
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Promoted'
 *     responses:
 *       201:
 *         description: Cow breeding Promoted to bull successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promoted'
 *       500:
 *         description: Internal Server Error
 */



/**
 * @swagger
 * /api/v1/Activity/recordPurginacy:
 *   post:
 *     summary: Record cow Purginacy activity
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Purginacy'
 *     responses:
 *       201:
 *         description: Cow Purginacy activity recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purginacy'
 *       500:
 *         description: Internal Server Error
 */






/**
 * @swagger
 * /api/v1/Activity/recordNewBirth:
 *   post:
 *     summary: Record cow breeding activity
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBirth'
 *     responses:
 *       201:
 *         description: Cow NewBirth activity recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewBirth'
 *       500:
 *         description: Internal Server Error
 */




/**
 * @swagger
 * /api/v1/Activity/recordSales:
 *   post:
 *     summary: Record cow sales activity
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sales'
 *     responses:
 *       201:
 *         description: Cow sales activity recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sales'
 *       500:
 *         description: Internal Server Error
 */




/**
 * @swagger
 * /api/v1/Activity/getAllActivity:
 *   get:
 *     summary: Returns the list of all cow activities
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The list of all cow activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       204:
 *         description: No cow activities found in the database
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */



/**
 * @swagger
 * /api/v1/Activity/getActivityBytype/{activityType}:
 *   get:
 *     summary: Get cow activities by type
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: activityType
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity type
 *     responses:
 *       200:
 *         description: The list of cows by type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
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
 * /api/v1/Activity/deleteActivity/{id}:
 *   delete:
 *     summary: Delete Activity by ID
 *     tags: [Activity]
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
 *               $ref: '#/components/schemas/Activity'
 *       204:
 *         description: No cow found in the database
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: activity not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/Activity/updateActivity/{id}:
 *   put:
 *     summary: Update cow by ID
 *     tags: [Activity]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The cow ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: Cow updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       204:
 *         description: No cow found in the database
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Cow not found
 *       500:
 *         description: Internal Server Error
 */







activityRouter.post("/recordActivity", recordActivity);
activityRouter.get("/getAllActivity", getAllActivity);
activityRouter.get("/getActivityBytype/:activityType", getActivityBytype);
activityRouter.delete("/deleteActivity/:id", deleteActivity);
activityRouter.put("/updateActivity/:id", updateActivity);
activityRouter.get("/getActivityById:id", getActivityById);
activityRouter.post("/recordTreatment", recordTreatment);
activityRouter.post("/recordCastration", recordCastration);
activityRouter.post("/recordWeaning", recordWeaning);
activityRouter.post("/recordBreeding", recordBreeding);
activityRouter.post("/recordSales", recordSales);
activityRouter.post("/recordNewBirth", recordNewbirth);
activityRouter.post("/recordDeadActivity", recordDead);
activityRouter.post("/recordPurginacy", recordPurginacy);
activityRouter.post("/recordPromoted", recordPromoted);


export default activityRouter;