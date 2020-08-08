import React, { useState } from "react";

import { BACKEND_URL_API } from "../../constants";

import requestHelper from "../../helpers/request.helper";
import { Link } from "react-router-dom";
import InputText from "../../components/Base/InputText";

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
        valid && window.location.assign("/");
        setErrors(errors);
      })
      .catch((err) => {
        setErrors({ ...errors, general: err });
      });
  };

  return (
    <div className="Join">
      <div className="Join__container --signup">
        <h1 className="Join__title">Hey Sign Up to chat!</h1>
        <span>
          {errors?.general && JSON.stringify(errors?.general, null, 2)}
        </span>

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

        <InputText
          type="password"
          placeholder="Confirm your password"
          value={password}
          handleOnChange={setPasswordConfirmantion}
          errors={errors?.passwordConfirmantion}
        />
        <div className="Join__buttons">
          <button className="--big" type="submit" onClick={handleOnSigUp}>
            SignUp
          </button>
          <Link to="/">
            <button type="button">I have a Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
