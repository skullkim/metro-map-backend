import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const createNodemailerTransport = () => {
  return nodemailer.createTransport(
    smtpTransport({
      service: `${process.env.EMAIL_SERVICE}`,
      host: `${process.env.EMAIL_HOST}`,
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    })
  );
};

export default createNodemailerTransport;
