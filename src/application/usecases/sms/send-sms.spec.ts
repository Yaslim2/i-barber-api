import { SendSms } from './send-sms';

jest.mock('./send-sms', () => ({
  SendSms: jest.fn().mockImplementation(() => ({
    execute: jest.fn(),
  })),
}));

describe('Send sms', () => {
  it('should be able to send a sms', async () => {
    const sendSms = new SendSms();
    await sendSms.execute({
      to: '+5585998568833',
      body: 'Teste123',
    });
    expect(sendSms.execute).toHaveBeenCalledWith({
      to: '+5585998568833',
      body: 'Teste123',
    });
  });

  it('should not be able to send a sms with wrong information', async () => {
    const sendSms = new SendSms();
    await sendSms.execute({
      to: '+5585998568833',
      body: 'Teste123',
    });
    expect(sendSms.execute).not.toHaveBeenCalledWith({
      to: '+5585998568833',
      body: 'Teste1234',
    });
  });
});
