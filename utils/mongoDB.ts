import { MongoClient } from 'mongodb';
const url = process.env.DATABASE_URL; //여기에 컬렉션 추가 시킴 ?뒤에 추가
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!url) {
    throw new Error('The MONGODB_URL environment variable is not defined');
  }
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url as string).connect();
}
export { connectDB };
