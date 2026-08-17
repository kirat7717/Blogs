/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment APIs
 */

/**
 * @swagger
 * /api/v1/payment/create-payment-intent:
 *   post:
 *     summary: Create a PaymentIntent for a paid blog
 *     description: Creates a Stripe PaymentIntent using the price stored in the selected blog. The user must be authenticated.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - blogId
 *             properties:
 *               blogId:
 *                 type: string
 *                 description: MongoDB ID of the blog the user wants to purchase
 *                 example: 6a62ebcc222d982b3e453247
 *
 *     responses:
 *       200:
 *         description: PaymentIntent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Payment initiated successfully.
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     clientSecret:
 *                       type: string
 *                       description: Client secret of the Stripe PaymentIntent
 *                       example: pi_3ABC123_secret_xyz
 *
 *                     paymentIntentId:
 *                       type: string
 *                       description: Stripe PaymentIntent ID
 *                       example: pi_3ABC123
 *
 *                     status:
 *                       type: string
 *                       description: Current payment status
 *                       example: requires_payment_method
 *
 *                     amount:
 *                       type: number
 *                       description: Blog price in rupees
 *                       example: 500
 *
 *       400:
 *         description: Invalid request, blog is free, or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Blog ID is required.
 *
 *       401:
 *         description: Unauthorized - token is missing or invalid
 *
 *       404:
 *         description: Blog not found
 *
 *       500:
 *         description: Something went wrong while creating payment
 */