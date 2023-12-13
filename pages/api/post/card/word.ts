import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { NoteItme } from '@/types/word_blog';
import { connectDB } from '@/utils/mongoDB';

export default async function Word(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end;
  }

  try {
    const card = {
      author: new ObjectId(req.body.id),
      word: req.body.word,
      meaning: req.body.meaning,
      sentence: req.body.sentence,
      memorize: false,
      tag: req.body.tag,
      paper: req.body.paper,
      program: req.body.program,
      image: req.body.image,
      date: new Date(),
    };

    const db = (await connectDB).db('word_blog');
    db.collection('card')
      .insertOne(card)
      .then(result => {
        if (result) {
          req.body.note.map((item: NoteItme) => {
            db.collection('note')
              .findOne({
                userID: new ObjectId(req.body.id),
                name: item.name,
              })
              .then(note => {
                if (note) {
                  const originalNote = [...note.cardID, result.insertedId];
                  db.collection('note').updateOne(
                    { userID: new ObjectId(req.body.id), name: item.name },
                    { $set: { cardID: originalNote } }
                  );
                }
              });
          });
          return res.json({ post: true, id: result.insertedId });
        }
      });
  } catch (error) {
    return res.status(400).end();
  }
}
