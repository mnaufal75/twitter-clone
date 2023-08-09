import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { connect } from "react-redux";

import { createTweet } from "../actions";
import ReplyTweetModal from "../modals/ReplyTweetModal";
import { retweet } from "../modals/RetweetModal";
import SingleTweet from "./SingleTweet";

const mapStateToProps = (state) => {
  return { token: state.token, timeline: state.timeline };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTweet: (query) => dispatch(createTweet(query)),
  };
};

const Home = ({ token, timeline, createTweet }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTweet, setModalTweet] = useState("");
  const [tweetText, setTweetText] = useState("");

  const handleReply = (tweet) => {
    setModalTweet(tweet);
    setShowModal(true);
  };

  const handleRetweet = (tweet) => {
    retweet(token, tweet);
  };

  const handleChange = (e) => {
    setTweetText(e.target.value);
  };

  const handleFocus = (e) => {
    // https://www.w3docs.com/snippets/html/how-to-set-the-size-of-the-textarea-element.html
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + 10 + "px";
  };

  const handleTweet = async (e) => {
    const query = {
      tweetText: tweetText,
    };
    setTweetText("");
    await createTweet({ token, query });
  };

  return (
    <div
      className="home container flex flex-col border-r border-l border-gray-200"
      style={{ width: "600px" }}
    >
      <div className="home__title font-bold text-xl p-4">Home</div>

      <div className="home__tweet-box flex flex-row p-2 my-2 border-b border-gray-200 w-full">
        <div className="mr-4">
          <span className="text-3xl h-16 w-16">
            <FontAwesomeIcon icon={faUserCircle} />
          </span>
        </div>

        <div className="w-full flex flex-col">
          <div className="w-full border-b border-gray-200">
            <textarea
              className="w-full p-4 leading-6 resize-none outline-none text-lg"
              placeholder="What is happening?!"
              onInput={handleFocus}
              onChange={handleChange}
              value={tweetText}
            />
          </div>

          <div className="self-end">
            <button
              className="my-2 px-4 py-2 w-full rounded-full bg-blue-400 text-white text-base"
              onClick={handleTweet}
            >
              Post
            </button>
          </div>
        </div>
      </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
