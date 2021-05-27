import LeftBar from './LeftBar';
import RightBar from './RightBar';
import Status from './Status';
import Profile from './Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const Main = ({ cookies }) => {
  return (
    <Router>
      <Switch>
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
