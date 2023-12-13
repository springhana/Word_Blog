import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/mongoDB';
export default async function Memorize(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  try {
    const db = (await connectDB).db('word_blog');
    db.collection('card')
      .findOne({ _id: new ObjectId(req.body.id) })
      .then(result => {
        if (result) {
          db.collection('card')
            .updateOne(
              { _id: new ObjectId(req.body.id) },
              { $set: { memorize: !result.memorize } }
            )
            .then(() => {
              res.json({ update: true, memorize: !result.memorize });
            });
        }
      });
  } catch (error) {
    return res.status(400).end();
  }
}
