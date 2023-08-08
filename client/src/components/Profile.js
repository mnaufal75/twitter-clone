import {
  faBell,
  faCalendar,
  faChartBar,
  faEllipsisH,
  faHeartbeat,
  faReply,
  faRetweet,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReplyTweetModal from "../modals/ReplyTweetModal";
import { retweet } from "../modals/RetweetModal";

const mapStateToProps = (state) => {
  return { token: state.token, username: state.username };
};

const Profile = ({ cookies, token, username }) => {
  const [datas, setDatas] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tweet, setTweet] = useState("");

  const usernameProfile = useParams().username;

  useEffect(() => {
    (async () => {
      const result = await axios(
        `http://localhost:5000/api/tweet/${usernameProfile}`
      );
      setDatas(result.data);
    })();
  }, [datas]);

  useEffect(() => {
    (async () => {
      const result = await axios(
        `http://localhost:5000/api/user/${usernameProfile}/follow`
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

  const handleRetweet = (tweet) => {
    retweet(token, tweet);
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
    await axios.post(
      `http://localhost:5000/api/user/${username}/follow`,
      query,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setFollowed(!followed);
  };

  return (
    <div className="container w-1/2 h-auto flex flex-col border-r border-l border-gray-400">
      <div className="home__header">
        <div className="home__banner bg-gray-300 h-48 w-full"></div>

        <div className="p-4">
          <div className="flex flex-row items-end justify-between h-12 mb-4">
            <div>
              <img
                className="rounded-full"
                src="https://pbs.twimg.com/profile_images/1585133755185778689/y09UYQFQ_400x400.jpg"
                height={"120px"}
                width={"120px"}
                alt="profile"
              />
            </div>

            <div className="home__button flex flex-row">
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

          <div className="home__description">
            <div className="mb-4">
              <div className="home__userFullname font-bold text-2xl">
                {datas.userFullname}
              </div>
              <div className="home__username text-gray-500">
                @{datas.username}
              </div>
            </div>

            <div className="home__description-detail mb-4">
              BOOM Esports's Official Twitter Account! Home of DOTA2, VALORANT
              and PUBGM teams. Inquiries/Contact: business@boomesports.gg
            </div>

            <div className="home__joined-date mb-4">
              <span>
                <FontAwesomeIcon icon={faCalendar} />
              </span>
              <span className="text-gray-500">{` Joined May 2017`}</span>
            </div>

            <div className="home__follow-count">
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

      {datas?.tweets?.map((data) => {
        return (
          <div className="flex flex-row p-2 my-2 border-b border-gray-400">
            <div className="w-1/6">
              <div>
                <img
                  className="shadow-inner rounded-full h-16 w-16"
                  src={
                    "https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-right-icon.png"
                  }
                />
              </div>
            </div>
            <div className="w-5/6">
              <Link
                key={data._id}
                to={`/${usernameProfile}/status/${data._id}`}
              >
                <span className="font-bold hover:underline">
                  <Link to={`/${data.username}`}>{data.userFullname} </Link>
                </span>
                <span>
                  @{data.username} · {dayjs(data.date).format("MMM D, YYYY")}
                </span>
                <br />
                <span>{data.tweetText}</span>
                <br />
              </Link>
              <div className="mt-4 flex justify-between">
                <span
                  onClick={() => handleReply(data)}
                  className="mx-4 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faReply} />
                </span>
                <span
                  onClick={() => handleRetweet(data)}
                  className="mx-4 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faRetweet} />
                </span>
                <span onClick={() => {}} className="mx-4 cursor-pointer">
                  <FontAwesomeIcon icon={faHeartbeat} />
                </span>
                <span onClick={() => {}} className="mx-4 cursor-pointer">
                  <FontAwesomeIcon icon={faChartBar} />
                </span>
                <span onClick={() => {}} className="mx-4 cursor-pointer">
                  <FontAwesomeIcon icon={faShare} />
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <ReplyTweetModal
        cookies={cookies}
        displayModal={showModal}
        showModal={setShowModal}
        reply={tweet}
      />
    </div>
  );
};

export default connect(mapStateToProps)(Profile);
