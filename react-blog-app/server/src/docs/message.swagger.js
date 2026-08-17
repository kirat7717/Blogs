/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Messaging APIs
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a message
 *     description: Sends a message for the authenticated user.
 *     tags:
 *       - Message
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
 *             description: Message data required by the API.
 *
 *     responses:
 *       201:
 *         description: Message sent successfully.
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


/**
 * @swagger
 * /messages/{conversationId}:
 *   get:
 *     summary: Get conversation messages
 *     description: Returns messages belonging to a conversation.
 *     tags:
 *       - Message
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         example: "66a2ebcc222d982b3e453247"
 *
 *     responses:
 *       200:
 *         description: Messages fetched successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       404:
 *         description: Conversation not found.
 *
 *       500:
 *         description: Internal server error.
 */