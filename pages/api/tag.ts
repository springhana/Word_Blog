import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/mongoDB';
export default async function Tag(req: NextApiRequest, res: NextApiResponse) {
  const db = (await connectDB).db('word_blog');
  const collection = db.collection('tag');

  if (req.method === 'GET') {
    try {
      if (req.query.state === 'all') {
        collection
          .find({ userID: new ObjectId(req.query.id?.toString()) })
          .toArray()
          .then(result => {
            if (result) {
              return res.json(result);
            }
          });
      } else if (req.query.state === 'one') {
        collection
          .findOne({ _id: new ObjectId(req.query.id?.toString()) })
          .then(result => {
            if (result) {
              return res.json([result]);
            }
          });
      }
    } catch (error) {
      return res.status(400).end();
    }
  } else if (req.method === 'POST') {
    try {
      collection
        .find({ userID: new ObjectId(req.body.id) })
        .toArray()
        .then(result => {
          if (result) {
            if (result.some(item => item._id === req.body.tag)) {
              return res.status(405).end();
            }
            collection
              .insertOne({
                userID: new ObjectId(req.body.id),
                name: req.body.tag,
              })
              .then(() => {
                return res.json({ post: true });
              });
          }
        });
    } catch (error) {
      return res.status(400).end();
    }
  } else if (req.method === 'PUT') {
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
