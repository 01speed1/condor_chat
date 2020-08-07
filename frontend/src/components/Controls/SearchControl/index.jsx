import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { whenPressEnter } from "../../../helpers/events.helper";
import { Link } from "react-router-dom";

function SearchControl({ socket, userID, setShowingResults }) {
  const [conversationQuery, setConversationQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleOnChangeQuery = ({ target: { value } }) =>
    setConversationQuery(value);

  const handleOnSearch = () => {
    socket &&
      socket.emit("searchConversation", { query: conversationQuery, userID });
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search Conversation"
        value={conversationQuery}
        onKeyUp={whenPressEnter(handleOnSearch)}
        onChange={handleOnChangeQuery}
      />
      <Link to="/dashboard/result">
        <button type="button"> Search </button>
      </Link>
    </div>
  );
}

SearchControl.propTypes = {
  socket: PropTypes.object,
};

export default SearchControl;
