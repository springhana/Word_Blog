import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { deflate } from 'zlib';

import { NoteItme } from '@/types/word_blog';
import { connectDB } from '@/utils/mongoDB';

export default function Markdown(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    deflate(req.body.md, async (err, buffer) => {
      if (!err) {
        const md_compression = buffer.toString('base64');
        const card = {
          author: new ObjectId(req.body.id),
          md: md_compression,
          title: req.body.title,
          memorize: false,
          tag: req.body.tag,
          paper: req.body.paper,
          date: new Date(),
          image: req.body.image,
        };

        const db = (await connectDB).db('word_blog');
        db.collection('card')
          .insertOne(card)
          .then(result => {
            if (result) {
              if (req.body.note) {
                req.body.note.map((item: NoteItme) => {
                  db.collection('note')
                    .findOne({
                      userID: new ObjectId(req.body.id),
                      name: item.name,
                    })
                    .then(note => {
                      if (note) {
                        const originalNote = [
                          ...note.cardID,
                          result.insertedId,
                        ];
                        db.collection('note').updateOne(
                          {
                            userID: new ObjectId(req.body.id),
                            name: item.name,
                          },
                          { $set: { cardID: originalNote } }
                        );
                      }
                    });
                });
              }

              return res.json({
                post: true,
                id: result.insertedId,
              });
            }
          });
      } else {
        console.error('압축 오류: ', err);
      }
    });
  } catch (error) {
    return res.status(400).end();
  }
}
