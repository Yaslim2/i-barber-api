import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ValidationIdParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!value || !uuidRegex.test(value)) {
      throw new BadRequestException(
        `The param ${metadata.data} must be correctly informed.`,
      );
    }
    return value;
  }
}
