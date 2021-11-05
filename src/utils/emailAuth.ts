import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import dotenv from 'dotenv';
import handlebars from 'handlebars';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

import { AuthEmail } from '../models/authEmail';
import { User } from '../models/user';

import { EmailContext } from './type/auth';

dotenv.config();

const getEmailContext = async (
  user: User | undefined
): Promise<EmailContext> => {
  try {
    const randomString: string = Math.random().toString(36).substr(2, 11);
    const url = `${process.env.CLIENT_ORIGIN}/signup/email?key=${randomString}&id=${user?.id}`;

    const {
      raw: { insertId },
    } = await AuthEmail.setRandomKey(user, randomString);

    const readFile = promisify(fs.readFile);
    const filePath = path.join(__dirname, '../templates/signupEmailAuth.html');
    const emailContext = await readFile(filePath, 'utf-8');

    const template = handlebars.compile(emailContext);
    const emailToSend = template({ url });

    return {
      emailContext: emailToSend,
      authEmailId: insertId,
    };
  } catch (err) {
    throw err;
  }
};

const sendEmailToValidate = async (user: User | undefined) => {
  const emailTransport = nodemailer.createTransport(
    smtpTransport({
      service: `${process.env.EMAIL_SERVICE}`,
      host: `${process.env.EMAIL_HOST}`,
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    })
  );
  try {
    const { emailContext, authEmailId }: EmailContext = await getEmailContext(
      user
    );

    const mailOption = {
      from: `${process.env.EMAIL}`,
      to: `${user!.email}`,
      subject: '이메일 인증',
      html: `${emailContext}`,
    };

    emailTransport.sendMail(mailOption, (err, res) => {
      emailTransport.close();

      cron.schedule('* * 1 * * *', async () => {
        await AuthEmail.deleteRandomKey(authEmailId);
      });

      return err ? err : res;
    });
  } catch (err) {
    return err;
  }
};

export default sendEmailToValidate;
