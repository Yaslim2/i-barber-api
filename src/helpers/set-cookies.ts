import { Response } from 'express';

export const setCookies = ({
  res,
  cookieValue,
  cookieKey,
}: {
  res: Response;
  cookieKey: string;
  cookieValue: any;
}) => {
  res.clearCookie(cookieKey);
  res.cookie(cookieKey, cookieValue, { httpOnly: true });
};
