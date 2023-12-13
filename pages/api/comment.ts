import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/mongoDB';

export default async function Comment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db('word_blog');
  const collection = db.collection('comment');

  if (req.method === 'GET') {
    try {
      if (req.query.state === 'all') {
        collection
          .countDocuments({
            cardID: new ObjectId(req.query.cardID?.toString()),
          })
          .then(result => {
            const page = parseInt(req.query.page as string) || 1;
            const perPage = 20;
            const currentPage = parseInt(req.query.page as string) || 1;
            const totalPosts = result;
            const totalPages = Math.ceil(totalPosts / perPage);

            if (parseInt(req.query.page as string) > totalPages) {
              return res.status(405).end();
            }

            collection
              .find({ cardID: new ObjectId(req.query.cardID?.toString()) })
              .sort({ date: -1 })
              .skip((page - 1) * perPage)
              .limit(perPage)
              .toArray()
              .then(result => {
                if (result) {
                  return res.json({ result, totalPages, currentPage });
                }
              });
          });
      } else if (req.query.state === 'one') {
        collection
          .findOne({ _id: new ObjectId(req.query._id?.toString()) })
          .then(result => {
            if (result) {
              return res.json(result);
            }
          });
      }
    } catch (error) {
      return res.status(400).end();
    }
  } else if (req.method === 'POST') {
    try {
      const comment = {
        cardID: new ObjectId(req.body.id),
        author: new ObjectId(req.body.author),
        comment: req.body.comment,
        date: new Date(),
      };

      collection.insertOne(comment).then(result => {
        if (result) {
          res.json({ post: true, id: result.insertedId });
        }
      });
    } catch (error) {
      return res.status(400).end();
    }
  } else if (req.method === 'DELETE') {
    try {
      collection
        .deleteOne({ _id: new ObjectId(req.query.id?.toString()) })
        .then(result => {
          if (result) {
            return res.json({ delete: true });
          }
        });
    } catch (error) {
      return res.status(400).end();
    }
  } else {
    return res.status(405).end();
  }
}
