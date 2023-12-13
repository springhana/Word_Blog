import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { deflate, inflate } from 'zlib';

import { NoteItme } from '@/types/word_blog';
import { connectDB } from '@/utils/mongoDB';

export default async function Card(req: NextApiRequest, res: NextApiResponse) {
  const db = (await connectDB).db('word_blog');
  if (req.method === 'GET') {
    try {
      if (req.query.state === 'title') {
        db.collection('card')
          .findOne({
            _id: new ObjectId(req.query._id?.toString()),
          })
          .then(result => {
            if (result) {
              if (result.paper === 'markdown') {
                return res.json(result.title);
              } else {
                return res.json(result.word);
              }
            }
          });
      } else {
        db.collection('card')
          .findOne({
            _id: new ObjectId(req.query._id?.toString()),
          })
          .then(result => {
            if (result) {
              if (result.paper === 'markdown') {
                const compressedData = result.md;
                const buffer = Buffer.from(compressedData, 'base64');
                inflate(buffer, (err: Error | null, data: Buffer) => {
                  if (!err) {
                    const decompressedData = data.toString();
                    const item_card = {
                      _id: result._id,
                      md: decompressedData,
                      title: result.title,
                      memorize: result.memorize,
                      tag: result.tag,
                      date: result.date,
                      note: result.note,
                      author: result.author,
                      paper: result.paper,
                      image: result.image,
                    };
                    return res.json(item_card);
                  } else {
                    console.error('압축 해제 오류:', err);
                  }
                });
              } else {
                return res.json(result);
              }
            }
          });
      }
    } catch (error) {
      return res.status(400).end();
    }
  } else if (req.method === 'PUT') {
    try {
      if (req.body.paper === 'word') {
        const word = {
          word: req.body.word,
          meaning: req.body.meaning,
          sentence: req.body.sentence,
          memorize: req.body.memorize,
          date: req.body.date + '수정됨',
          image: req.body.image,
        };

        db.collection('card').updateOne(
          { _id: new ObjectId(req.body.id) },
          { $set: word }
        );
      } else if (req.body.paper === 'markdown') {
        deflate(req.body.md, (err, buffer) => {
          if (!err) {
            const md_compression = buffer.toString('base64');
            const md = {
              md: md_compression,
              title: req.body.title,
              memorize: req.body.memorize,
              date: req.body.date + '수정됨',
              image: req.body.image,
            };
            db.collection('card').updateOne(
              { _id: new ObjectId(req.body.id) },
              { $set: md }
            );
          } else {
            console.error('압축 오류: ', err);
          }
        });
      }
      db.collection('note')
        .find({
          userID: new ObjectId(req.body.author),
        })
        .toArray()
        .then(notes => {
          if (notes) {
            notes.map(item => {
              const originalNote = item.cardID.filter(
                (items: string | ObjectId) =>
                  !(
                    new ObjectId(items).toString() ===
                    new ObjectId(req.body.id).toString()
                  )
              );
              db.collection('note').updateOne(
                {
                  userID: new ObjectId(req.body.author),
                  name: item.name,
                },
                { $set: { cardID: originalNote } }
              );
            });

            req.body.note.map((item: NoteItme) => {
              db.collection('note')
                .findOne({
                  userID: new ObjectId(req.body.author),
                  name: item.name,
                })
                .then(note => {
                  if (note) {
                    const originalNote = [
                      ...note.cardID,
                      new ObjectId(req.body.id),
                    ];
                    db.collection('note').updateOne(
                      {
                        userID: new ObjectId(req.body.author),
                        name: note.name,
                      },
                      { $set: { cardID: originalNote } }
                    );
                  }
                });
            });
          }
        });

      return res.json({ update: true });
    } catch (error) {
      return res.status(400).end();
    }
  } else if (req.method === 'DELETE') {
    try {
      db.collection('card')
        .deleteOne({ _id: new ObjectId(req.query.id?.toString()) })
        .then(result => {
          if (result) {
            db.collection('like')
              .deleteOne({
                _id: new ObjectId(req.query.id?.toString()),
              })
              .then(result => {
                if (result) {
                  db.collection('comment')
                    .deleteOne({
                      cardID: new ObjectId(req.query.id?.toString()),
                    })
                    .then(result => {
                      if (result) {
                        db.collection('note')
                          .find({
                            userID: new ObjectId(req.query.author?.toString()),
                          })
                          .toArray()
                          .then(note => {
                            if (note) {
                              note.map(item => {
                                const originalNote = item.cardID.filter(
                                  (item: string | ObjectId) =>
                                    !(
                                      new ObjectId(item).toString() ===
                                      new ObjectId(
                                        req.query.id as string
                                      ).toString()
                                    )
                                );
                                db.collection('note')
                                  .updateOne(
                                    {
                                      userID: new ObjectId(
                                        req.query.author?.toString()
                                      ),
                                      name: item.name,
                                    },
                                    { $set: { cardID: originalNote } }
                                  )
                                  .then(result => {
                                    if (result) {
                                      return res.json({ delete: true });
                                    }
                                  });
                              });
                            }
                          });
                        return res.json({ delete: true });
                      }
                    });
                }
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
