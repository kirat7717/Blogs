import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.3",

  info: {
    title: "Blog Application API",
    version: "1.0.0",
    description: "API documentation for the MERN Blog Application",
  },

  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    schemas: {
      UpdateProfileRequest: {
        type: "object",
        properties: {
          username: {
            type: "string",
            minLength: 3,
            maxLength: 30,
            example: "Kirat",
          },
          profileImage: {
            type: "string",
            format: "uri",
            example: "http://localhost:3000/public/profile-123.jpg",
          },
        },
        minProperties: 1,
      },

      UserProfile: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "66a2ebcc222d982b3e453247",
          },
          username: {
            type: "string",
            example: "kirat",
          },
          email: {
            type: "string",
            format: "email",
            example: "kirat@example.com",
          },
          profileImage: {
            type: "string",
            nullable: true,
            example: "http://localhost:3000/public/profile-123.jpg",
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,

  apis: [
    "./src/docs/*.swagger.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;