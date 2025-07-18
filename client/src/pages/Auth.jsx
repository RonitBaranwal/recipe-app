import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className='auth'>
      <Login />
      <Register />
    </div>
  );
};
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
        setCookies("access_token", response.data.token);
        console.log(response.data.userID);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (error) {
        console.error(error);
    }
  };
  return (
    <div className='auth-container'>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label={"Login"}
        onSubmit={onSubmit}
      />
    </div>
  );
};
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3001/auth/register", {
        username,
        password,
      });
      alert("Registration success!!!!");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='auth-container'>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label={"Register"}
        onSubmit={onSubmit}
      />
    </div>
  );
};
const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>{label}</h2>
      <div className='form-group'>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>{label}</button>
    </form>
  );
};
