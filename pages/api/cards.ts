import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import util from 'util';
import { inflate } from 'zlib';

import { CardType } from '@/types/word_blog';
import { connectDB } from '@/utils/mongoDB';

export default async function Cards(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const db = (await connectDB).db('word_blog');
    db.collection('card')
      .countDocuments(
        req.query.tag !== 'all' && req.query.state === 'tag'
          ? { tag: req.query.tag }
          : req.query.state === 'my'
            ? { author: new ObjectId(req.query.author?.toString()) }
            : {}
      )
      .then((result: number) => {
        const page = parseInt(req.query.page as string) || 1;
        const perPage = 10;
        const currentPage = parseInt(req.query.page as string) || 1;
        const totalPosts = result;
        const totalPages = Math.ceil(totalPosts / perPage);
        if (parseInt(req.query.page as string) > totalPages) {
          return res.status(405).end();
        }
        const collection = db.collection('card');

        collection
          .find(
            req.query.tag !== 'all' && req.query.state === 'tag'
              ? { tag: req.query.tag }
              : req.query.state === 'my'
                ? { author: new ObjectId(req.query.author?.toString()) }
                : {}
          )
          .sort({ date: -1 })
          .skip((page - 1) * perPage)
          .limit(perPage)
          .toArray()
          .then(async result => {
            if (result) {
              const card: CardType[] = [];

              for await (const item of result) {
                if (item.paper === 'markdown') {
                  const inflateAsync = util.promisify(inflate);
                  const buffer = Buffer.from(item.md as string, 'base64');
                  try {
                    const data = await inflateAsync(buffer);
                    const md_compression = data.toString();
                    const item_card: CardType = {
                      _id: item._id,
                      memorize: item.memorize,
                      tag: item.tag,
                      date: item.date,
                      author: item.author,
                      md: md_compression,
                      title: item.title,
                      paper: item.paper,
                      image: item.image,
                    };
                    card.push(item_card);
                  } catch (error) {
                    console.error('압축 해체 오류', error);
                  }
                } else if (item.paper === 'word') {
                  const item_card: CardType = {
                    _id: item._id,
                    memorize: item.memorize,
                    tag: item.tag,
                    date: item.date,
                    author: item.author,
                    word: item.word,
                    meaning: item.meaning,
                    paper: item.paper,
                    image: item.image,
                  };
                  card.push(item_card);
                }
              }
              res.json({ result: card, totalPages, currentPage });
            }
          });
      });
  } catch (error) {
    return res.status(400).end();
  }
}
