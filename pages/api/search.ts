import { NextApiRequest, NextApiResponse } from 'next';

import { connectDB } from '@/utils/mongoDB';

export default async function Search(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const search = [
      {
        $search: {
          index: 'all_search',
          text: {
            query: req.query.value,
            path: {
              wildcard: '*',
            },
          },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 1,
        },
      },
    ];
    if (req.query.value) {
      const db = (await connectDB).db('word_blog');
      db.collection('card')
        .aggregate(search)
        .toArray()
        .then(result => {
          if (result) {
            return res.json(result);
          }
        });
    }
  } catch (error) {
    return res.status(400).end();
  }
}
