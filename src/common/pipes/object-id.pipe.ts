import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform<string, Types.ObjectId> {
    transform(value: string, metadata: ArgumentMetadata): Types.ObjectId {
        const isValidObjectId = Types.ObjectId.isValid(value);
        if (!isValidObjectId) {
            throw new BadRequestException('Invalid ID');
        }
        // @ts-ignore
        return Types.ObjectId.createFromHexString(value);
    }
}
