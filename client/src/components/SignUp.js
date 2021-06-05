import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
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
    await axios.post('http://localhost:5000/api/auth/signup', query);
  };

  return (
    <div className="container text-center h-full flex flex-col">
      <span className="mx-auto">Create your account</span>
      <br />
      <form className="w-1/2 mx-auto">
        <input className="p-2 m-2 border-2 border-black w-full" name="username" type="text" placeholder="Username" onChange={handleInput}></input>
        <br />
        <input className="p-2 m-2 border-2 border-black w-full" name="password" type="password" placeholder="Password" onChange={handleInput}></input>
        <br />
        <input className="p-2 m-2 border-2 border-black w-full" name="userFullname" type="text" placeholder="Name" onChange={handleInput}></input>
        <br />
        <input className="p-2 m-2 border-2 border-black bg-blue-400 text-white w-full" type="submit" value="Sign Up" onClick={handleSubmit}></input>
      </form>
    </div>
  )
}

export default SignUp;
