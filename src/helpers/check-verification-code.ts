import { Request, Response } from 'express';

export const checkCode = async ({
  receivedCode,
  req,
  codeToCheck,
  res,
}: {
  req: Request;
  receivedCode: string;
  codeToCheck: string;
  res: Response;
}) => {
  const code = req.cookies[codeToCheck];
  const codeExpiration = req.cookies[`${codeToCheck}_expiration`];
  const isCodeValid =
    receivedCode === code && Number(codeExpiration) > new Date().getTime();
  if (isCodeValid) {
    res.clearCookie('verification_code');
    res.clearCookie('verification_code_expiration');
    return (
      receivedCode === code && Number(codeExpiration) > new Date().getTime()
    );
  }
};
