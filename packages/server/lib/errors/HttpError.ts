export class HttpError extends Error {
  public statusCode: number;
  public message: string;
  public stack?: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.stack = new Error().stack;
  }
}
