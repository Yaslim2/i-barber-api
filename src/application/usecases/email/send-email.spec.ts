import * as nodemailer from 'nodemailer';
import { SendMail } from './send-email';

const mockTransporter = {
  sendMail: jest.fn(),
};
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => mockTransporter),
}));

test('Send-Email', async () => {
  const sendEmail = new SendMail();

  await sendEmail.execute({
    context: {},
    to: 'destinatario@example.com',
    subject: 'Assunto do email',
    template: 'verification-email',
  });

  expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
  expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.any(Object));
  expect(mockTransporter.sendMail).toHaveBeenCalledTimes(1);
});
