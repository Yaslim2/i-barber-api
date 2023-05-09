import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class SendSms {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async execute(to: string, body: string) {
    return await this.client.messages.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
      body,
    });
  }
}
