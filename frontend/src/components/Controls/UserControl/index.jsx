import "./UserControl.scss";

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BACKEND_URL_IMAGES } from "../../../constants";

function UserControl({ currentUserData, socket }) {
  const { _id: userID, username, imagePath } = currentUserData;

  const avatarURL = `${BACKEND_URL_IMAGES}${imagePath}`;

  useEffect(() => {
    socket && socket.emit("connectUser", { userID }, (values) => {});
  });

  return (
    <div className="UserControl">
      {imagePath && (
        <div className="UserControl__avatar">
          <img src={avatarURL} alt="avatar" />
        </div>
      )}
      {username && <h1 className='UserControl__username' >{`${username}`}</h1>}
      <Link to="/" className="UserControl__closeButton">
        <span className="material-icons">close</span>
      </Link>
    </div>
  );
}

UserControl.propTypes = {
  currentUserData: PropTypes.object,
};

export default UserControl;
