import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import * as handlebars from 'handlebars';

import createNodemailerTransport from './createNodemailerTransport';
import { UserComplain } from './type/auth';

const getEmailContext = async (
  subwayLine?: number,
  userComplainContext?: string
) => {
  const readFile = promisify(fs.readFile);
  const filePath = path.join(
    __dirname,
    '../templates/userComplainContext.html'
  );
  const emailContext = await readFile(filePath, 'utf-8');

  const template = handlebars.compile(emailContext);
  const emailToSend = template({
    subwayLine,
    userComplainContext,
  });

  return emailToSend;
};

const sendUserComplainedContextToUser = async ({
  email,
  subwayLine,
  userComplainContext,
}: UserComplain) => {
  try {
    const emailTransport = createNodemailerTransport();

    const emailContext = await getEmailContext(subwayLine, userComplainContext);

    const mailOption = {
      from: `${process.env.Email}`,
      to: `${email}`,
      subject: '안녕하세요, 명지지하철입니다',
      html: `${emailContext}`,
    };

    emailTransport.sendMail(mailOption, (err, res) => {
      emailTransport.close();

      return err ? err : res;
    });
  } catch (err) {
    return err;
  }
};

export default sendUserComplainedContextToUser;
