import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    try {
      const { title, image, address, description } = enteredMeetupData;
      const response = await fetch('/api/new-meetup', {
        method: 'POST',
        body: JSON.stringify({
          title,
          image,
          address,
          description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json();

      router.push('/' + responseData.id);
    } catch (e) {

    }
  };

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities. "
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;