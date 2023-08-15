import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faBell,
  faCalendar,
  faEllipsisH,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { getProfileTimeline, retweet } from "../actions";
import CreateTweetModal from "../modals/CreateTweetModal";
import SingleTweet from "./SingleTweet";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
    profileTimeline: state.profileTimeline,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileTimeline: (query) => dispatch(getProfileTimeline(query)),
    retweet: (query) => dispatch(retweet(query)),
  };
};

const Profile = ({
  token,
  username,
  profileTimeline,
  getProfileTimeline,
  retweet,
}) => {
  const [datas, setDatas] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tweet, setTweet] = useState("");

  const history = useHistory();
  const API_ENDPOINT =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_ENDPOINT
      : process.env.REACT_APP_PROD_ENDPOINT;

  const usernameProfile = useParams().username;

  useEffect(() => {
    (async () => {
      await getProfileTimeline(token);
    })();
  }, [token]);

  useEffect(() => {
    (async () => {
      const result = await axios(`${API_ENDPOINT}/tweet/${usernameProfile}`);
      setDatas(result.data);
    })();
  }, [datas]);

  useEffect(() => {
    (async () => {
      const result = await axios(
        `${API_ENDPOINT}/user/${usernameProfile}/follow`
      );
      const followingList = result?.data?.followers?.filter(
        (f) => f.username === username
      );

      // If followingList.length === 0, it means not followed
      setFollowed(!(followingList.length === 0));
    })();
  }, [username]);

  const handleReply = (data) => {
    setShowModal(true);
    setTweet(data);
  };

  const handleRetweet = async (tweet) => {
    retweet({ token, tweet });
  };

  const followAccount = async (username) => {
    let query = {};
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
    await axios.post(`${API_ENDPOINT}/user/${username}/follow`, query, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFollowed(!followed);
  };

  return (
    <div className="profile w-full sm:max-w-[500px] h-auto flex flex-col border-r border-l border-gray-200">
      <div className="profile__title font-bold text-xl p-4">
        <span className="cursor-pointer mr-4" onClick={history.goBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <span>{datas.userFullname}</span>
      </div>

      <div className="profile__header">
        <div className="profile__banner bg-gray-300 h-48 w-full"></div>

        <div className="p-4">
          <div className="flex flex-row items-end justify-between h-12 mb-4">
            <div className="profile__profile-image bg-white rounded-full p-4">
              <span className="text-8xl">
                <FontAwesomeIcon icon={faUserCircle} />
              </span>
            </div>

            <div className="profile__button flex flex-row">
              {username !== usernameProfile && (
                <>
                  <span className="rounded-full border-2 w-10 h-10 flex justify-center items-center mr-2">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </span>
                  <span className="rounded-full border-2 w-10 h-10 flex justify-center items-center mr-2">
                    <FontAwesomeIcon icon={faRetweet} />
                  </span>
                  <span className="rounded-full border-2 w-10 h-10 flex justify-center items-center mr-2">
                    <FontAwesomeIcon icon={faBell} />
                  </span>
                  <button
                    className={`rounded-3xl border-2 h-10 p-2 flex justify-center items-center font-bold ${
                      followed
                        ? "bg-white text-blue-400"
                        : "bg-blue-400 text-white border-blue-400"
                    }`}
                    onClick={() => followAccount(datas.username)}
                  >
                    {followed ? "Following" : "Follow"}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="profile__description">
            <div className="mb-4">
              <div className="profile__userFullname font-bold text-2xl">
                {datas.userFullname}
              </div>
              <div className="profile__username text-gray-500">
                @{datas.username}
              </div>
            </div>

            <div className="profile__description-detail mb-4">
              BOOM Esports's Official Twitter Account! Home of DOTA2, VALORANT
              and PUBGM teams. Inquiries/Contact: business@boomesports.gg
            </div>

            <div className="profile__joined-date mb-4">
              <span>
                <FontAwesomeIcon icon={faCalendar} />
              </span>
              <span className="text-gray-500">{` Joined May 2017`}</span>
            </div>

            <div className="profile__follow-count">
              <span className="mr-4">
                {/* <span className="font-bold">{datas?.following?.length}</span>{" "} */}
                <span className="font-bold">352</span>{" "}
                <span className="text-gray-500">Following</span>
              </span>
              <span>
                {/* <span className="font-bold">{datas?.followers?.length}</span>{" "} */}
                <span className="font-bold">77.4K</span>{" "}
                <span className="text-gray-500">Followers</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {profileTimeline.map((t) => {
        return (
          <SingleTweet
            key={t._id}
            tweet={t.tweet}
            handleReply={handleReply}
            handleRetweet={() => handleRetweet(t.tweet)}
            usernameProfile={usernameProfile}
            isRetweet={t.type === "retweet"}
          />
        );
      })}

      <CreateTweetModal
        displayModal={showModal}
        showModal={setShowModal}
        parentTweet={tweet}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
