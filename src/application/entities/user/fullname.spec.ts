import { Fullname } from './fullname';

describe('Fullname', () => {
  it('should be able to create a fullname', () => {
    const fullname = new Fullname('Yaslim Soares');

    expect(fullname).toBeTruthy();
  });

  it('should not be able to create a fullname with invalid content', () => {
    expect(() => {
      new Fullname('YaslimSoares');
    }).toThrow();
  });
});
