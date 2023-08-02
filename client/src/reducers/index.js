const initialState = {
  token: "",
  username: "",
  userFullname: "",
  timeline: [],
  tweets: [],
  followers: [],
  following: [],
  loginError: {},
  signupError: {},
};

const rootReducer = (state = initialState, action) => {
  if (action.type === "SIGNUP") {
    return Object.assign({}, state, {});
  } else if (action.type === "SIGNUP_ERROR") {
    return { ...initialState, signupError: action.payload };
  } else if (action.type === "LOGIN") {
    return Object.assign({}, state, {
      token: action.payload,
    });
  } else if (action.type === "LOGIN_ERROR") {
    return { ...initialState, loginError: action.payload };
  } else if (action.type === "LOGOUT") {
    return { ...initialState, token: "" };
  } else if (action.type === "CREATE_TWEET") {
    return Object.assign({}, state, {});
  } else if (action.type === "GET_USER_DATA") {
    return Object.assign({}, state, {
      username: action.payload.username,
      userFullname: action.payload.userFullname,
      timeline: [...action.payload.timeline],
      tweets: [...action.payload.tweets],
      followers: [...action.payload.followers],
      following: [...action.payload.following],
    });
  } else if (action.type === "GET_TIMELINE") {
    return Object.assign({}, state, {
      username: action.payload.username,
      userFullname: action.payload.userFullname,
      timeline: [...action.payload.timeline],
    });
  } else if (action.type === "SET_TOKEN") {
    return Object.assign({}, state, {
      token: action.payload,
    });
  }

  return state;
};

export default rootReducer;
