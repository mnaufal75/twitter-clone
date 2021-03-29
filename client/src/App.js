import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App container h-screen mx-auto px-16 flex">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route>
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
