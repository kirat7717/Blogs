/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Blog:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66a2ebcc222d982b3e453247"
 *
 *         authorId:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "66a2ebcc222d982b3e453247"
 *             username:
 *               type: string
 *               example: "kirat"
 *             email:
 *               type: string
 *               example: "kirat@example.com"
 *
 *         title:
 *           type: string
 *           example: "Getting Started with Node.js"
 *
 *         description:
 *           type: string
 *           example: "Learn the fundamentals of Node.js and how to build your first backend application."
 *
 *         imageUrl:
 *           type: string
 *           format: uri
 *           example: "http://localhost:3000/public/blog-123.jpg"
 *
 *         status:
 *           type: string
 *           example: "active"
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Get all blogs
 *     description: Returns all available blogs.
 *     tags:
 *       - Blog
 *
 *     responses:
 *       200:
 *         description: Blogs fetched successfully.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     summary: Get a single blog
 *     description: Returns a single blog using its ID.
 *     tags:
 *       - Blog
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "66a2ebcc222d982b3e453247"
 *
 *     responses:
 *       200:
 *         description: Blog fetched successfully.
 *
 *       404:
 *         description: Blog not found.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /my-blog:
 *   get:
 *     summary: Get my blogs
 *     description: Returns blogs created by the authenticated user.
 *     tags:
 *       - Blog
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: User blogs fetched successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a blog
 *     description: Creates a new blog for the authenticated user.
 *     tags:
 *       - Blog
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
 *             required:
 *               - title
 *               - description
 *               - imageUrl
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Getting Started with Node.js"
 *               description:
 *                 type: string
 *                 example: "Learn the fundamentals of Node.js."
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 example: "http://localhost:3000/public/blog-123.jpg"
 *
 *     responses:
 *       201:
 *         description: Blog created successfully.
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
 * /blog/{id}:
 *   patch:
 *     summary: Update a blog
 *     description: Updates a blog owned by the authenticated user.
 *     tags:
 *       - Blog
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Blog Title"
 *               description:
 *                 type: string
 *                 example: "Updated blog description."
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 example: "http://localhost:3000/public/blog-new.jpg"
 *
 *     responses:
 *       200:
 *         description: Blog updated successfully.
 *
 *       400:
 *         description: Validation error.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       404:
 *         description: Blog not found.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Delete a blog
 *     description: Deletes a blog owned by the authenticated user.
 *     tags:
 *       - Blog
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Blog deleted successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       404:
 *         description: Blog not found.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /upload-image:
 *   post:
 *     summary: Upload an image
 *     description: Uploads an image and returns its URL.
 *     tags:
 *       - Blog
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 *
 *       400:
 *         description: Image is required.
 *
 *       500:
 *         description: Internal server error.
 */