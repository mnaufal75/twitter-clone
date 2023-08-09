import {
  faChartBar,
  faHeartbeat,
  faReply,
  faRetweet,
  faShare,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return { token: state.token, username: state.username };
};

const SingleTweet = ({
  tweet,
  handleReply,
  handleRetweet,
  usernameProfile,
}) => {
  return (
    <div className="flex flex-row p-2 my-2 border-b border-gray-200 w-full">
      <div className="pr-4">
        <span className="text-3xl h-16 w-16">
          <FontAwesomeIcon icon={faUserCircle} />
        </span>
      </div>
      <div className="w-full">
        <Link to={`/${usernameProfile}/status/${tweet._id}`}>
          <div>
            <span className="font-bold hover:underline">
              <Link to={`/${tweet.username}`}>{tweet.userFullname} </Link>
            </span>
            <span className="text-gray-500">
              @{tweet.username} · {dayjs(tweet.date).format("MMM D, YYYY")}
            </span>
          </div>
          <div>
            <span>{tweet.tweetText}</span>
          </div>
        </Link>

        <div className="mt-4 flex justify-between">
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
    </div>
  );
};

export default connect(mapStateToProps)(SingleTweet);
