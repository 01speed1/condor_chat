import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BACKEND_URL_IMAGES, DEFAULT_IMAGE_PROFILE } from "../../../constants";

function UserControl({ socket, userID }) {
  const [updatedImage, setUpdatedImage] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");

  const avatarURL = `${BACKEND_URL_IMAGES}${updatedImage}`;

  useEffect(() => {
    socket &&
      socket.emit(
        "connectUser",
        { userID },
        ({ user: { imagePath, username } }) => {
          setUpdatedImage(imagePath);
          setUpdatedUsername(username);
        }
      );
  });

  return (
    <div className="UserControl">
      <Link to="/dashboard/profile">
        <div className="UserControl__avatar">
          <img
            src={updatedImage ? avatarURL : DEFAULT_IMAGE_PROFILE}
            alt="avatar"
          />
        </div>
      </Link>
      {updatedUsername && (
        <h1 className="UserControl__username">{`${updatedUsername}`}</h1>
      )}
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
