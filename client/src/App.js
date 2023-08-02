import { useEffect } from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { getUserData, setToken } from "../src/actions/index";
import {
  Home,
  LeftBar,
  Login,
  Profile,
  RightBar,
  SignUp,
  Status,
} from "./components/";

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch(setToken(token)),
    getUserData: (token) => dispatch(getUserData(token)),
  };
};

const App = ({ cookies, token, setToken, getUserData }) => {
  useEffect(() => {
    (async () => {
      const tokenCookies = cookies.get("token") || token;
      setToken(tokenCookies);
      cookies.set("token", token, { path: "/" });
    })();
  }, [token]);

  useEffect(() => {
    (async () => {
      await getUserData(token);
    })();
  }, [token, getUserData]);

  return (
    <Router>
      <div className="App w-3/4 min-h-screen h-auto mx-auto px-16 flex">
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <Login cookies={cookies} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/home">
            <LeftBar cookies={cookies} />
            <Home cookies={cookies} />
            <RightBar />
          </Route>
          <Route path="/:username/status/:tweetId">
            <LeftBar cookies={cookies} />
            <Status cookies={cookies} />
            <RightBar />
          </Route>
          <Route path="/:username">
            <LeftBar cookies={cookies} />
            <Profile cookies={cookies} />
            <RightBar />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
