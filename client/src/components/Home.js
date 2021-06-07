import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faRetweet } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

import ReplyTweetModal from '../modals/ReplyTweetModal';
import { getTimeline } from '../actions/index';

const mapStateToProps = (state) => {
  return { token: state.token, timeline: state.timeline };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTimeline: (token) => dispatch(getTimeline(token)),
  }
};

const Home = ({ token, timeline, getTimeline }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTweet, setModalTweet] = useState('');

  useEffect(async () => {
    await getTimeline(token);
  }, [token]);

  const handleReply = (tweet) => {
    setModalTweet(tweet);
    setShowModal(true);
  };

  return (
    <div className="container w-1/2 flex flex-col border-r border-l border-gray-400">
      <div>
        {
          timeline?.map(data => (
            <div className="flex flex-row p-2 my-2 border-b border-gray-400">
              <div className="w-1/6">
                <div>
                  <img className="shadow-inner rounded-full h-16 w-16" src={'https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo'} />
                </div>
              </div>
              <div className="w-5/6">
                <Link key={data._id} to={`/${data.username}/status/${data._id}`}>
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
                  <span className="mx-4">
                    <FontAwesomeIcon icon={faRetweet} />
                  </span>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      <ReplyTweetModal displayModal={showModal} showModal={setShowModal} reply={modalTweet} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
