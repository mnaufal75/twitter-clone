import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faBookmark,
  faMessage,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faEllipsis,
  faHome,
  faList,
  faMagnifyingGlass,
  faUserCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../actions/index";
import CreateTweetModal from "../modals/CreateTweetModal";

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userFullname: state.userFullname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

const LeftBar = ({ cookies, username, userFullname, logout }) => {
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();

    try {
      cookies.set("token", "", { path: "/" });
      logout();
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="left-bar container h-screen flex flex-col justify-between pl-16 pr-4"
      style={{ width: "320px" }}
    >
      <div>
        <div className="left-bar__icon twitter-icon py-4">
          <span className="mx-4 cursor-pointer text-3xl">
            <FontAwesomeIcon icon={faTwitter} />
          </span>
        </div>

        <div className="left-bar__navigation flex flex-col">
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faHome} className="mr-4" />
              <Link to="/home">Home</Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-4" />
              <Link to="#">Explore</Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faBell} className="mr-4" />
              <Link to="#">Notifications</Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faMessage} className="mr-4" />
              <Link to="#">Messages</Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faList} className="mr-4" />
              <Link to="#">Lists</Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faUsers} className="mr-4 text-sm" />
              <Link to="#">Bookmark</Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faBookmark} className="mr-4" />
              <Link to="#">Communities</Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faCheck} className="mr-4" />
              <Link to="#">Verified</Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faUser} className="mr-4" />
              <Link to="#">Profile</Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faEllipsis} className="mr-4" />
              <Link to="#">More</Link>
            </span>
          </div>
          <button
            className="my-2 px-4 py-2 w-full rounded-full bg-blue-400 text-white text-lg"
            onClick={() => setShowModal(!showModal)}
          >
            Post
          </button>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex-0 m-2">
          <div>
            <span className="text-6xl h-16 w-16">
              <FontAwesomeIcon icon={faUserCircle} />
            </span>
          </div>
        </div>
        <div className="flex-1 m-2">
          <span className="font-bold">
            <Link to={`/${username}`}>{userFullname} </Link>
          </span>
          <br />
          <span className="">@{username}</span>
          <br />
          <button
            className="mt-4 p-2 rounded-full bg-blue-400 text-white text-lg"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>
      </div>

      <CreateTweetModal
        cookies={cookies}
        displayModal={showModal}
        showModal={setShowModal}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
