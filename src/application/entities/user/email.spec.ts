import { Email } from './email';

describe('Email', () => {
  it('should be able to create an email', () => {
    const email = new Email('yaslimsoares15@gmail.com');

    expect(email).toBeTruthy();
  });

  it('should not be able to create an email with invalid content', () => {
    expect(() => {
      new Email('yaslimsoares15gmail.com');
    }).toThrow();
  });
});
