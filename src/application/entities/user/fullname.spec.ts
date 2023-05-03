import { Fullname } from './fullname';

describe('Fullname', () => {
  it('should be able to create a fullname', () => {
    const fullname = new Fullname('Teste Teste');

    expect(fullname).toBeTruthy();
  });

  it('should not be able to create a fullname with invalid content', () => {
    expect(() => {
      new Fullname('TesteTeste');
    }).toThrow();
  });
});
