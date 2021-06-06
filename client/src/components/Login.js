import { useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';

import { login } from '../actions/index';

const mapDispatchToProps = (dispatch) => {
  return {
    login: (query) => dispatch(login(query)),
  }
}

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleInput = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = { username, password };
    setUsername('');
    setPassword('');

    await login(query);
    history.push("/home");
  };

  return (
    <div className="container text-center h-full flex flex-col">
      <span className="mx-auto">Log in to Twitter</span>
      <br />
      <form className="w-1/2 mx-auto">
        <input className="p-2 m-2 border-2 border-black w-full" name="username" type="text" placeholder="Username" onChange={handleInput}></input>
        <br />
        <input className="p-2 m-2 border-2 border-black w-full" name="password" type="password" placeholder="Password" onChange={handleInput}></input>
        <br />
        <input className="p-2 m-2 border-2 border-black bg-blue-400 text-white w-full" type="submit" value="Log in" onClick={handleSubmit}></input>
      </form>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Login);
