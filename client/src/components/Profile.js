import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faRetweet } from '@fortawesome/free-solid-svg-icons';
import ReplyTweetModal from '../modals/ReplyTweetModal';

const mapStateToProps = (state) => {
  return { username: state.username };
};

const Profile = ({ cookies, username }) => {
  const [datas, setDatas] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tweet, setTweet] = useState('');

  const usernameProfile = useParams().username;

  useEffect(async () => {
    const result = await axios(`http://localhost:5000/api/tweet/${usernameProfile}`);

    setDatas(result.data);
  }, [datas]);

  useEffect(async () => {
    const result = await axios(`http://localhost:5000/api/user/${usernameProfile}/follow`);
    const followingList = result?.data?.following?.filter(f => (f.username === username));

    // If followingList.length === 0, it means not followed
    setFollowed(!(followingList.length === 0));
  }, []);

  const handleReply = (data) => {
    setShowModal(true);
    setTweet(data);
  };

  const followAccount = async (username) => {
    let query = {}
    if (followed === false) {
      query = {
        username: username,
        follow: true,
        unfollow: false,
      };
    } else {
      query = {
        username: username,
        follow: false,
        unfollow: true,
      };
    }
    await axios.post(`http://localhost:5000/api/user/${username}/follow`, query);
    await setFollowed(!followed);
  };

  return (
    <div className="container w-1/2 h-auto flex flex-col border-r border-l border-gray-400">
      <div className="px-2 py-32">
        <img
          className="rounded-full shadow-inner my-2 h-32 w-32"
          src="https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo" />
        <span className="font-bold">{datas.userFullname}</span>
        <br />
        <div className="flex justify-between">
          <span>@{datas.username}</span>
          <button
            className="m-2 p-2 rounded-full bg-blue-400 text-white text-lg"
            onClick={() => followAccount(datas.username)}>{followed ? "Unfollow" : "Follow"}
          </button>
        </div>
        <span>Joined August 2011</span>
        <br />
        <span>{datas?.following?.length} Following {datas?.followers?.length} Follower</span>
      </div>
      {datas?.tweets?.map((data) => {
        return (
          <div className="flex flex-row p-2 my-2 border-b border-gray-400">
            <div className="w-1/6">
              <div>
                <img className="shadow-inner rounded-full h-16 w-16" src={'https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo'} />
              </div>
            </div>
            <div className="w-5/6">
              <Link key={data._id} to={`/${usernameProfile}/status/${data._id}`}>
                <span className="font-bold hover:underline">
                  <Link to={`/${data.username}`}>{data.userFullname} </Link>
                </span>
                <span>@{data.username} · {dayjs(data.date).format('MMM D, YYYY')}</span>
                <br />
                <span>{data.tweetText}</span>
                <br />
              </Link>
              <div className="mt-4">
                <span onClick={() => handleReply(data)} className="mx-4">
                  <FontAwesomeIcon icon={faReply} />
                </span>
                {/* <span onClick={handleReply}> */}
                <span className="mx-4">
                  <FontAwesomeIcon icon={faRetweet} />
                </span>
              </div>
            </div>
          </div>
        )
      })}

      <ReplyTweetModal cookies={cookies} displayModal={showModal} showModal={setShowModal} reply={tweet} />
    </div>
  )
}

export default connect(mapStateToProps)(Profile);
