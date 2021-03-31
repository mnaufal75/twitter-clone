import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const Profile = () => {
  const [datas, setDatas] = useState([]);

  const { username } = useParams();

  useEffect(async () => {
    const result = await axios(`http://localhost:5000/api/tweets/${username}`);

    setDatas(result.data);
  }, [datas]);

  return (
    <div className="container w-1/2 flex flex-col border-r-2 border-l-2 border-gray-400">
      <div className="px-2 py-32">
        <img
          className="rounded-full shadow-inner my-2 h-32 w-32"
          src="https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo" />
        <span className="font-bold">Muhammad Naufal</span>
        <br />
        <span>@mnaufal75</span>
        <br />
        <span>Joined August 2011</span>
        <br />
        <span>0 Following 8 Follower</span>
      </div>
      {datas?.tweets?.map((data) => {
        return (
          <div className="flex flex-row p-2 my-2 border-b-2 border-gray-400">
            <div className="w-1/6">
              <div>
                <img className="shadow-inner rounded-full h-16 w-16" src={'https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo'} />
              </div>
            </div>
            <div className="w-5/6">
              <span className="font-bold">{datas.name} </span>
              <span>@{datas.username} · {dayjs(data.date).format('MMM D, YYYY')}</span>
              <br />
              <span>{data.text}</span>
              <br />
              <span>0</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Profile;
