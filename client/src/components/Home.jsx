import { useState } from "react";
import { connect } from "react-redux";

import ReplyTweetModal from "../modals/ReplyTweetModal";
import { retweet } from "../modals/RetweetModal";
import SingleTweet from "./SingleTweet";

const mapStateToProps = (state) => {
  return { token: state.token, timeline: state.timeline };
};

const Home = ({ token, timeline }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTweet, setModalTweet] = useState("");

  const handleReply = (tweet) => {
    setModalTweet(tweet);
    setShowModal(true);
  };

  const handleRetweet = (tweet) => {
    retweet(token, tweet);
  };

  return (
    <div
      className="home container flex flex-col border-r border-l border-gray-200"
      style={{ width: "600px" }}
    >
      <div className="home__title font-bold text-xl p-4">Home</div>

      <div>
        {timeline?.map((tweet) => {
          return (
            <SingleTweet
              key={tweet._id}
              tweet={tweet}
              handleReply={handleReply}
              handleRetweet={handleRetweet}
              usernameProfile={tweet.username}
            />
          );
        })}
      </div>

      <ReplyTweetModal
        displayModal={showModal}
        showModal={setShowModal}
        reply={modalTweet}
      />
    </div>
  );
};

export default connect(mapStateToProps)(Home);
