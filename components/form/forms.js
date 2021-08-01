import express from 'express';
import checkAuth from '../../middlewares/auth.js';
import { getForms, getForm, postForm } from './formController.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Mainform:
 *      type: object
 *      required:
 *        - sort_order
 *        - path
 *        - depth
 *        - numchild
 *        - name
 *        - description
 *        - valid_to
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated form id
 *        createdAt:
 *          type: string
 *          description: The auto-generated date of form creation
 *        updatedAt:
 *          type: string
 *          description: The auto-generated date of form modification
 *        sort_order:
 *          type: string
 *        path:
 *          type: string
 *        depth:
 *          type: string
 *        numchild:
 *          type: string
 *        name:
 *          type: string
 *          description: The name of the form
 *        description:
 *          type: string
 *          description: The description of the form
 *        creator:
 *          $ref: '../user/users#/components/schemas/User'
 *    Form:
 *      type: object
 *      ref: '#/components/schemas/Mainform'
 *      example:
 *        _id: 437ff7a5-a318-42bb-ab92-1142a9e7f518
 *        createdAt: 2021-07-30T14:19:25.469Z
 *        updatedAt: 2021-07-30T14:19:25.469Z
 *        sort_order: 1
 *        path: "0002"
 *        depth: 1
 *        numchild: 2
 *        name: Interview Form
 *        description: Interview Form
 */

/**
 * @swagger
 * tags:
 *  name: Form
 *  description: Get & create forms from this route.
 */

router.get('/', checkAuth, getForms);
/**
 * @swagger
 * /api/v1/forms:
 *  get:
 *    summary: Fetch all forms
 *    description: Return list of all forms
 *    tags: [Form]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Form'
 *      500:
 *        description: Something went wrong
 */

router.get('/:formId', checkAuth, getForm);
/**
 * @swagger
 * /api/v1/forms{formId}:
 *  get:
 *    summary: Fetch all forms
 *    description: Return list of all forms
 *    tags: [Form]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: formId
 *        schema:
 *          type: string
 *          required: true
 *          description: Form id
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Form'
 *      500:
 *        description: Something went wrong
 */

router.post('/', checkAuth, postForm);
/**
 * @swagger
 * /api/v1/forms:
 *  post:
 *    summary: Create new form
 *    description: Create new form
 *    tags: [Form]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              type: object
 *              properties:
 *                sortOrder:
 *                  type: number
 *                  example: 1
 *                path:
 *                  type: string
 *                  example: "0002"
 *                depth:
 *                  type: number
 *                  example: 1
 *                numchild:
 *                  type: number
 *                  example: 2
 *                name:
 *                  type: string
 *                  example: Interview Form
 *                description:
 *                  type: string
 *                  example: Interview Form
 *                validTo:
 *                  type: string
 *                  example: 2021-10-21
 *    responses:
 *      201:
 *        description: Form created
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Form'
 *      409:
 *        description: Conflict. Form exist
 *      500:
 *        description: Something went wrong
 */

export default router;
