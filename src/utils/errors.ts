export class BadRequest extends Error {
  constructor(
    message: string,
    public statusCode = 400,
    public data: any = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = "BadRequest";
  }
}

export class Unauthorized extends Error {
  constructor(
    message: string,
    public statusCode = 401,
    public data: any = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = "Unauthorized";
  }
}

export class Forbidden extends Error {
  constructor(
    message: string,
    public statusCode = 403,
    public data: any = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = "Forbidden";
  }
}

export class NotFound extends Error {
  constructor(
    message: string,
    public statusCode = 404,
    public data: any = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = "NotFound";
  }
}

export class InternalServerError extends Error {
  constructor(
    message: string,
    public statusCode = 500,
    public data: any = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = "InternalServerError";
  }
}
