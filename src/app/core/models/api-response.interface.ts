export enum StatusCodes {
  OK = 200,
  Created = 201,
  Deleted = 204,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}
export interface ApiResponse {
  data?: any;
  error?: boolean;
  message?: string;
  statusCode: StatusCodes;
}
