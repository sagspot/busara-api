import express from 'express';
import checkAuth from '../../middlewares/auth.js';
import { getSections, postSection } from './sectionController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Section:
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
 *  name: Sections
 *  description: Get & create sections from these routes.
 */

router.get('/', checkAuth, getSections);
/**
 * @swagger
 * /api/v1/sections:
 *  get:
 *    summary: Fetch all sections
 *    description: Return list of all sections and the pages they belong to
 *    tags: [Sections]
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
 *                $ref: '#/components/schemas/Section'
 *      500:
 *        description: Something went wrong
 */

router.post('/', checkAuth, postSection);
/**
 * @swagger
 * /api/v1/sections:
 *  post:
 *    summary: Create new section
 *    description: Create new section
 *    tags: [Sections]
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
 *                  example: 6
 *                path:
 *                  type: string
 *                  example: "000200020001"
 *                depth:
 *                  type: number
 *                  example: 3
 *                numchild:
 *                  type: number
 *                  example: 0
 *                name:
 *                  type: string
 *                  example: Education
 *                description:
 *                  type: string
 *                  example: Education
 *                validTo:
 *                  type: string
 *                  example: 2030-01-01
 *                page:
 *                  type: string
 *                  example: 61051ee5d0a9ae37a4405eee
 *    responses:
 *      201:
 *        description: Success. Section created
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Section'
 *      400:
 *        description: Bad request. Invalid page ID
 *      404:
 *        description: Page not found
 *      500:
 *        description: Something went wrong
 */

export default router;
