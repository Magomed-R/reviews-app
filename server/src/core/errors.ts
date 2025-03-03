type ErrorCreateParams = {
  readonly message?: string
  readonly data?: object
  readonly code: string
  readonly httpStatus?: number
}

export class BaseError extends Error {
  readonly message: string
  readonly data?: object
  readonly code: string
  readonly httpStatus?: number
  constructor({ code, data, httpStatus, message = '' }: ErrorCreateParams) {
    super(message)
    this.message = message
    this.data = data
    this.code = code
    this.httpStatus = httpStatus
  }
}

export class NotFoundError extends BaseError {
  constructor(data: ErrorCreateParams) {
    super({ ...data, httpStatus: data?.httpStatus ?? 404 })
  }
}

export class ForbiddenError extends BaseError {
  constructor(data: ErrorCreateParams) {
    super({ ...data, httpStatus: data?.httpStatus ?? 403 })
  }
}

export class UnauthorizedError extends BaseError {
  constructor(data: ErrorCreateParams) {
    super({ ...data, httpStatus: data?.httpStatus ?? 401 })
  }
}

export class InvalidDataError extends BaseError {
  constructor(data: ErrorCreateParams) {
    super({ ...data, httpStatus: data?.httpStatus ?? 422 })
  }
}
