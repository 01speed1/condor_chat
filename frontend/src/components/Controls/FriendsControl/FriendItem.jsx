import React, { useEffect, useState } from "react";
import { BACKEND_URL_IMAGES, DEFAULT_IMAGE_PROFILE } from "../../../constants";
import { Link } from "react-router-dom";
import { hourFormater } from "../../../helpers/date.helper";

export default function FriendItem({ username, socket, image, friendID }) {
  const [time, setTime] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const [unseeMessage, setUnseeMessage] = useState([]);

  const cleanUnseeMessage = () => setUnseeMessage([]);

  useEffect(() => {
    socket &&
      socket.on("notifyPrivateMessage", ({  message, meesageUserID }) => {
        if (meesageUserID === friendID) {
          setLastMessage(message);
        }
      });
  }, [socket]);

  useEffect(() => {
    setTime(hourFormater());
    setUnseeMessage([...unseeMessage, lastMessage].filter(Boolean));
  }, [lastMessage]);

  const setFriendImage = (image) => {
    if (image) return `${BACKEND_URL_IMAGES}${image}`;
    return DEFAULT_IMAGE_PROFILE;
  };

  return (
    <li className="FriendItem" onClick={cleanUnseeMessage}>
      <Link to="/dashboard/chat">
        <div className="FriendItem__image">
          <img src={setFriendImage(image)} alt="" />
        </div>

        <div className="FriendItem__content">
          <p className="username">{username}</p>
          <p className="lastMessage">
            {unseeMessage.length > 0 && lastMessage}
          </p>
        </div>

        <div className="FriendItem__status">
          <div className="statusHour">{unseeMessage.length > 0 && time}</div>
          {unseeMessage.length > 0 && (
            <div className="statusNotify">{unseeMessage.length}</div>
          )}
        </div>
      </Link>
    </li>
  );
}
