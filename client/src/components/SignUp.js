import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signup } from '../actions/index';

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (query) => dispatch(signup(query)),
  }
};

const SignUp = ({ signup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userFullname, setUserFullname] = useState('');

  const handleInput = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'userFullname') {
      setUserFullname(e.target.value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = { username, password, userFullname };
    setUsername('');
    setPassword('');
    setUserFullname('');
    signup(query);
  };

  return (
    <div className="container h-full flex flex-col">
      <div className="mx-auto my-16 w-1/3">
        <span className="text-2xl font-bold">Create your account</span>

        <form className="w-full my-4">
          <input
            className="w-full p-2 my-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            name="username" type="text" placeholder="Username" onChange={handleInput}></input>
          <input
            className="w-full p-2 my-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            name="password" type="password" placeholder="Password" onChange={handleInput}></input>
          <input
            className="w-full p-2 my-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            name="userFullname" type="text" placeholder="Name" onChange={handleInput}></input>
          <input
            className="w-full p-2 my-2 border border-blue-400 bg-blue-400 hover:bg-blue-500 text-white transition"
            type="submit" value="Sign Up" onClick={handleSubmit}></input>
        </form>

        <div className="w-full text-center text-blue-400 hover:underline">
          <Link to="/login">
            <span>Already have an account?</span>
          </Link>
        </div>
      </div>
    </div >
  )
}

export default connect(null, mapDispatchToProps)(SignUp);
