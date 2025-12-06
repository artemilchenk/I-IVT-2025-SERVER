import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { badRequestErrSchema, unAuthorisedErrSchema } from '../schema';

export function ApiBadRequestAndUnauthorized() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: badRequestErrSchema,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      schema: unAuthorisedErrSchema,
    }),
  );
}
