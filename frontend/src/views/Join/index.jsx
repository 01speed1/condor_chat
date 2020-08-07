import "./Join.scss";

import React, { useState, useEffect } from "react";

import { Link, Redirect } from "react-router-dom";

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
        event.preventDefault();
        localStorage.setItem("token", token);
        setErrors(errors);
        valid && window.location.assign("/dashboard");
      })
      .catch((err) => {
        setErrors({ ...errors, general: err });
      });
  };

  return (
    <div className="Join">
      <div className="Join__container">
        <h1 className="Join__title">Welcome to CondorChat!</h1>

        <div className="formField">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={({ target: { value } }) => setUsername(value)}
          />
          <span>{errors?.username && Object.values(errors?.username)}</span>
        </div>
        <div className="formField">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <span>{errors?.password && Object.values(errors?.password)}</span>
        </div>

        <div className="Join__buttons">
          <button className="--big" onClick={handleOnLogin} type="button">
            Join
            <i className="material-icons"></i>
          </button>
          <Link to="/signup">
            <button type="button">I dont have a accout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
