import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API BT1_CK",
      version: "1.0.0",
      description: "API quản lý"
    },
    servers: [
      {
        url: 'https://bt1-ck.onrender.com', 
        description: 'Production Server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local Development',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./routes/*.js"] 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;