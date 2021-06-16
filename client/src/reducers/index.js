const initialState = {
  token: '',
  username: '',
  userFullname: '',
  timeline: [],
  tweets: [],
  followers: [],
  following: [],
};

const rootReducer = (state = initialState, action) => {
  if (action.type === 'login') {
    return Object.assign({}, state, {
      token: action.payload,
    });
  } else if (action.type === 'logout') {
    return Object.assign({}, state, {
      token: '',
    });
  } else if (action.type === 'create-tweet') {
    return Object.assign({}, state, {
    });
  } else if (action.type === 'get-user-data') {
    return Object.assign({}, state, {
      username: action.payload.username,
      userFullname: action.payload.userFullname,
      timeline: [...action.payload.timeline],
      tweets: [...action.payload.tweets],
      followers: [...action.payload.followers],
      following: [...action.payload.following],
    });
  } else if (action.type === 'get-timeline') {
    return Object.assign({}, state, {
      username: action.payload.username,
      userFullname: action.payload.userFullname,
      timeline: [...action.payload.timeline],
    });
  } else if (action.type === 'set-token') {
    return Object.assign({}, state, {
      token: action.payload,
    });
  }

  return state;
};

export default rootReducer;
