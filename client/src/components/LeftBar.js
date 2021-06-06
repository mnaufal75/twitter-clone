import { useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';

import CreateTweetModal from '../modals/CreateTweetModal';
import { logout } from '../actions/index';

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  }
}

const LeftBar = ({ cookies }) => {
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <div className="container w-1/4 h-full flex flex-col">
      <span>Home</span>
      <span>Explore</span>
      <span>Notifications</span>
      <span>Messages</span>
      <span>Bookmark</span>
      <span>Lists</span>
      <span>Profile</span>
      <span>More</span>
      <button onClick={() => setShowModal(!showModal)}>Tweet</button>

      <div className="flex flex-row absolute bottom-0">
        <div className="flex-0 m-2">
          <img
            className="rounded-full shadow-inner h-16 w-16"
            src="https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo" />
        </div>
        <div className="flex-1 m-2">
          <span className="font-bold">mnaufal75</span>
          <br />
          <span className="">@mnaufal75</span>
          <br />
          <button className="mt-4 p-2 rounded-full bg-blue-400 text-white text-lg" onClick={handleLogout}>LOGOUT</button>
        </div>
      </div>

      <CreateTweetModal cookies={cookies} displayModal={showModal} showModal={setShowModal} />
    </div>
  )
}

export default connect(null, mapDispatchToProps)(LeftBar);
