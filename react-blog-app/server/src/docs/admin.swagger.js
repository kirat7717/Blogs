/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrator APIs
 */


/**
 * @swagger
 * /admin/getUsers:
 *   get:
 *     summary: Get all users
 *     description: Returns all users. Admin authentication required.
 *     tags:
 *       - Admin
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Users fetched successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       403:
 *         description: Admin access required.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/getUsers/{id}:
 *   get:
 *     summary: Get a single user
 *     description: Returns a specific user by ID.
 *     tags:
 *       - Admin
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
 *         description: User fetched successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       403:
 *         description: Admin access required.
 *
 *       404:
 *         description: User not found.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/blog:
 *   get:
 *     summary: Get blogs as admin
 *     description: Returns blogs for administrator management.
 *     tags:
 *       - Admin
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Blogs fetched successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       403:
 *         description: Admin access required.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/blog/{id}:
 *   get:
 *     summary: Get a single blog as admin
 *     description: Returns a specific blog for administrator management.
 *     tags:
 *       - Admin
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
 *         description: Blog fetched successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       403:
 *         description: Admin access required.
 *
 *       404:
 *         description: Blog not found.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/export-blogs:
 *   get:
 *     summary: Export blogs
 *     description: Exports blog data for administrators.
 *     tags:
 *       - Admin
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Blog export generated successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       403:
 *         description: Admin access required.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/csv-uploads:
 *   get:
 *     summary: Get CSV uploads
 *     description: Returns CSV uploads for administrators.
 *     tags:
 *       - Admin
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: CSV uploads fetched successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       403:
 *         description: Admin access required.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register admin
 *     tags:
 *       - Admin
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *     responses:
 *       201:
 *         description: Admin registered successfully.
 *
 *       400:
 *         description: Validation error.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags:
 *       - Admin
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *     responses:
 *       200:
 *         description: Admin logged in successfully.
 *
 *       400:
 *         description: Validation error.
 *
 *       401:
 *         description: Invalid credentials.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/import-blogs:
 *   post:
 *     summary: Import blogs from CSV
 *     description: Uploads a CSV file for blog import.
 *     tags:
 *       - Admin
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - csvFile
 *             properties:
 *               csvFile:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       200:
 *         description: CSV imported successfully.
 *
 *       400:
 *         description: Invalid CSV file.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       403:
 *         description: Admin access required.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/update-status/{id}:
 *   patch:
 *     summary: Update user or blog status
 *     description: Updates the status of an entity identified by ID.
 *     tags:
 *       - Admin
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
 *         description: Status updated successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       403:
 *         description: Admin access required.
 *
 *       404:
 *         description: Resource not found.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/csv-uploads/{uploadId}/approve:
 *   patch:
 *     summary: Approve CSV upload
 *     tags:
 *       - Admin
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: uploadId
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: CSV upload approved successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       403:
 *         description: Admin access required.
 *
 *       404:
 *         description: Upload not found.
 *
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /admin/csv-uploads/{uploadId}/reject:
 *   patch:
 *     summary: Reject CSV upload
 *     tags:
 *       - Admin
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: uploadId
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: CSV upload rejected successfully.
 *
 *       401:
 *         description: Authentication token is missing or invalid.
 *
 *       403:
 *         description: Admin access required.
 *
 *       404:
 *         description: Upload not found.
 *
 *       500:
 *         description: Internal server error.
 */