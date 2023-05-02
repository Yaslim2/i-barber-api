import { registerDecorator, ValidationOptions } from 'class-validator';

export function fullnameValidation(value: string) {
  return /^[A-Za-zÀ-ÖØ-öø-ÿ]+\s[A-Za-zÀ-ÖØ-öø-ÿ]+(\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(
    value,
  );
}

export function FullnameValidation(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'FullnameValidation',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const validation = fullnameValidation(value);
          return validation;
        },
      },
    });
  };
}
