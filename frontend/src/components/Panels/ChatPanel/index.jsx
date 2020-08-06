import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { decodeUserToken } from "../../../helpers/token.helper";

import {whenPressEnter} from '../../../helpers/events.helper'

function ChatPanel({ socket, selectedGroup, selectedFriend }) {
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { _id: userID } = decodeUserToken();

  useEffect(() => {
    if (selectedFriend) {
      socket && socket.emit(
        "loadPrivateConversation",
        { userID, friendID: selectedFriend },
        ({ messages, username }) => {
          setMessages(messages)
          setGroupName(username)
        });
    }

    if (selectedGroup) {
      socket && socket.emit(
        "loadGroupConversation",
        { userID, groupID: selectedGroup },
        ({ messages, groupName }) => {
          setGroupName(groupName)
          setMessages(messages)
        });
    }

    return () => {};
  }, [selectedFriend, selectedGroup, messages]);

  const handleOnSendMessage = (event) => {
    event.preventDefault();

    selectedFriend && socket && message && socket.emit(
      "sendPrivateMessage",
      { userID, friendID: selectedFriend, message, createdAt: Date.now() },
      ({ errors }) => {
        (errors) && console.log('sendPrivateMessage errors', errors);
        setMessage("");
      }
    );

    selectedGroup && socket && message && socket.emit(
      "sendGroupMessage",
      { userID, groupID: selectedGroup, message, createdAt: Date.now() },
      ({ errors }) => {
        (errors) && console.log('sendGroupMessage errors', errors);
        setMessage("");
      }
    );

  };

  const isSelectedConversation = () => {
    if (selectedFriend || selectedGroup) return true
    return false
  }

  return (
    <div className="ChatPanel">
      <h2> { groupName }</h2>
      <div className="ChatPanel__messagesList">
        {messages &&
          messages.map(({ message }, index) => (
            <p key={`message${index}`}>{message}</p>
          ))}
      </div>

        {isSelectedConversation() && (<div className="ChatPanel__messageInput">
          <input
            type="text"
            value={message}
            onKeyUp={ whenPressEnter(handleOnSendMessage) }
            onChange={({ target: { value } }) => setMessage(value)}
          />
          <button type="button" onClick={handleOnSendMessage}>
            Send
          </button>
        </div>)}

    </div>
  );
}

ChatPanel.propTypes = {
  socket: PropTypes.object,
  friendID: PropTypes.string,
};

export default ChatPanel;
