import express from 'express';
import {
  users_get_all,
  users_post_register,
  users_post_login,
} from './userController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto-generated id of the user
 *        name:
 *          type: string
 *          description: The name of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *      example:
 *        _id: 437ff7a5-a318-42bb-ab92-1142a9e7f518
 *        name: John Doe
 *        email: johndoe@gmail.com
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Create, get and login users from these routes. Login and register routes require no authentication
 */

router.get('/', users_get_all);
/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    summary: Return list of all users
 *    description: Fetch all users
 *    tags: [Users]
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
 *                $ref: '#/components/schemas/User'
 *      500:
 *        description: Something went wrong
 */

router.post('/register', users_post_register);
/**
 * @swagger
 * /api/v1/users/register:
 *  post:
 *    summary: Add new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: collo@mail.com
 *              name:
 *                type: string
 *                example: Collins Aman
 *              password1:
 *                type: string
 *                example: 1234
 *              password2:
 *                type: string
 *                example: 1234
 *              phoneNumber:
 *                type: string
 *                example: 0700123123
 *    responses:
 *      201:
 *        description: User successfully added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request. Passwords do not match
 *      409:
 *        description: Conflict. Email already exist
 *      500:
 *        description: Something went wrong
 *
 */

router.post('/login', users_post_login);
/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    summary: Login user.
 *    description: Email and password have to match those in database to login.
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: collo@mail.com
 *              password:
 *                type: string
 *                example: 1234
 *    responses:
 *      200:
 *        description: Success. Authentication successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request. Authentication failed
 *      500:
 *        description: Something went wrong
 */

export default router;
