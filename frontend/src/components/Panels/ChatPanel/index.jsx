import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { decodeUserToken } from "../../../helpers/token.helper";

import { whenPressEnter } from "../../../helpers/events.helper";

function ChatPanel({ socket, selectedGroup, selectedFriend }) {
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { _id: userID } = decodeUserToken();

  useEffect(() => {
    if (selectedFriend) {
      socket &&
        socket.emit(
          "loadPrivateConversation",
          { userID, friendID: selectedFriend },
          ({ messages, username }) => {
            setMessages(messages.reverse());
            setGroupName(username);
          }
        );
    }

    if (selectedGroup) {
      socket &&
        socket.emit(
          "loadGroupConversation",
          { userID, groupID: selectedGroup },
          ({ messages, groupName }) => {
            setGroupName(groupName);
            setMessages(messages.reverse());
          }
        );
    }

    return () => {};
  }, [selectedFriend, selectedGroup, messages]);

  const handleOnSendMessage = (event) => {
    event.preventDefault();

    selectedFriend &&
      socket &&
      message &&
      socket.emit(
        "sendPrivateMessage",
        { userID, friendID: selectedFriend, message, createdAt: Date.now() },
        ({ errors }) => setMessage("")
      );

    selectedGroup &&
      socket &&
      message &&
      socket.emit(
        "sendGroupMessage",
        { userID, groupID: selectedGroup, message, createdAt: Date.now() },
        ({ errors }) => setMessage("")
      );
  };

  const chooseSelectedConversation = () => {
    if (selectedFriend || selectedGroup) return true;
    return false;
  };

  return (
    <div className="ChatPanel">
      <div className="ChatPanel__username">
        <h2>{groupName}</h2>
      </div>
      <div className="contain" >
        <div className="ChatPanel__messagesList">
          {messages?.map(({ message, userFrom, createdAt }, index) => (
            <div>
              <p
                key={`message${index}`}
                className={`MessageItem ${userID !== userFrom && "--me"}`}
              >
                {message}
                <br/>
                <span style={{fontSize:'1rem'}} >{new Date(createdAt).toString()}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {chooseSelectedConversation() && (
        <div className="ChatPanel__messageInput formField">
          <div className="messageInput">
            <input
              type="text"
              value={message}
              placeholder="Type your message"
              onKeyUp={whenPressEnter(handleOnSendMessage)}
              onChange={({ target: { value } }) => setMessage(value)}
            />
            <button
              className="messageInput__sendButton"
              type="button"
              onClick={handleOnSendMessage}
            >
              <i className="material-icons">send</i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

ChatPanel.propTypes = {
  socket: PropTypes.object,
  friendID: PropTypes.string,
};

export default ChatPanel;
