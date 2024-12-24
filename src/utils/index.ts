import type { ZodError } from "zod";

export {
  BadRequest,
  NotFound,
  Unauthorized,
  Forbidden,
  InternalServerError,
} from "./errors";

export { asyncWrapper } from "./async-wrapper";

export const formattedZodErrorMessage = (error: ZodError) => {
  const message: string = error.errors.at(0)?.message || error.message;

  return message;
};
