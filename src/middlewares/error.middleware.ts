import { NextFunction, Request, Response } from 'express';
import HttpException from '@/exceptions/HttpException';
import { logger } from '@/utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {

        const status: number = error.status || 500;
        const message: string = error.message || 'Something went wrong';

        logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message} . Trace: ${error.stack}  , Error: ${JSON.stringify(error)}`);

        if ((error instanceof HttpException)) {
            return res.status(status).json({ message, errors: error.errors });
        }

        return res.status(500).json({ message: 'Internal server error' });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;