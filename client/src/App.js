import { withCookies } from 'react-cookie';
import Login from './components/Login';
import SignUp from './components/SignUp';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import Status from './components/Status';
import Profile from './components/Profile';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App({ cookies }) {
  return (
    <Router>
      <div className="App container min-h-screen h-auto mx-auto px-16 flex">
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
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
            <LeftBar />
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

export default withCookies(App);
