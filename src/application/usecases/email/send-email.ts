import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';

@Injectable()
export class SendMail {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async execute(options: {
    to: string;
    subject: string;
    template: string;
    context: any;
  }): Promise<nodemailer.SentMessageInfo> {
    const templateFile = `src/templates/${options.template}/${options.template}.hbs`;
    const template = Handlebars.compile(fs.readFileSync(templateFile, 'utf-8'));
    const html = template(options.context);
    return await this.transporter.sendMail({
      from: 'ibarber@gmail.com',
      html,
      to: options.to,
      subject: options.subject,
    });
  }
}
