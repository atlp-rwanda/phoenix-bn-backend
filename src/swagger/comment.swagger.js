export const commentOnRequest = {
  '/api/v1/request/comment': {
    post: {
      security: {
        Bearer: [],
      },
      tags: [
        'Comments',
      ],
      summary: 'Creating comment on  request',
      parameters: [
        {
          name: 'authorization',
          in: 'header',
          type: 'string',
          required: true,
          description: 'AUthorization Token',
        },
        {
          name: 'Comment Information',
          in: 'body',
          required: true,
          description: 'All information neded for a comment on specific request',
          schema: {
            example: {
              user_id: 1,
              request_id: 1,
              comment: 'This is the description comment',
            },
          },
        },
      ],
      consumes: [
        'application/json',
      ],
      responses: {
        201: {
          description: 'comment sent succeded',
        },
        400: {
          description: 'making bad request',
        },
        401: {
          description: 'Request of un authenticated user',
        },
        403: {
          description: 'User don\'t have permission to access this feature',
        },
        500: {
          description: 'server error',
        },
      },
    },
  },
  '/api/v1/request/comments': {
    get: {
      security: {
        Bearer: [],
      },
      parameters: [
        {
          name: 'authorization',
          in: 'header',
          type: 'string',
          required: true,
          description: 'AUthorization Token',
        },
      ],
      tags: [
        'Comments',
      ],
      summary: 'viewing comment made on specific request',
      consumes: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'request comments  fetched',
        },
        400: {
          description: 'bad request',
        },
        401: {
          description: 'Request of un authenticated user',
        },
        403: {
          description: 'User don\'t have permission to access this feature',
        },
        500: {
          description: 'server error',
        },
      },
    },
  },
};
