import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/mongoDB';

export default async function User(req: NextApiRequest, res: NextApiResponse) {
  const db = (await connectDB).db('word_blog_user');
  if (req.method === 'GET') {
    try {
      db.collection('users')
        .findOne(
          req.query.state === 'id'
            ? { _id: new ObjectId(req.query._id?.toString()) }
            : { email: req.query._id }
        )
        .then(result => {
          if (result) {
            if (req.query.state === 'id') {
              return res.json(result);
            } else if (req.query.state === 'email') {
              return res.json(result._id);
            }
          }
        });
    } catch (error) {
      return res.status(400).end();
    }
  } else if (req.method === 'POST') {
    db.collection('users')
      .findOne({
        _id: new ObjectId(req.body.id?.toString()),
      })
      .then(async result => {
        if (result) {
          const pwcheck = await bcrypt.compare(
            req.body.password,
            result.password
          );

          if (pwcheck) {
            const hash = await bcrypt.hash(req.body.newPassword, 10);
            req.body.newPassword = hash;

            db.collection('users')
              .updateOne(
                {
                  _id: new ObjectId(req.body.id),
                },
                { $set: { password: req.body.newPassword } }
              )
              .then(result => {
                if (result) {
                  return res.json({ post: true });
                }
              });
          } else {
            return res.json({ post: false });
          }
        }
      });
  } else {
    return res.status(405).end();
  }
}
