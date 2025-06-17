import { AppError } from "./AppError";

export const BadRequest = (msg: string) => new AppError(msg, 400);
export const NotFound = (msg: string) => new AppError(msg, 404);
export const Unauthorized = (msg: string) => new AppError(msg, 401);
export const Forbidden = (msg: string) => new AppError(msg, 403);
export const InternalServerError = (msg: string) => new AppError(msg, 500);
export const Conflict = (msg: string) => new AppError(msg, 409);
export const UnprocessableEntity = (msg: string) => new AppError(msg, 422);
export const ServiceUnavailable = (msg: string) => new AppError(msg, 503);
export const GatewayTimeout = (msg: string) => new AppError(msg, 504);
export const TooManyRequests = (msg: string) => new AppError(msg, 429);