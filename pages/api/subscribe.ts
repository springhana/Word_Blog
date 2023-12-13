import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/mongoDB';

export default async function Subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db('word_blog');
  const collection = db.collection('subscribe');
  if (req.method === 'GET') {
    collection
      .find(
        req.query.state === 'author'
          ? { _id: new ObjectId(req.query.author?.toString()) }
          : { userID: new ObjectId(req.query.author?.toString()) }
      )
      .toArray()
      .then(result => {
        if (result) {
          return res.json(result);
        }
      });
  } else if (req.method === 'POST') {
    collection.findOne({ _id: new ObjectId(req.body.author) }).then(result => {
      if (result) {
        let userID;
        if (
          result.userID.some(
            (item: string | ObjectId) =>
              item.toString() === new ObjectId(req.body.user).toString()
          )
        ) {
          userID = result.userID.filter(
            (item: string | ObjectId) =>
              item.toString() !== new ObjectId(req.body.user).toString()
          );
        } else {
          userID = [...result.userID, new ObjectId(req.body.user)];
        }
        collection
          .updateOne(
            { _id: new ObjectId(req.body.author) },
            { $set: { userID: userID } }
          )
          .then(result => {
            if (result) {
              res.json({ post: true });
            }
          });
      } else {
        collection
          .insertOne({
            _id: new ObjectId(req.body.author),
            userID: [new ObjectId(req.body.user)],
          })
          .then(result => {
            if (result) {
              res.json({ post: true });
            }
          });
      }
    });
  }
}
