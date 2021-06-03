import LeftBar from './LeftBar';
import RightBar from './RightBar';
import Status from './Status';
import Profile from './Profile';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const Main = ({ cookies }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
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
    </Router>
  )
}

export default Main;
