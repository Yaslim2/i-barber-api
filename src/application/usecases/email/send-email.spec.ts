import { SendMail } from './send-email';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({
      messageId: 'mocked-message-id',
    }),
  }),
}));

describe('Send-Email', () => {
  it('should send an email', async () => {
    const sendEmail = new SendMail();
    const result = await sendEmail.execute({
      to: 'test@example.com',
      subject: 'Test Email',
      context: {},
      template: 'verification-email',
    });

    expect(result.messageId).toBe('mocked-message-id');
  });
});
