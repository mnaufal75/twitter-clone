import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const Profile = ({ cookies }) => {
  const [datas, setDatas] = useState([]);
  const [followed, setFollowed] = useState(false);

  const { username } = useParams();

  useEffect(async () => {
    const result = await axios(`http://localhost:5000/api/tweets/${username}`);

    setDatas(result.data);
  }, [datas]);

  useEffect(async () => {
    const usernameCookie = cookies.get('username');

    const result = await axios(`http://localhost:5000/api/user/${usernameCookie}/follow`);
    const followingList = result?.data?.following?.filter(f => (f.username === username));

    // If followingList.length === 0, it means not followed
    setFollowed(!(followingList.length === 0));
  }, []);

  const followAccount = async (account) => {
    const usernameCookie = cookies.get('username');
    let query = {}
    if (followed === false) {
      query = {
        username: usernameCookie,
        follow: true,
        unfollow: false,
      };
    } else {
      query = {
        username: usernameCookie,
        follow: false,
        unfollow: true,
      };
    }
    await axios.post(`http://localhost:5000/api/user/${account}/follow`, query);
    await setFollowed(!followed);
  };

  return (
    <div className="container w-1/2 flex flex-col border-r-2 border-l-2 border-gray-400">
      <div className="px-2 py-32">
        <img
          className="rounded-full shadow-inner my-2 h-32 w-32"
          src="https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo" />
        <span className="font-bold">{datas.userFullname}</span>
        <br />
        <div className="flex justify-between">
          <span>@{datas.username}</span>
          <button
            className="m-2 p-2 rounded-full bg-blue-400 text-white text-lg"
            onClick={() => followAccount(datas.username)}>{followed ? "Unfollow" : "Follow"}
          </button>
        </div>
        <span>Joined August 2011</span>
        <br />
        <span>{datas?.following?.length} Following {datas?.followers?.length} Follower</span>
      </div>
      {datas?.tweets?.map((data) => {
        return (
          <Link key={data._id} to={`/${username}/status/${data._id}`}>
            <div className="flex flex-row p-2 my-2 border-b-2 border-gray-400">
              <div className="w-1/6">
                <div>
                  <img className="shadow-inner rounded-full h-16 w-16" src={'https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo'} />
                </div>
              </div>
              <div className="w-5/6">
                <span className="font-bold hover:underline">
                  <Link to={`/${data.username}`}>{data.userFullname} </Link>
                </span>
                <span>@{data.username} · {dayjs(data.date).format('MMM D, YYYY')}</span>
                <br />
                <span>{data.tweetText}</span>
                <br />
                <span>0</span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Profile;
