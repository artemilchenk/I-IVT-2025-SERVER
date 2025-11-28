import { BadRequestErrSchema, UnAuthorisedErrSchema } from '../types/sheared';

export const unAuthorisedErrSchema: UnAuthorisedErrSchema = {
  example: { message: 'Unauthorized', statusCode: 401 },
};

export const badRequestErrSchema: BadRequestErrSchema = {
  example: {
    message: ['current error text'],
    error: 'Bad Request',
    statusCode: 400,
  },
};
