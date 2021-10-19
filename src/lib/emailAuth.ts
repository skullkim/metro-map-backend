import dotenv from 'dotenv';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

import { AuthEmail } from '../entity/authEmail';
import { User } from '../entity/user';

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
    return {
      emailContext: `
    <h3>안녕하세요 회원님. 회원가입 완료를 위해 다음 링크를 클릭해 주세요</h3>
    <br />
    <a 
      style='
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: white;
        background-color: #2867B2;
        padding: 15px 94px;
        border: 1px solid #2867B2;
        border-radius: 15px;
        font-size: 15px
      ' 
      href='${url}'
    >
    회원가입 완료하기
    </a>
  `,
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
