export const welcome = {
  '/': {
    get: {
      tags: [
        'welcome',
      ],
      summary: 'Welcome to Barefoot Nomad global travel and accommodation easy',
      description: 'Welcome page for barefoot nomad',
      produces: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'successful operation',
        },
        400: {
          description: 'Invalid status value',
        },
      },
    },
  },
};
