import dotenv from 'dotenv';

dotenv.config();
export const assignUsers = {
  '/api/v1/users/manager/assign': {
    put: {
      tags: [
        'assign users to managers',
      ],
      summary: 'assign users to managers',
      parameters: [
        {
          lineManagerId: 4,
          userId: 2,
          in: 'body',
          required: true,
          description: 'The id of the manager and the id of the user you want to give a manager',
          schema: {
            example: {
              lineManagerId: 4,
              userId: 2,
            },
          },
        },
      ],
      consumes: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'The user is assigned to manager',
        },
        400: {
          description: 'The manager doesnot exists',
        },
        500: {
          description: 'jwt expired',
        },
      },
    },
  },

  '/api/v1/users/manager/4': {
    get: {
      tags: [
        'Get users with their managers',
      ],
      summary: 'Get users assigned to manager',
      description: 'Get users assigned to manager',
      produces: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'users assigned to manager displayed successfully',
        },
        400: {
          description: 'The manager doesnot have users',
        },
        500: {
          description: 'jwt expired',
        },
      },
    },
  },

};
