import dotenv from 'dotenv';

dotenv.config();
export const resetPassword = {
  '/api/v1/users/forgot-password': {
    post: {
      tags: [
        'Reseting Password',
      ],
      summary: 'Reseting password',
      parameters: [
        {
          name: 'email',
          in: 'body',
          required: true,
          description: 'email used in registration',
          schema: {
            example: {
              email: 'name@domain.com',
            },
          },
        },
      ],
      consumes: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'Email for reseting password was sent to the provided email',
        },
        400: {
          description: 'missing any required parameter',
        },
        404: {
          description: 'email not available',
        },
        500: {
          description: 'server error',
        },
      },
    },
  },
  '/api/v1/users/reset-password/{token}': {
    put: {
      tags: [
        'Reseting Password',
      ],
      summary: 'reseting the password',
      parameters: [
        {
          name: 'token',
          in: 'path',
          required: true,
          description: 'token that was sent to your email adress in password reset link',
        }, {
          name: 'new password',
          in: 'body',
          required: true,
          description: 'new password you want to keep',
          schema: {
            example: {
              password: 'NewPassword',
              confirmPassword: 'NewPassword',
            },
          },
        },
      ],
      consumes: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'password reset successfully',
        },
        400: {
          description: 'sending bad request',
        },
        500: {
          description: 'server error',
        },
      },
    },
  },
};
