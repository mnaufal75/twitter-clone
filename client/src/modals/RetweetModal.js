import { useState } from 'react';
import axios from 'axios';

export const retweet = async (token, reply) => {
  const result = await axios.post(`http://localhost:5000/api/tweet/${reply._id}/retweet`, null, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return result;
};

const RetweetModal = ({ }) => {
  const [tweetText, setTweetText] = useState('');

  return <></>
};

export default RetweetModal;
