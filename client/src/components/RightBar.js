import { Link } from "react-router-dom/cjs/react-router-dom.min";

const RigthBar = () => {
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
      name: "MrBeast",
      username: "MrBeast",
    },
  ];

  return (
    <div className="right-bar container w-1/3">
      <div className="right-bar__suggestion-box rounded-lg m-4 p-4 bg-gray-100">
        <div className="mb-4">
          <span className="right-bar__title text-2xl mb-4 font-bold">
            You might like
          </span>
        </div>
        <div className="right-bar__suggestion-list">
          {listOfSuggestion.map((item) => {
            return (
              <Link>
                <div key={item.username} className="flex justify-between p-4">
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-gray-500">@{item.username}</span>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="bg-blue-400 rounded-lg text-base text-white h-8 px-2 cursor-pointer"
                      onClick={() => {}}
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

export default RigthBar;
