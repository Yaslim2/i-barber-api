import { registerDecorator, ValidationOptions } from 'class-validator';
import validator from 'validator';
export function urlValidation(value: string) {
  return validator.isURL(value);
}

export function UrlValidation(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'UrlValidation',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const validation = urlValidation(value);
          return validation;
        },
      },
    });
  };
}
