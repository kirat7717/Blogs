/**
 * @swagger
 * tags:
 *   name: Conversation
 *   description: Conversation APIs
 */

/**
 * @swagger
 * /conversations:
 *   post:
 *     summary: Create a conversation
 *     description: Creates a new conversation for the authenticated user.
 *     tags:
 *       - Conversation
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Conversation data required by the API.
 *
 *     responses:
 *       201:
 *         description: Conversation created successfully.
 *
 *       400:
 *         description: Validation error.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       500:
 *         description: Internal server error.
 */