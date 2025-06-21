import express from 'express';
import {
    getContacts,
    getContactById,
    deleteContact,
    updateContactById,
    createContact,
} from '../Controllers/contact';

const contactRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API for managing contacts
 */

/**
 * @swagger
 * /api/v1/contact/createContact:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: body
 *         name: contact
 *         description: The contact to create
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *             message:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /api/v1/contact/getContacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */

/**
 * @swagger
 * /api/v1/contact/deleteContact/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to delete
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */

/**
 * @swagger
 * /api/v1/contact/getContactById/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to retrieve
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */

/**
 * @swagger
 * /api/v1/contact/updateContactById/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to update
 *         type: string
 *       - in: body
 *         name: contact
 *         description: The contact data to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *             message:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
contactRouter.put('/updateContactById/:id', updateContactById);
contactRouter.get('/getContactById/:id', getContactById);
contactRouter.delete('/deleteContact/:id', deleteContact);
contactRouter.get('/getContacts', getContacts);
contactRouter.post('/createContact', createContact);


export default contactRouter;
