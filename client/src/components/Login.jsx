import React, { useState, useCallback } from "react";

import axiosAuth from "../utils/axiosAuth";

const Login = props => {
  const [form, setForm] = useState({
    username: "Lambda School",
    password: "i<3Lambd4"
  });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = useCallback(() => {
    axiosAuth()
      .post(`http://localhost:5000/api/login`, form)
      .then(res => {
        sessionStorage.setItem("token", res.data.payload);
        props.history.push("/bubblepage");
      })
      .catch(err => console.error(err));
  }, [form, props.history]);

  return (
    <div>
      <input
        type="text"
        name="username"
        value={form.username}
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={form.password}
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="button" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default Login;
