import React, { useState } from "react";

import { BACKEND_URL_API } from "../../constants";

import requestHelper from "../../helpers/request.helper";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmantion, setPasswordConfirmantion] = useState("");

  const [errors, setErrors] = useState({});

  const handleOnSigUp = (event) => {
    event.preventDefault();

    const UserParameters = {
      username,
      password,
      passwordConfirmantion,
      createdAt: Date.now(),
    };

    requestHelper(`${BACKEND_URL_API}/signup`, UserParameters)
      .then(({ valid, errors }) => {
        console.log(errors)
        valid && window.location.assign("/");
        setErrors(errors);
      })
      .catch((err) => {
        setErrors({ ...errors, general: err });
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleOnSigUp}>
        <pre>{errors?.general && JSON.stringify(errors?.general, null, 2)}</pre>
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

        <div>
          <input
            type="password"
            placeholder="Confirm your password"
            value={passwordConfirmantion}
            onChange={({ target: { value } }) =>
              setPasswordConfirmantion(value)
            }
          />
          <span>
            {errors?.passwordConfirmantion &&
              Object.values(errors?.passwordConfirmantion)}
          </span>
        </div>

        <button type="submit">SignUp</button>
      </form>
      <Link to="/">
        <button type="button">I have a Account</button>
      </Link>
    </div>
  );
}
