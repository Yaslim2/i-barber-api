import { Url } from './url';

describe('Url', () => {
  it('should be able to create an url', () => {
    const url = new Url(
      'https://cdn-icons-png.flaticon.com/512/1160/1160040.png?w=360%22',
    );

    expect(url).toBeTruthy();
  });

  it('should not be able to create an url with invalid content', () => {
    expect(() => {
      new Url('cdn-icons-pngflaticoncom/512/1160/1160040.png?w=360%22');
    }).toThrow();
  });
});
