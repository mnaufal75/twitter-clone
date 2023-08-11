import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { connect } from "react-redux";

import { createTweet } from "../actions";
import CreateTweetModal from "../modals/CreateTweetModal";
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
    // retweet(token, tweet);
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
    if (tweetText.length !== 0) {
      const query = {
        tweetText: tweetText,
      };
      setTweetText("");
      await createTweet({ token, query });
    }
  };

  return (
    // TODO: Make left bar and right bat fixed at place
    <div className="home w-full sm:max-w-[500px] flex flex-col border-r border-l border-gray-200">
      <div className="home__title font-bold text-xl p-4">Home</div>

      <div className="home__tweet-box sm:flex flex-row p-2 my-2 border-b border-gray-200 hidden w-full">
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
              className={`my-2 px-4 py-2 w-full rounded-full text-white text-base ${
                tweetText.length === 0 ? "disabled bg-blue-100" : "bg-blue-400"
              }`}
              onClick={handleTweet}
            >
              Post
            </button>
          </div>
        </div>
      </div>

      <div>
        {timeline?.map((timelineTweet) => {
          return (
            <SingleTweet
              key={timelineTweet._id}
              tweet={timelineTweet.tweet}
              handleReply={handleReply}
              handleRetweet={handleRetweet}
              usernameProfile={timelineTweet.tweet.username}
              isRetweet={timelineTweet.type === "retweet"}
            />
          );
        })}
      </div>

      <CreateTweetModal
        displayModal={showModal}
        showModal={setShowModal}
        parentTweet={modalTweet}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
