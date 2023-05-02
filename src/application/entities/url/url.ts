import { urlValidation } from '@helpers/url-validation';

export class Url {
  private readonly url: string;

  constructor(url: string) {
    const isUrlValid = urlValidation(url);

    if (!isUrlValid) {
      throw new Error('Invalid Url');
    }
    this.url = url;
  }

  get value(): string {
    return this.url;
  }
}
