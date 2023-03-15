import { ValidationError } from 'express-validator';
import { CustomError } from './custom-abstract-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Request validation errors');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(error => {
            return {
                message: error.msg,
                field: error.param,
            }
        })
    }

}