import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { Types } from 'mongoose';
export declare class StringToObjectIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): Types.ObjectId;
}
