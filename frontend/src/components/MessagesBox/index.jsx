import React from "react";
import PropTypes from "prop-types";

import ScrollToBottom from "react-scroll-to-bottom";

// TODO move to a component
const Message = ({ name, message: { user, text } }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    <div style={{ backgroundColor: isSentByCurrentUser ? "green" : "blue" }}>
      <p>{trimmedName}</p>
      <p>{text}</p>
    </div>
  );
};

function MessagesBox({ messages, name }) {
  return (
    <ScrollToBottom>
      {messages.map((message, index) => (
        <div key={index}>
          <Message name={name} message={message} />
        </div>
      ))}
    </ScrollToBottom>
  );
}

MessagesBox.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({ user: PropTypes.string, text: PropTypes.string })
  ),
};

export default MessagesBox;
