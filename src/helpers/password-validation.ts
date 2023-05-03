import { registerDecorator, ValidationOptions } from 'class-validator';

export function passwordValidation(value: string) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#?=!-+_;:])[0-9a-zA-Z$*&@#?=!-+_;:]{8,30}$/.test(
    value,
  );
}

export function PasswordValidation(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'PasswordValidation',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const validation = passwordValidation(value);
          return validation;
        },
      },
    });
  };
}
