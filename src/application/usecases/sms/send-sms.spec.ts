import { SendSms } from './send-sms';

jest.mock('twilio', () => {
  return () => {
    return {
      messages: {
        create: jest.fn().mockResolvedValue({
          sid: 'M00000000000000000000000000000000',
          status: 'sent',
        }),
      },
    };
  };
});

describe('Send sms', () => {
  it('should be able to send a sms', async () => {
    const sendSms = new SendSms();
    const result = await sendSms.execute({
      to: '1234567890',
      body: 'Test message',
    });

    expect(result.sid).toBe('M00000000000000000000000000000000');
    expect(result.status).toBe('sent');
  });
});
