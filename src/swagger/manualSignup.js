import dotenv from 'dotenv';

dotenv.config();
export const manualSignup = {
  '/api/v1/users/signup': {
    post: {
      tags: [
        'User Registration',
      ],
      summary: 'Creating account using email and password',
      parameters: [
        {
          name: 'User information',
          in: 'body',
          required: true,
          description: 'required information to create new user account',
          schema: {
            example: {
              firstName: 'yourname',
              lastName: 'yourname',
              email: 'name@domain.com',
              password: 'password',
              confirmPassword: 'password',
            },
          },
        },
      ],
      consumes: [
        'application/json',
      ],
      responses: {
        201: {
          description: 'Registarion succedded and waiting for  email confirmation',
        },
        400: {
          description: 'missing any required parameter',
        },
        409: {
          description: 'Email aleady exist',
        },
        500: {
          description: 'server error',
        },
      },
    },
  },
  '/api/v1/users/verify/{token}': {
    get: {
      tags: [
        'User Registration',
      ],
      summary: 'confirming the email addres',
      parameters: [
        {
          name: 'token',
          in: 'path',
          required: true,
          description: 'token that was sent to your email adress',
        },
      ],
      consumes: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'email confirmed succesfully',
        },
        400: {
          description: 'sending bad request',
        },
        422: {
          description: 'Trying to verify an email that was verified before',
        },
        500: {
          description: 'server error',
        },
      },
    },
  },
};
