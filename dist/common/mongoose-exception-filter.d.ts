import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { MongooseError } from 'mongoose';
export declare class MongooseExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError | MongooseError, host: ArgumentsHost): void;
}
