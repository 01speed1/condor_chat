import "./Chat.scss";

import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import jwtDecoder from "jwt-decode";

import PropTypes from "prop-types";

import { BACKEND_URL_SOCKET_PRIVATE } from "../../constants";
import InfoBar from "../../components/InfoBar";
import MessageBox from "../../components/MessageBox";
import MessagesBox from "../../components/MessagesBox";

let socket;

export default function Chat({ location }) {
  const [token] = useState(localStorage.getItem("token"));

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [newFriend, setNewFriend] = useState("");
  const [friends, setFriends] = useState([]);

  // main connection
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setName(name);
    setRoom(room);

    socket = io.connect(BACKEND_URL_SOCKET_PRIVATE, {
      query: `token=${token}`,
    });

    console.log(socket);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [BACKEND_URL_SOCKET_PRIVATE, location.search]);

  // efect meesage
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // efect friends list
  useEffect(() => {
    const { _id } = jwtDecoder(token);

    socket.on('friendsList', (friendsListUpdated) => {
      setFriends(friendsListUpdated)
    })
  }, [friends])

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const messageBoxProp = {
    message,
    setMessage,
    sendMessage,
  };

  const handleOnSearchFriend = (event) => {
    event.preventDefault();
    const { _id } = jwtDecoder(token);

    socket.emit(
      "addFriend",
      { currentUserID: _id, newFriend },
      ({ error, message }) => {
        setNewFriend("");
        error && alert(error);
      }
    );
  };

  const handleOnChangeNewFriend = ({ target: { value } }) => {
    setNewFriend(value);
  };

  return (
    <div>
      <h1>Chat</h1>

      <h2>Add a friend</h2>
      <input
        type="text"
        value={newFriend}
        placeholder="Add friend"
        onChange={handleOnChangeNewFriend}
      />
      <button type="button" onClick={handleOnSearchFriend}>
        Add friend
      </button>

      <h2>Friends list</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>

      <InfoBar room={room} />
      <MessagesBox messages={messages} name={name} />
      <MessageBox {...messageBoxProp} />
    </div>
  );
}

Chat.propTypes = {
  location: PropTypes.object,
};
