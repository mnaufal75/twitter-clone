import LeftBar from './LeftBar';
import RightBar from './RightBar';
import Profile from './Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:username">
          <LeftBar />
          <Profile />
          <RightBar />
        </Route>
      </Switch>
    </Router>
  )
}

export default Main;