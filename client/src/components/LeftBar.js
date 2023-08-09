import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
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
    <div className="container w-1/4 h-screen flex flex-col justify-between pl-16 pr-4">
      <div>
        <div className="twitter-icon py-4">
          <span className="mx-4 cursor-pointer text-3xl">
            <FontAwesomeIcon icon={faTwitter} />
          </span>
        </div>

        <div className="top-0 flex flex-col">
          <span className="my-2 text-lg">
            <Link to="/home">Home</Link>
          </span>
          <span className="my-2 text-lg">
            <Link to="#">Explore</Link>
          </span>
          <span className="my-2 text-lg">
            <Link to="#">Notifications</Link>
          </span>
          <span className="my-2 text-lg">
            <Link to="#">Messages</Link>
          </span>
          <span className="my-2 text-lg">
            <Link to="#">Bookmark</Link>
          </span>
          <span className="my-2 text-lg">
            <Link to="#">Lists</Link>
          </span>
          <span className="my-2 text-lg">
            <Link to="#">Profile</Link>
          </span>
          <span className="my-2 text-lg">
            <Link to="#">More</Link>
          </span>
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
