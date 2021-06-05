import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import ReplyTweetModal from '../modals/ReplyTweetModal';

const Status = ({ cookies }) => {
  const [tweet, setTweet] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { username, tweetId } = useParams();

  useEffect(async () => {
    const result = await axios(`http://localhost:5000/api/tweet/${username}/${tweetId}`);

    setTweet(result.data);
  }, []);

  const handleReply = () => {
    setShowModal(true);
  };

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
            <span className="font-bold hover:underline">
              <Link to={`/${tweet.username}`}>{tweet.userFullname} </Link>
            </span>
            <span className="font-bold">@{tweet.username}</span>
          </div>
        </div>

        {tweet?.parentTweet &&
          <>
            <span className="inline-block mb-4">{`Replying to @${tweet.parentTweet.username}`}</span>
            <br />
          </>
        }

        <span className="text-xl">{tweet.tweetText}</span>
        <br />
        <span className="">{dayjs(tweet.date).format('H.mm A · MMM D, YYYY')}</span>
        <br />
        <span onClick={handleReply}>R</span>
      </div>

      {tweet?.childTweet &&
        tweet.childTweet.map(t => {
          return (
            <div className="px-2">
              <div className="flex flex-row p-2 my-2 border-b-2 border-gray-400">
                <div className="w-1/6">
                  <div>
                    <img className="shadow-inner rounded-full h-16 w-16" src={'https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo'} />
                  </div>
                </div>
                <div className="w-5/6">
                  <span className="font-bold hover:underline">
                    <Link to={`/${t.username}`}>{t.userFullname} </Link>
                  </span>
                  <span>@{t.username} · {dayjs(t.date).format('MMM D, YYYY')}</span>
                  <br />
                  <span>{t.tweetText}</span>
                  <br />
                  <span>0</span>
                </div>
              </div>
            </div>
          );
        })
      }

      <ReplyTweetModal cookies={cookies} displayModal={showModal} showModal={setShowModal} reply={tweet} />
    </div>
  )
}

export default Status;
