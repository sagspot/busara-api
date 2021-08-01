import express from 'express';
import checkAuth from '../../middlewares/auth.js';
import { getPages, postPage } from './pageController.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Page:
 *      type: object
 *      $ref: '../form/forms#/components/schemas/Mainform'
 *      example:
 *        _id: 437ff7a5-a318-42bb-ab92-1142a9e7f518
 *        createdAt: 2021-07-30T14:19:25.469Z
 *        updatedAt: 2021-07-30T14:19:25.469Z
 *        sort_order: 3
 *        path: "00020001"
 *        depth: 2
 *        numchild: 1
 *        name: Bio Data
 *        description: Bio Data
 */

/**
 * @swagger
 * tags:
 *  name: Pages
 *  description: Get & create pages from these routes.
 */

router.get('/', checkAuth, getPages);
/**
 * @swagger
 * /api/v1/pages:
 *  get:
 *    summary: Fetch all pages
 *    description: Return list of all pages and the form where they exist
 *    tags: [Pages]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Page'
 *      500:
 *        description: Something went wrong
 */

router.post('/', checkAuth, postPage);
/**
 * @swagger
 * /api/v1/pages:
 *  post:
 *    summary: Create new page
 *    description: Create new page
 *    tags: [Pages]
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
 *                  example: 5
 *                path:
 *                  type: string
 *                  example: "00020002"
 *                depth:
 *                  type: number
 *                  example: 2
 *                numchild:
 *                  type: number
 *                  example: 1
 *                name:
 *                  type: string
 *                  example: Education
 *                description:
 *                  type: string
 *                  example: <font face=\"Arial\" size=\"3\">Education</font>
 *                validTo:
 *                  type: string
 *                  example: 2030-01-01
 *                form:
 *                  type: string
 *                  example: 61040a6dec6d054128fa8eae
 *    responses:
 *      201:
 *        description: Success. Page created
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Form'
 *      400:
 *        description: Bad request. Invalid form ID
 *      404:
 *        description: Form not found
 *      500:
 *        description: Something went wrong
 */

export default router;
