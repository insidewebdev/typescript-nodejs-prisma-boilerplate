import { RequestHandler } from 'express';
import HttpException from '@exceptions/HttpException';
import { z } from 'zod';

const validate = (
    schema: z.Schema,
    value: string | 'body' | 'query' | 'params' = 'body',
    // skipMissingProperties = false,
    // whitelist = true,
    // forbidNonWhitelisted = true,
): RequestHandler => {
    return (req, res, next) => {
        try {
            // @ts-ignore
            const { success, error, data } = schema.safeParse(req[value] as any);

            if (!success) {
                const errors = error.format()

                next(HttpException.BAD_REQUEST('Invalid params', errors))
            }

            // @ts-ignore
            req[value] = data;

            next();
        } catch (error) {
            console.log(error)
            next(HttpException.BAD_REQUEST('Invalid request'));
        }
    };
};

export default validate