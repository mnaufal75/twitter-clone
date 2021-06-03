import { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const ReplyTweetModal = ({ cookies, displayModal, showModal, reply }) => {
  const [tweetText, setTweetText] = useState('');

  const toggleModal = () => {
    showModal(!displayModal);
  };

  const handleInput = (e) => {
    setTweetText(e.target.value);
  };

  const publishTweet = async () => {
    const username = cookies.get('username');
    const query = {
      "username": username,
      "tweetText": tweetText,
      "parentTweet": reply._id,
    };
    setTweetText('');
    showModal(!displayModal);
    await axios.post(`http://localhost:5000/api/tweets/${username}`, query);
  };

  return (
    <div
      className={`modal absolute bg-white p-2 border-2 border-black top-1/2 left-1/2 ${displayModal ? 'block' : 'hidden'}`}
      style={{ width: '500px', minHeight: '200px', marginRight: '-50%', transform: 'translate(-50%, -50%)' }}>
      <div className="modal-content">
        <span className="close" onClick={toggleModal}>&times;</span>
        <br />

        {reply &&
          <div className="grid grid-cols-8">
            <img
              className="rounded-full shadow-inner m-1 col-span-2"
              src="https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo" />
            <div className="col-span-6">
              <span className="font-bold">{reply?.userFullname} </span>
              <span>@{reply?.username}  · {dayjs(reply?.date).format('MMM D, YYYY')}</span>
              <br />
              <span>{reply?.tweetText}</span>
            </div>
          </div>
        }

        <div className="grid grid-cols-8 mb-16">
          <img
            className="rounded-full shadow-inner m-1 col-span-2"
            src="https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo" />
          <textarea type="text" name="tweetText"
            className="w-full h-full p-2 col-span-6 resize-none text-xl" placeholder="Add another Tweet" onChange={handleInput} value={tweetText}>
          </textarea>
        </div>

        <button className="absolute right-0 bottom-0 m-2 p-2 rounded-full bg-blue-400 text-white text-lg" onClick={publishTweet}>Tweet</button>
      </div >
    </div >
  )
};

export default ReplyTweetModal;