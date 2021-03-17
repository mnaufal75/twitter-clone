const datas = [
  {
    profile_image: 'https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo',
    name: 'Muhammad Naufal',
    username: 'mnaufal75',
    date: 'March 17, 2021',
    tweet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Mattis nunc sed blandit libero volutpat sed cras. Faucibus scelerisque eleifend donec pretium. Semper auctor neque vitae tempus quam pellentesque nec nam aliquam. Blandit volutpat maecenas volutpat blandit aliquam. Platea dictumst quisque sagittis purus sit amet volutpat consequat. Erat pellentesque adipiscing commodo elit. Lorem mollis aliquam ut porttitor leo. Consequat semper viverra nam libero. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Non quam lacus suspendisse faucibus interdum. Ut tristique et egestas quis ipsum suspendisse ultrices. Tortor pretium viverra suspendisse potenti. Rhoncus mattis rhoncus urna neque viverra justo nec.',
  },
  {
    profile_image: 'https://lh3.googleusercontent.com/ogw/ADGmqu-UDWio0GOwllYgAv_0g3Sx0VOUNox7rC3H1ZBPvA=s83-c-mo',
    name: 'Muhammad Naufal',
    username: 'mnaufal75',
    date: 'March 17, 2021',
    tweet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non pulvinar neque laoreet suspendisse interdum. Sem nulla pharetra diam sit amet. At in tellus integer feugiat scelerisque varius morbi enim. Accumsan sit amet nulla facilisi. Dictum fusce ut placerat orci nulla pellentesque. Mauris vitae ultricies leo integer. Rhoncus dolor purus non enim praesent elementum facilisis. Arcu bibendum at varius vel pharetra vel turpis nunc eget. Nisi quis eleifend quam adipiscing vitae proin sagittis nisl.',
  },
]

const Profile = () => {
  return (
    <div className="container w-1/2 flex flex-col">
      <div className="py-32">
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
      {datas.map((data) => {
        return (
          <div className="flex flex-row p-2 my-2">
            <div className="w-1/6">
              <div>
                <img className="shadow-inner rounded-full h-16 w-16" src={data.profile_image} />
              </div>
            </div>
            <div className="w-5/6">
              <span className="font-bold">{data.name} </span>
              <span>@{data.username} . {data.date}</span>
              <br />
              <span>{data.tweet}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Profile;
