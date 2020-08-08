import React from "react";
import PropTypes from "prop-types";

function MessagesListResult({ label, messages }) {
  return (
    <div className="MessagesListResult">
      <h3>{label}</h3>
      {messages?.map(({ message, username }, index) => (
        <div className="listResult" key={`mp${index}`}>
          <span>{username}</span>
          <p>{message}</p>
        </div>
      ))}
    </div>
  );
}

MessagesListResult.propTypes = {
  label: PropTypes.string,
  messages: PropTypes.array,
};

export default MessagesListResult;
