const httpStatus = require('http-status');

class ExtendableError extends Error {
    errors: any;
    status: any;
    stack?: string;
    isPublic: boolean;
    isOperational: boolean;

    constructor({
        // @ts-ignore
        message, errors, status, isPublic, stack,
    }) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true;
        this.stack = stack;
    }
}

class HttpException extends ExtendableError {
    constructor({
        // @ts-ignore
        message,
        stack = null,
        errors = {},
        status = httpStatus.INTERNAL_SERVER_ERROR,
        isPublic = false,
    }) {
        super({
            message, errors, status, isPublic, stack,
        });
    }


    static NOT_FOUND(message: string) {
        return new HttpException({
            message,
            status: httpStatus.NOT_FOUND,
            isPublic: true,
        });
    }

    static BAD_REQUEST(message: string, errors = {}) {
        return new HttpException({
            message,
            status: httpStatus.BAD_REQUEST,
            isPublic: true,
            errors
        });
    }

    static UNAUTHORIZED(message: string) {
        return new HttpException({
            message,
            status: httpStatus.UNAUTHORIZED,
            isPublic: true,
        });
    }

    static FORBIDDEN(message: string) {
        return new HttpException({
            message,
            status: httpStatus.FORBIDDEN,
            isPublic: true,
        });
    }

    static INTERNAL_SERVER_ERROR(message: string = 'Internal Server Error') {
        return new HttpException({
            message,
            status: httpStatus.INTERNAL_SERVER_ERROR,
            isPublic: true,
        });
    }
}

export default HttpException;