import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { followUser } from "../actions";

const mapStateToProps = (state) => {
  return { token: state.token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    followUser: (query) => dispatch(followUser(query)),
  };
};
const RigthBar = ({ token, followUser }) => {
  const listOfSuggestion = [
    {
      name: "Elon Musk",
      username: "elonmusk",
    },
    {
      name: "Bill Gates",
      username: "BillGates",
    },
    {
      name: "Legion",
      username: "legion",
    },
  ];

  const handleFollow = (username) => {
    followUser({ token, username });
  };

  return (
    <div className="right-bar min-w-[370px] h-screen sticky top-0 hidden lg:block p-4">
      <div className="right-bar__suggestion-box rounded-lg m-4 p-4 bg-gray-100">
        <div className="mb-4">
          <span className="right-bar__title text-2xl mb-4 font-bold">
            You might like
          </span>
        </div>
        <div className="right-bar__suggestion-list">
          {listOfSuggestion.map((item) => {
            return (
              <Link key={item.username} to={`/${item.username}`}>
                <div className="flex justify-between p-4">
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-gray-500">@{item.username}</span>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-blue-400 rounded-lg text-base text-white h-8 px-2 cursor-pointer"
                      onClick={() => handleFollow(item.username)}
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <button className="right-bar__show_more text-blue-400">
          Show more
        </button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RigthBar);
