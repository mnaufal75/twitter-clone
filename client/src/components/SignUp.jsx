import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { signup } from "../actions/index";

const mapStateToProps = (state) => {
  return { signupError: state.signupError };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (query) => dispatch(signup(query)),
  };
};

const SignUp = ({ signup, signupError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userFullname, setUserFullname] = useState("");
  const [hasSubmit, setHasSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleInput = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "userFullname") {
      setUserFullname(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const query = { username, password, userFullname };
    await signup(query);

    setHasSubmit(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (hasSubmit && Object.keys(signupError).length === 0) {
      history.push("/login");
    }
  }, [hasSubmit, signupError]);

  return (
    <div className="container h-full flex flex-col">
      <div className="mx-auto my-16 w-1/3">
        <span className="text-2xl font-bold">Create your account</span>

        <form className="w-full my-4">
          <div className="mb-2">
            <label htmlFor="username" className="text-blue-400">
              Username
            </label>
            <input
              id="username"
              className="signup-form__username w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleInput}
            ></input>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="text-blue-400">
              Password
            </label>
            <input
              id="password"
              className="signup-form__password w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInput}
            ></input>
          </div>
          <div className="mb-2">
            <label htmlFor="fullname" className="text-blue-400">
              Fullname
            </label>
            <input
              id="fullname"
              className="signup-form__fullname w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              name="userFullname"
              type="text"
              placeholder="Name"
              onChange={handleInput}
            ></input>
          </div>
          <div>
            <span className="login-form__error-message text-red-400">
              {JSON.stringify(signupError?.data)}
            </span>
          </div>
          <div>
            <button
              className="w-full p-2 my-2 border border-blue-400 bg-blue-400 hover:bg-blue-500 text-white transition"
              type="submit"
              onClick={handleSubmit}
            >
              {isLoading ? "Loading" : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="w-full text-center text-blue-400 hover:underline">
          <Link to="/login">
            <span>Already have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
