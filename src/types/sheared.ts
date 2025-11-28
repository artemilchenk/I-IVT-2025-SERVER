export interface UnAuthorisedErrSchema {
  example: {
    message: string;
    statusCode: 401;
  };
}

export interface BadRequestErrSchema {
  example: {
    message: string[];
    error: string;
    statusCode: 400;
  };
}
