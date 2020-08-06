import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MessagesListResult from "./MessagesListResult";
import { Link } from "react-router-dom";

function SearchResultsPanel({ socket }) {
  const [results, setResults] = useState({});

  useEffect(() => {
    socket.on("searchResults", (messages) => {
      setResults(messages);
    });
  }, [socket, results]);

  return (
    <div className="SearchResultsPanel">
      <h2>Search ressults </h2>
      <Link to="/dashboard/welcome">
        <button>Close</button>
      </Link>
      <MessagesListResult label={"Private"} messages={results?.groupMessages} />
      <MessagesListResult label={"Group"} messages={results?.privateMessages} />
    </div>
  );
}

SearchResultsPanel.propTypes = {
  socket: PropTypes.object,
};

export default SearchResultsPanel;
