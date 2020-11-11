export const logout = {
  '/api/v1/users/logout': {
    post: {
      tags: [
        'Logout',
      ],
      summary: 'Logging user out',
      produces: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'Logout successful',
        },
        401: {
          description: 'Token not found',
        },
        500: {
          description: 'Internal server error try again',
        },
      },
    },
  },
};
