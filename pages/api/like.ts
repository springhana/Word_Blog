import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/mongoDB';

export default async function Like(req: NextApiRequest, res: NextApiResponse) {
  const db = (await connectDB).db('word_blog');
  const collection = db.collection('like');
  if (req.method === 'GET') {
    try {
      if (req.query.field === 'id') {
        collection
          .findOne({ _id: new ObjectId(req.query._id?.toString()) })
          .then(result => {
            if (result) {
              if (
                result.userID.some((item: string) => item !== req.query.user)
              ) {
                res.json({ result: result.userID.length, like: true });
              } else {
                res.json({ result: result.userID.length, like: false });
              }
            } else {
              res.json({ result: 0, like: false });
            }
          });
      } else if (req.query.field === 'user') {
        collection
          .find({ userID: new ObjectId(req.query._id?.toString()) })
          .toArray()
          .then(result => {
            if (result) {
              res.json({ result });
            }
          });
      }
    } catch (error) {
      return res.status(400).end();
    }
  } else if (req.method === 'POST') {
    try {
      collection.findOne({ _id: new ObjectId(req.body.id) }).then(result => {
        if (result) {
          let userID;
          if (
            result.userID.some(
              (item: string) =>
                item.toString() === new ObjectId(req.body.user).toString()
            )
          ) {
            userID = result.userID.filter(
              (item: string) =>
                item.toString() !== new ObjectId(req.body.user).toString()
            );
          } else {
            userID = [...result.userID, new ObjectId(req.body.user)];
          }
          db.collection('like')
            .updateOne(
              { _id: new ObjectId(req.body.id) },
              { $set: { userID: userID } }
            )
            .then(() => {
              return res.json({ post: true });
            });
        } else {
          db.collection('like')
            .insertOne({
              _id: new ObjectId(req.body.id),
              userID: [new ObjectId(req.body.user)],
            })
            .then(() => {
              return res.json({ post: true });
            });
        }
      });
    } catch (error) {
      return res.status(400).end();
    }
  } else {
    return res.status(405).end();
  }
}
