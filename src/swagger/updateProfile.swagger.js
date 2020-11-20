import dotenv from 'dotenv';

dotenv.config();
export const updateProfile = {
    'api/v1/users/updateProfile/id': {
        put: {
            tags: [
                'Updating users profile',
            ],
            summary: 'Updating users profile',
            parameters: [
                {

                    firstName: "Faustinkdjkfd",
                    lastName: "Ukundimandnmxa",
                    email: "fukundimandm,mca@gmail.com",
                    preferedLanguage: "English",
                    officeAddress: "Remera, Giporoso",
                    in: 'body',
                    required: true,
                    description: 'user profile details',
                    schema: {
                        example: {
                            firstName: "Faustinkdjkfd",
                            lastName: "Ukundimandnmxa",
                            email: "fukundimandm,mca@gmail.com",
                            preferedLanguage: "English",
                            officeAddress: "Remera, Giporoso",
                        },
                    },
                },
            ],
            consumes: [
                'application/json',
            ],
            responses: {
                200: {
                    description: 'user profile update successfully',
                },
                400: {
                    description: 'user doesnot exists',
                },
                500: {
                    description: 'server error',
                },
            },
        },
    },

    '/api/v1/users/profile/id': {
        get: {
            tags: [
                'Displa user profile',
            ],
            summary: 'Displa user profile details',
            description: 'Displa user profile details',
            produces: [
                'application/json',
            ],
            responses: {
                200: {
                    description: 'user profile details displayed successfully',
                },
                500: {
                    description: 'server error',
                },
            },
        },
    },

};
