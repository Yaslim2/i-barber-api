import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class Sms {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async sendSms(to: string, body: string) {
    return await this.client.messages.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
      body,
    });
  }
}
