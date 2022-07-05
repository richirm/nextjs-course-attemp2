import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetailsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const uri = "mongodb://richirm:richirm333@cluster0-shard-00-00.4shhm.mongodb.net:27017,cluster0-shard-00-01.4shhm.mongodb.net:27017,cluster0-shard-00-02.4shhm.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-tvwl45-shard-0&authSource=admin&retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);

  const db = client.db();

  const meetupsCollections = db.collection('meetups');

  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ({
      params: {
        meetupId: meetup._id.toString()
      }
    }))
  };
}

export async function getStaticProps(context) {
  // fetch data from a single meetup

  const { meetupId } = context.params;

  const uri = "mongodb://richirm:richirm333@cluster0-shard-00-00.4shhm.mongodb.net:27017,cluster0-shard-00-01.4shhm.mongodb.net:27017,cluster0-shard-00-02.4shhm.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-tvwl45-shard-0&authSource=admin&retryWrites=true&w=majority";
  const client = await MongoClient.connect(uri);

  const db = client.db();

  const meetupsCollections = db.collection('meetups');

  const selectedMeetup = await meetupsCollections.findOne({ _id: ObjectId(meetupId) });

  const { title, image, address, description } = selectedMeetup;

  client.close();

  return {
    props: {
      meetupData: {
        id: meetupId,
        image,
        title,
        address,
        description
      }
    }
  }
}

export default MeetupDetailsPage;