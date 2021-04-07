import { useState } from 'react';
import CreateTweetModal from '../modals/CreateTweetModal';

const LeftBar = ({ cookies }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container w-1/4 flex flex-col">
      <span>Home</span>
      <span>Explore</span>
      <span>Notifications</span>
      <span>Messages</span>
      <span>Bookmark</span>
      <span>Lists</span>
      <span>Profile</span>
      <span>More</span>
      <button onClick={() => setShowModal(!showModal)}>Tweet</button>

      <CreateTweetModal cookies={cookies} displayModal={showModal} showModal={setShowModal} />
    </div>
  )
}

export default LeftBar;
