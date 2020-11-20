import dotenv from 'dotenv';

dotenv.config();
export const bookAccomodation = {
    '/api/v1/users/accomodations/book': {
        post: {
            tags: [
                'Booking an accomodation',
            ],
            summary: 'Booking an accomodation',
            parameters: [
                {
                    accomodation_id: 'email',
                    checkIn: "2020-11-20",
                    checkOut: "2020-11-25",
                    in: 'body',
                    required: true,
                    description: 'booking an accomodation details',
                    schema: {
                        example: {
                            accomodation_id: 'email',
                            checkIn: "2020-11-20",
                            checkOut: "2020-11-25"
                        },
                    },
                },
            ],
            consumes: [
                'application/json',
            ],
            responses: {
                200: {
                    description: 'You have successfully booked an accomodation',
                },
                400: {
                    description: 'The accomodation is fully occupied',
                },
                500: {
                    description: 'server error',
                },
            },
        },
    },


    '/api/v1/accomodations/book/check': {
        get: {
            tags: [
                'Check if the accomodation is available',
            ],
            summary: 'Check if the accomodation is available',
            parameters: [
                {
                    accomodation_id: '1',
                    in: 'body',
                    required: true,
                    description: 'check the accomodation availability',
                    schema: {
                        example: {
                            accomodation_id: '1'
                        },
                    },
                },
            ],
            produces: [
                'application/json',
            ],
            responses: {
                200: {
                    description: 'This is the available rooms',
                },
                500: {
                    description: 'server error',
                },
            },
        },
    },



    '/api/v1/accomodations/book/find': {
        get: {
            tags: [
                'Find booked accomodation by user',
            ],
            summary: 'Find booked accomodation by user',

            produces: [
                'application/json',
            ],
            responses: {
                200: {
                    description: 'This is the accomodations you have booked',
                },
                500: {
                    description: 'server error',
                },
            },
        },
    },


};
