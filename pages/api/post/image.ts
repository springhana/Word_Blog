import aws from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEYWORD,
    region: 'ap-northeast-2',
    signatureVersion: 'v4',
  });

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET_NAME,
    Fields: {
      key: req.query.id + '/' + req.query.state + '/' + req.query.file,
    },
    Expires: 60,
    Conditions: [['content-length-range', 0, 5048576]],
  });

  res.status(200).json(url);
}
