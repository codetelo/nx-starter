
import { Handler } from 'aws-lambda';
import {HttpError} from "./errors";

export const handler = (fn: Handler): Handler =>
    async function (event, context, callback) {
        // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
        context.callbackWaitsForEmptyEventLoop = false;
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        };
        try {
            const result = await fn(event, context, callback);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(result),
            };
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof HttpError) {
                return {
                    statusCode: err.statusCode,
                    headers,
                    body: JSON.stringify({ message: err.message }),
                };
            }
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ message: (err as Error).message }),
            };
        }
    };