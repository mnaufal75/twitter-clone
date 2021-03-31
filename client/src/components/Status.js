import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const Status = () => {
  const [user, setUser] = useState('');
  const [tweet, setTweet] = useState('');

  const { username, tweetId } = useParams();

  useEffect(async () => {
    const result = await axios(`http://localhost:5000/api/tweets/${username}/${tweetId}`);

    setUser(result.data.user);
    setTweet(result.data.tweet);
  }, [user, tweet]);

  return (
    <div className="container w-1/2 flex flex-col border-r-2 border-l-2 border-gray-400">
      <div className="px-2">
        <div className="flex flex-row pb-2">
          <div>
            <img
              className="rounded-full shadow-inner my-2 mr-2 h-16 w-16"
              src="https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold">{user.name} </span>
            <span className="font-bold">@{user.username}</span>
          </div>
        </div>

        <span className="text-xl">{tweet.text}</span>
        <br />
        <span className="">{dayjs(tweet.date).format('H.mm A · MMM D, YYYY')}</span>
      </div>
    </div>
  )
}

export default Status;
