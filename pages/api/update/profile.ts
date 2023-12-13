import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/mongoDB';

export default async function Profile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }
  try {
    let user = {};

    if (req.body.image) {
      user = {
        image: req.body.image,
      };
    } else if (req.body.bannerImage) {
      user = {
        bannerImage: req.body.bannerImage,
      };
    } else {
      user = { name: req.body.name, intro: req.body.intro };
    }

    const db = (await connectDB).db('word_blog_user');
    db.collection('users')
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: user })
      .then(result => {
        if (result) {
          res.json({ update: true });
        }
      });
  } catch (error) {
    return res.status(400).end();
  }
}
