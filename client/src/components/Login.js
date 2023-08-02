import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../actions/index";

const mapStateToProps = (state) => {
  return { token: state.token, loginError: state.loginError };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (query) => dispatch(login(query)),
  };
};

const Login = ({ token, loginError, login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleInput = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const query = { username, password };
    await login(query);
  };

  useEffect(() => {
    if (Object.keys(token).length !== 0) {
      history.push("/home");
    }
  }, [token]);

  return (
    <div className="container h-screen flex flex-col">
      <div className="mx-auto my-16 w-1/3">
        <span className="text-2xl font-bold">Log in to Twitter</span>

        <form className="login-form w-full my-4">
          <div className="mb-2">
            <label htmlFor="username" className="text-blue-400">
              Username
            </label>
            <input
              id="username"
              className="login-form__username w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleInput}
            ></input>
          </div>
          <div htmlFor="passoword" className="mb-2">
            <label className="text-blue-400">Password</label>
            <input
              id="password"
              className="login-form__password w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInput}
            ></input>
          </div>
          <div>
            <span className="login-form__error-message text-red-400">
              {loginError?.data}
            </span>
          </div>
          <div>
            <input
              className="w-full p-2 my-2 border border-blue-400 bg-blue-400 hover:bg-blue-500 text-white transition"
              type="submit"
              value="Log in"
              onClick={handleSubmit}
            ></input>
          </div>
        </form>

        <div className="w-full text-center text-blue-400 hover:underline">
          <Link to="/signup">
            <span>Sign up for Twitter</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
