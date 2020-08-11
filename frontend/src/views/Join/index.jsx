import React, { useState } from "react";

import { Link } from "react-router-dom";

import { BACKEND_URL_API } from "../../constants";
import requestHelper from "../../helpers/request.helper";
import InputText from "../../components/Base/InputText.jsx";

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

        <InputText
          type="text"
          placeholder="Type your username"
          value={username}
          handleOnChange={setUsername}
          errors={errors?.username}
        />

        <InputText
          type="password"
          placeholder="Type your password"
          value={password}
          handleOnChange={setPassword}
          errors={errors?.password}
        />

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

      <div className="credentials">
        <a href="https://github.com/01speed1/condor_chat">
          <span>Created by</span>
          <p>Ocar Guzman - 01speed1</p>
          <p>{"A Condor lab test, I will take luck ;)"}</p>

          <img src="/git.png" alt="" />
          <p>Gihub repo</p>
        </a>
      </div>
    </div>
  );
}
