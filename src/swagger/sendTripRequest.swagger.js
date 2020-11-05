export const sendTripRequest = {
  '/api/v1/trips/request': {
    post: {
      security: {
        Bearer: [],
      },
      tags: [
        'Trips',
      ],
      summary: 'Creating Trip request',
      parameters: [
        {
          name: 'authorization',
          in: 'header',
          type: 'string',
          required: true,
          description: 'AUthorization Token',
        },
        {
          name: 'TripData',
          in: 'body',
          required: true,
          description: 'All information neded for a certain trip',
          schema: {
            example: {
              travelDate: '2020-11-03',
              returnDate: '2020-11-03',
              destination: ['Kigali'],
              origin: 'Kamembe',
              accomodation: 1,
              reason: 'work',
            },
          },
        },
      ],
      consumes: [
        'application/json',
      ],
      responses: {
        201: {
          description: 'Trip request creation succeded',
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
  '/api/v1/trips/mine': {
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
        'Trips',
      ],
      summary: 'viewing your own trip requests',
      consumes: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'Trips request fetched',
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
  '/api/v1/trips/report': {
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
        'Trips',
      ],
      summary: 'viewing direct trip requests of your assigned users',
      consumes: [
        'application/json',
      ],
      responses: {
        200: {
          description: 'Trips request fetched',
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
