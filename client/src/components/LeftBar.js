import { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CreateTweetModal from '../modals/CreateTweetModal';
import { logout } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    username: state.username,
    userFullname: state.userFullname,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

const LeftBar = ({ cookies, username, userFullname }) => {
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const handleLogout = () => {
    cookies.set('token', '', { path: '/' });
    logout();
    history.push('/login');
  };

  return (
    <div className="container w-1/4 h-full flex flex-col">
      <div className="fixed top-0 flex flex-col">
        <span className="my-2 text-lg"><Link to="/home">Home</Link></span>
        <span className="my-2 text-lg"><Link to="#">Explore</Link></span>
        <span className="my-2 text-lg"><Link to="#">Notifications</Link></span>
        <span className="my-2 text-lg"><Link to="#">Messages</Link></span>
        <span className="my-2 text-lg"><Link to="#">Bookmark</Link></span>
        <span className="my-2 text-lg"><Link to="#">Lists</Link></span>
        <span className="my-2 text-lg"><Link to="#">Profile</Link></span>
        <span className="my-2 text-lg"><Link to="#">More</Link></span>
        <button className="my-2 px-2 w-full rounded-full bg-blue-400 text-white text-lg" onClick={() => setShowModal(!showModal)}>Tweet</button>
      </div>

      <div className="fixed flex flex-row bottom-0">
        <div className="flex-0 m-2">
          <img
            className="rounded-full shadow-inner h-16 w-16"
            src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/sign-right-icon.png" />
        </div>
        <div className="flex-1 m-2">
          <span className="font-bold">
            <Link to={`/${username}`}>{userFullname} </Link>
          </span>
          <br />
          <span className="">@{username}</span>
          <br />
          <button className="mt-4 p-2 rounded-full bg-blue-400 text-white text-lg" onClick={handleLogout}>LOGOUT</button>
        </div>
      </div>

      <CreateTweetModal cookies={cookies} displayModal={showModal} showModal={setShowModal} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);
