import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MLX API Documentation',
      version: '1.0.0',
      description: 'API documentation for MLX Healthcare Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Patient: {
          type: 'object',
          properties: {
            Guid: { type: 'string', format: 'uuid' },
            FirstName: { type: 'string' },
            MiddleName: { type: 'string', nullable: true },
            LastName: { type: 'string' },
            Gender: { type: 'string' },
            Dob: { type: 'string', format: 'date-time' },
            MobileNumber: { type: 'string' },
            AlternativeMobileNumber: { type: 'string', nullable: true },
            Email: { type: 'string', format: 'email' },
            AddressLine1: { type: 'string' },
            AddressLine2: { type: 'string', nullable: true },
            City: { type: 'string' },
            State: { type: 'string' },
            Zipcode: { type: 'string' },
            Country: { type: 'string' },
            Race: { type: 'string', nullable: true },
            Ethnicity: { type: 'string', nullable: true },
            IsHomeboundPatient: { type: 'boolean' },
            IsHardStick: { type: 'boolean' },
            PatientNotes: { type: 'string', nullable: true },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
