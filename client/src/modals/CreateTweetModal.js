import { faUserCircle, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { connect } from "react-redux";

import { createTweet } from "../actions";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTweet: (query) => dispatch(createTweet(query)),
  };
};

const CreateTweetModal = ({ displayModal, showModal, token, createTweet }) => {
  const [tweetText, setTweetText] = useState("");

  const toggleModal = () => {
    showModal(!displayModal);
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
      showModal(!displayModal);
      await createTweet({ token, query });
    }
  };

  return (
    <div
      className={`modal flex flex-col bg-white border border-gray-500 fixed top-[5%] left-0 right-0 p-4 rounded-2xl w-[500px] min-h-[200px] my-0 mx-auto ${
        displayModal ? "block" : "hidden"
      }`}
    >
      <div className="modal__close-button">
        <span className="cursor-pointer" onClick={toggleModal}>
          <FontAwesomeIcon icon={faX} />
        </span>
      </div>

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
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTweetModal);
