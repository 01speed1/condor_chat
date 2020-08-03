import React from "react";
import PropTypes from "prop-types";

import "./MessageBox.scss";

function MessageBox({ message, setMessage, sendMessage }) {
  const handleOnChangeMessage = ({ target: { value } }) => setMessage(value);

  const handleOnKeyPressEnter = (event) =>{
    event.key === "Enter" && sendMessage(event);
  }

  const handleOnSubmitMessage = (event) => sendMessage(event);

  return (
    <form className="messageBox">
      <input
        type="text"
        value={message}
        onChange={handleOnChangeMessage}
        onKeyPress={handleOnKeyPressEnter}
        autoFocus
      />
      <button onClick={handleOnSubmitMessage}>send</button>
    </form>
  );
}

MessageBox.propTypes = {};

export default MessageBox;
