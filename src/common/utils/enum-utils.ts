import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isOneOfEnum', async: false })
export class IsOneOfEnum implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean {
        console.log('@Validate - Enums', { value }, '\n => ', args);
        const enumValues: string[] = args.constraints[0];
        return enumValues?.includes(value);
    }

    defaultMessage(args: ValidationArguments): string {
        return `The "$property" value must be one of the allowed values: ${args.constraints[0].join(
            ', ',
        )}.`;
    }
}
