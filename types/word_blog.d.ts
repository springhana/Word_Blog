import { ObjectId } from 'mongodb';

export interface NoteItme {
  name: string;
  id: string;
}

export interface CardType {
  _id: string | ObjectId;
  memorize: boolean;
  tag: string;
  date: string;
  author: string;
  paper: string;
  program: string;
  image: string;
  updateDate?: string;
  title?: string;
  word?: string;
  meaning?: string;
  sentence?: string;
  md?: string;
  title?: string;
}

export interface CommentType {
  _id: string;
  cardID: string;
  author: string;
  comment: string;
  date: string;
}

export interface TagType {
  _id: string;
  userID: string[];
  name: string;
}

export interface NoteType {
  _id: string;
  name: string;
  image: string;
  userID: string;
  cardID: string[];
}

export interface LikeType {
  _id: string;
  userID: string[];
}

export interface LikesType {
  result: number;
  like: boolean;
}

export interface SubscribeType {
  _id: string;
  userID: [];
}

export interface ActiveType {
  CardID: string;
  Date: [];
}
