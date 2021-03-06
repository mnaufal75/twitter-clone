import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { withCookies } from 'react-cookie';

import Login from './components/Login';
import SignUp from './components/SignUp';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import Status from './components/Status';
import Profile from './components/Profile';
import Home from './components/Home';
import { setToken, getUserData } from '../src/actions/index';

const mapStateToProps = (state) => {
  return {
    token: state.token,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch(setToken(token)),
    getUserData: (token) => dispatch(getUserData(token)),
  }
};

const App = ({ cookies, token, setToken, getUserData }) => {
  useEffect(() => {
    (async () => {
      const tokenCookies = cookies.get('token') || token;
      setToken(tokenCookies);
      cookies.set('token', token, { path: '/' });
    })();
  }, [token]);

  useEffect(() => {
    (async () => {
      await getUserData(token);
    })();
  }, [token, getUserData]);

  return (
    <Router>
      <div className="App container min-h-screen h-auto mx-auto px-16 flex">
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
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
