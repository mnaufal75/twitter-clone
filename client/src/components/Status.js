import {
  faChartBar,
  faHeartbeat,
  faReply,
  faRetweet,
  faShare,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReplyTweetModal from "../modals/ReplyTweetModal";
import { retweet } from "../modals/RetweetModal";
import SingleTweet from "./SingleTweet";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const Status = ({ cookies, token }) => {
  const [tweet, setTweet] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTweet, setModalTweet] = useState("");

  const { username, tweetId } = useParams();

  useEffect(async () => {
    const result = await axios(
      `http://localhost:5000/api/tweet/${username}/${tweetId}`
    );

    setTweet(result.data);
  }, []);

  const handleReply = (tweet) => {
    setModalTweet(tweet);
    setShowModal(true);
  };

  const handleRetweet = (tweet) => {
    retweet(token, tweet);
  };

  return (
    <div className="container w-1/2 flex flex-col border-r border-l border-gray-200">
      <div className="px-2">
        <div className="flex flex-row pb-2">
          <div className="pr-4">
            <span className="text-3xl h-16 w-16">
              <FontAwesomeIcon icon={faUserCircle} />
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-bold hover:underline">
              <Link to={`/${tweet.username}`}>{tweet.userFullname} </Link>
            </span>
            <span className="font-bold">@{tweet.username}</span>
          </div>
        </div>

        {tweet?.parentTweet && (
          <div>
            <span className="inline-block mb-4">{`Replying to @${tweet.parentTweet.username}`}</span>
            <br />
          </div>
        )}

        <div className="mb-4">
          <span className="text-xl">{tweet.tweetText}</span>
        </div>

        <div className="mb-4">
          <span className="text-gray-500">
            {dayjs(tweet.date).format("H:mm A · MMM D, YYYY")}
          </span>
        </div>

        <div
          className="mt-4 flex justify-around p-2 border-y-[2px]"
          style={{
            borderTop: "1px",
            borderBottom: "1px",
            borderStyle: "solid",
            borderColor: "rgb(229, 231, 235)", // text-gray-200
          }}
        >
          <span onClick={() => handleReply(tweet)} className="cursor-pointer">
            <FontAwesomeIcon icon={faReply} />
            <span className="text-gray-500"> 393</span>
          </span>
          <span onClick={() => handleRetweet(tweet)} className="cursor-pointer">
            <FontAwesomeIcon icon={faRetweet} />
            <span className="text-gray-500"> 701</span>
          </span>
          <span onClick={() => {}} className="cursor-pointer">
            <FontAwesomeIcon icon={faHeartbeat} />
            <span className="text-gray-500"> 1,053</span>
          </span>
          <span onClick={() => {}} className="cursor-pointer">
            <FontAwesomeIcon icon={faChartBar} />
            <span className="text-gray-500"> 39K</span>
          </span>
          <span onClick={() => {}} className="cursor-pointer">
            <FontAwesomeIcon icon={faShare} />
          </span>
        </div>
      </div>

      {tweet?.childTweet &&
        tweet.childTweet.map((t) => {
          return (
            <SingleTweet
              key={t._id}
              tweet={t}
              handleReply={handleReply}
              handleRetweet={handleRetweet}
              usernameProfile={t.username}
            />
          );
        })}

      <ReplyTweetModal
        cookies={cookies}
        displayModal={showModal}
        showModal={setShowModal}
        reply={modalTweet}
      />
    </div>
  );
};

export default connect(mapStateToProps)(Status);
