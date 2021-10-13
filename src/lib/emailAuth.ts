import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

dotenv.config();

const emailContext = () => {
  return `
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
      href='#'
    >
    회원가입 완료하기
    </a>
  `;
};

const sendEmailToValidate = (userEmail: string) => {
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

  const mailOption = {
    from: `${process.env.EMAIL}`,
    to: `${userEmail}`,
    subject: '이메일 인증',
    html: `${emailContext()}`,
  };

  emailTransport.sendMail(mailOption, (err, res) => {
    emailTransport.close();
    return err ? err : res;
  });
};

export default sendEmailToValidate;
