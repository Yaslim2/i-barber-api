import { SendSms } from './send-sms';

describe('Send sms', () => {
  it('should be able to send a sms to a valid number', async () => {
    const sendSms = new SendSms();
    const sms = await sendSms.execute(
      process.env.TWILIO_PHONE_NUMBER_AUTHENTICATED,
      'Teste123',
    );
    expect(sms).toBeDefined();
  });

  it('should not be able to send a sms to an invalid number', async () => {
    const sendSms = new SendSms();
    await expect(sendSms.execute('+55943895734', 'Teste123')).rejects.toThrow();
  });
});
