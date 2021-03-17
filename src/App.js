import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import Profile from './components/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App container mx-auto px-16 flex">
        <LeftBar />

        <Switch>
          <Route path="/:username">
            <Profile />
          </Route>
        </Switch>

        <RightBar />
      </div>
    </Router>

  );
}

export default App;
