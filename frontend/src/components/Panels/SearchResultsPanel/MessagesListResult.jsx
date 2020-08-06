import React from "react";
import PropTypes from "prop-types";

function MessagesListResult({ label, messages }) {
  return (
    <div>
      {messages?.length > 0 && (
        <div>
          <h3>{label}</h3>
          {messages?.map(({message}, index) => (
            <p key={`mp${index}`}>{message}</p>
          ))}
        </div>
      )}
    </div>
  );
}

MessagesListResult.propTypes = {
  label: PropTypes.string,
  messages: PropTypes.array,
};

export default MessagesListResult;
