export type ErrorMessages = {
  [status: number]: string;
};

export const errorMessages: ErrorMessages = {
  400: "Invalid username or password",
  401: "Invalid credentials",
  403: "Access denied",
  404: "Not found",
  500: "Temporary server issue, please try again later",
};
