import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const Login = ({ cookies }) => {
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

    await axios.post('http://localhost:5000/api/auth/login', query);
    cookies.set('username', query.username, { path: '/' });
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

export default Login;
