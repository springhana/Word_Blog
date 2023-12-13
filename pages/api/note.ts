import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/mongoDB';

export default async function Note(req: NextApiRequest, res: NextApiResponse) {
  const db = (await connectDB).db('word_blog');
  const collection = db.collection('note');
  if (req.method === 'GET') {
    try {
      collection
        .find(
          req.query.state === 'user'
            ? {
                userID: new ObjectId(req.query._id?.toString()),
              }
            : req.query.state === 'card'
              ? {
                  cardID: new ObjectId(req.query._id?.toString()),
                }
              : {
                  _id: new ObjectId(req.query._id?.toString()),
                }
        )
        .toArray()
        .then(result => {
          if (result) {
            return res.json(result);
          }
        });
    } catch (error) {
      return res.status(400).end();
    }
  } else if (req.method === 'POST') {
    try {
      const note = {
        name: req.body.name,
        userID: new ObjectId(req.body.id),
        cardID: [],
      };

      collection.insertOne(note).then(result => {
        if (result) {
          return res.json({ post: true });
        }
      });
    } catch (error) {
      return res.status(400).end();
    }
  } else if (req.method === 'PUT') {
    try {
      collection
        .updateOne(
          { _id: new ObjectId(req.body.id) },
          { $set: { name: req.body.name } }
        )
        .then(result => {
          if (result) {
            return res.json({ update: true });
          }
        });
    } catch (error) {
      return res.status(400).end();
    }
  } else if (req.method === 'DELETE') {
    collection
      .deleteOne({ _id: new ObjectId(req.query.id?.toString()) })
      .then(result => {
        if (result) {
          return res.json({ delete: true });
        }
      });
  } else {
    return res.status(405).end();
  }
}
