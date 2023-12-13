import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/mongoDB';

export default async function Data(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const db = (await connectDB).db('word_blog');
    db.collection('card')
      .countDocuments({ author: new ObjectId(req.query._id?.toString()) })
      .then(card => {
        db.collection('comment')
          .countDocuments({ author: new ObjectId(req.query._id?.toString()) })
          .then(comment => {
            db.collection('like')
              .countDocuments({
                userID: new ObjectId(req.query._id?.toString()),
              })
              .then(like => {
                db.collection('note')
                  .countDocuments({
                    userID: new ObjectId(req.query._id?.toString()),
                  })
                  .then(note => {
                    return res.json({ card, comment, like, note });
                  });
              });
          });
      });
  } catch (error) {
    console.error(error);
  }
}
