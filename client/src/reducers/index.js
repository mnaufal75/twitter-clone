const initialState = {
  token: '',
  username: '',
  userFullname: '',
};

const rootReducer = (state = initialState, action) => {
  if (action.type === 'login') {
    return Object.assign({}, state, {
      token: action.payload,
    });
  }

  return state;
};

export default rootReducer;
