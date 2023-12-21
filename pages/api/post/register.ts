import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

import { connectDB } from '@/utils/mongoDB';

const generateRandomNumber = function (min: number, max: number) {
  const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
};

export default async function Register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  if (req.body.state === 'email') {
    const smtpTransport = nodemailer.createTransport({
      pool: true,
      maxConnections: 1,
      service: 'naver',
      host: 'smtp.naver.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const number = generateRandomNumber(111111, 999999);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: '인증 관련 메일 입니다.',
      html: '<h1>인증번호 입력해주세요 \n\n\n\n\n\n</h1>' + number,
    };

    smtpTransport.sendMail(mailOptions, (err, response) => {
      if (err) {
        smtpTransport.close();
        return res.json({ ok: false, mag: '메일 전송에 실패했습니다.' });
      } else {
        smtpTransport.close();
        return res.json({
          ok: true,
          msg: '메일 전송에 성공하였습니다.',
          authNum: number,
        });
      }
    });
  } else if (req.body.state === 'register' && req.body.ok) {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;

      const user = {
        name: req.body.name,
        email: req.body.email + '/auth',
        password: req.body.password,
        image: req.body.image,
      };

      const db = (await connectDB).db('word_blog_user');
      db.collection('users')
        .findOne({ email: req.body.email.split('/')[0] })
        .then(result => {
          if (!result) {
            db.collection('users')
              .insertOne(user)
              .then(result => {
                return res.json({ post: true });
              });
          } else {
            if (!result.password) {
              db.collection('users')
                .insertOne(user)
                .then(result => {
                  return res.json({ post: true });
                });
            } else {
              return res.status(405).end();
            }
          }
        });
    } catch (error) {
      return res.status(400).end();
    }
  }
}
