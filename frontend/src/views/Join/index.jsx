import "./Join.scss";

import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { BACKEND_URL_API } from "../../constants";
import requestHelper from "../../helpers/request.helper";

export default function Join() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleOnLogin = (event) => {
    const UserParameters = {
      username,
      password,
    };

    requestHelper(`${BACKEND_URL_API}/login`, UserParameters)
      .then(({ valid, token, errors }) => {
        localStorage.setItem("token", token);
        setErrors(errors);
      })
      .catch((err) => {
        event.preventDefault();
        setErrors({ ...errors, general: err });
      });
  };

  return (
    <div>
      <h1>Join</h1>
      <form>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={({ target: { value } }) => setUsername(value)}
          />
          <span>{errors?.username && Object.values(errors?.username)}</span>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <span>{errors?.password && Object.values(errors?.password)}</span>
        </div>
        <Link to="/dashboard" onClick={handleOnLogin}>
          <button type="button">Join</button>
        </Link>
      </form>
      <Link to="/signup">
        <button type="button">I dont have a accout</button>
      </Link>
    </div>
  );
}