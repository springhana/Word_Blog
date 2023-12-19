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
      collection.findOne({ name: req.body.tag }).then(result => {
        if (result) {
          if (
            result.userID.some(
              (item: string) =>
                item.toString() === new ObjectId(req.body.id).toString()
            )
          ) {
            return res.json({ post: false });
          } else {
            const orginalTag = [
              new ObjectId(...result.userID),
              new ObjectId(req.body.id),
            ];
            collection
              .updateOne({ _id: result._id }, { $set: { userID: orginalTag } })
              .then(() => {
                return res.json({ post: true });
              });
          }
        } else {
          collection
            .insertOne({
              userID: [new ObjectId(req.body.id)],
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
    collection.findOne({ _id: new ObjectId(req.body.tagId) }).then(result => {
      if (result) {
        const originalTag = result.userID.filter(
          (item: string) =>
            item.toString() !== new ObjectId(req.body.id).toString()
        );
        collection
          .updateOne(
            { _id: new ObjectId(req.body.tagId) },
            { $set: { userID: originalTag } }
          )
          .then(() => {
            collection.findOne({ name: req.body.name }).then(result => {
              if (result) {
                if (
                  result.userID.some(
                    (item: string) =>
                      item.toString() === new ObjectId(req.body.id).toString()
                  )
                ) {
                  return res.json({ update: false });
                } else {
                  const orginalTag = [
                    ...new Set([
                      new ObjectId(...result.userID),
                      new ObjectId(req.body.id),
                    ]),
                  ];

                  collection
                    .updateOne(
                      { name: req.body.name },
                      { $set: { userID: orginalTag } }
                    )
                    .then(result => {
                      if (result) {
                        return res.json({ update: true });
                      }
                    });
                }
              } else {
                collection
                  .insertOne({
                    userID: [new ObjectId(req.body.id)],
                    name: req.body.name,
                  })
                  .then(() => {
                    return res.json({ update: true });
                  });
              }
            });
          });
      }
    });
  } else if (req.method === 'DELETE') {
    collection
      .findOne({ _id: new ObjectId(req.query.userId?.toString()) })
      .then(result => {
        if (result) {
          const originalTag = result.userID.filter(
            (item: string) =>
              item.toString() !==
              new ObjectId(req.query.id?.toString()).toString()
          );
          collection
            .updateOne(
              { _id: new ObjectId(req.query.userId?.toString()) },
              { $set: { userID: originalTag } }
            )
            .then(() => {
              if (result) {
                return res.json({ delete: true });
              }
            });
        }
      });
  } else {
    return res.status(405).end();
  }
}
