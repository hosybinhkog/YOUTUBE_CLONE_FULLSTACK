module.exports = class ErrorHandler extends Error {
  constructor(message, code) {
    super(message, code);

    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
};
