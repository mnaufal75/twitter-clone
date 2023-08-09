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
    <div className="left-bar w-[150px] xl:min-w-[320px] h-screen hidden sm:flex flex-col justify-between pl-16 pr-4">
      <div className="w-full">
        <div className="left-bar__icon twitter-icon py-4">
          <span className="mx-4 cursor-pointer text-3xl">
            <FontAwesomeIcon icon={faTwitter} />
          </span>
        </div>

        <div className="left-bar__navigation flex flex-col">
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faHome} className="mr-4" />
              <Link to="/home" className="hidden xl:inline">
                Home
              </Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-4" />
              <Link to="#" className="hidden xl:inline">
                Explore
              </Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faBell} className="mr-4" />
              <Link to="#" className="hidden xl:inline">
                Notifications
              </Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faMessage} className="mr-4" />
              <Link to="#" className="hidden xl:inline">
                Messages
              </Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faList} className="mr-4" />
              <Link to="#" className="hidden xl:inline">
                Lists
              </Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faUsers} className="mr-4 text-sm" />
              <Link to="#" className="hidden xl:inline">
                Bookmark
              </Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faBookmark} className="mr-4" />
              <Link to="#" className="hidden xl:inline">
                Communities
              </Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faCheck} className="mr-4" />
              <Link to="#" className="hidden xl:inline">
                Verified
              </Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faUser} className="mr-4" />
              <Link to="#" className="hidden xl:inline">
                Profile
              </Link>
            </span>
          </div>
          <div className="my-2 p-2">
            <span className="p-4 text-lg rounded-full hover:bg-gray-200 hover:rounded-2xl">
              <FontAwesomeIcon icon={faEllipsis} className="mr-4" />
              <Link to="#" className="hidden xl:inline">
                More
              </Link>
            </span>
          </div>
          <button
            className="my-2 px-4 py-2 w-full rounded-full bg-blue-400 text-white text-lg hidden xl:inline"
            onClick={() => setShowModal(!showModal)}
          >
            Post
          </button>
        </div>
      </div>

      <div className="left-bar__profile flex p-2 justify-between items-center">
        <div className="flex">
          <div className="mr-4">
            <span className="text-5xl h-16 w-16">
              <FontAwesomeIcon icon={faUserCircle} />
            </span>
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="font-bold">
              <Link to={`/${username}`}>{userFullname}</Link>
            </span>
            <span className="text-gray-500">@{username}</span>
          </div>
        </div>

        <div className="hidden xl:block cursor-pointer" onClick={handleLogout}>
          <FontAwesomeIcon icon={faEllipsis} />
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
