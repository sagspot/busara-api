import express from 'express';
import checkAuth from '../../middlewares/auth.js';

import { getquestions, postQuestion } from './questionController.js';
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Question:
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
 *  name: Questions
 *  description: Get & create questions from these routes.
 */

router.get('/', checkAuth, getquestions);
/**
 * @swagger
 * /api/v1/questions:
 *  get:
 *    summary: Fetch all questions
 *    description: Return list of all questions and the section they belong to
 *    tags: [Questions]
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
 *                $ref: '#/components/schemas/Question'
 *      500:
 *        description: Something went wrong
 */

router.post('/', checkAuth, postQuestion);
/**
 * @swagger
 * /api/v1/questions:
 *  post:
 *    summary: Create new question
 *    description: Create new question
 *    tags: [Questions]
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
 *                type:
 *                  type: string
 *                  example: text
 *                text:
 *                  type: string
 *                  example: First Name
 *                description:
 *                  type: string
 *                  example: First Name
 *                columnMatch:
 *                  type: string
 *                  example: first_name
 *                errorMessage:
 *                  type: string
 *                  example: Enter first name
 *                widget:
 *                  type: string
 *                  example: text
 *                section:
 *                  type: string
 *                  example: 610513430bbb582b94a1a01f
 *    responses:
 *      201:
 *        description: Success. Question created
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Question'
 *      400:
 *        description: Bad request. Invalid section ID
 *      404:
 *        description: Section not found
 *      500:
 *        description: Something went wrong
 */

export default router;
