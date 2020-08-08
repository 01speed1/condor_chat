import React, { useState } from "react";
import PropTypes from "prop-types";
import { whenPressEnter } from "../../../helpers/events.helper";
import { Link } from "react-router-dom";
import InputText from "../../Base/InputText";

function SearchControl({ socket, userID }) {
  const [conversationQuery, setConversationQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleOnSearch = () => {
    socket && socket.emit("searchConversation", { query: conversationQuery, userID });
  };

  return (
    <div className="SearchControl">
      <InputText
        placeholder="Search Conversation"
        type="search"
        value={conversationQuery}
        handleOnChange={setConversationQuery}
      />

      <Link to="/dashboard/result">
        <button onClick={handleOnSearch} className="SearchControl__searchButton" type="button">
          <i className="material-icons">find_in_page</i>
        </button>
      </Link>
    </div>
  );
}

SearchControl.propTypes = {
  socket: PropTypes.object,
};

export default SearchControl;
