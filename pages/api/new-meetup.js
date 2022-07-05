import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const { title, image, address, description } = data;

    const uri = "mongodb://richirm:richirm333@cluster0-shard-00-00.4shhm.mongodb.net:27017,cluster0-shard-00-01.4shhm.mongodb.net:27017,cluster0-shard-00-02.4shhm.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-tvwl45-shard-0&authSource=admin&retryWrites=true&w=majority";
    const client = await MongoClient.connect(uri);

    const db = client.db();

    const meetupsCollections = db.collection('meetups');

    const result = await meetupsCollections.insertOne({
      title,
      image,
      address,
      description
    });

    client.close();

    res.status(201).json({
      message: 'Meetup inserted!',
      id: result.insertedId
    });
  }
}

export default handler;