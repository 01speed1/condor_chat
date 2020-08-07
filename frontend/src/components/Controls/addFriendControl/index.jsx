import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function AddFriendControl({socket, userID, setSelectedFriend}) {

  const [newFriend, setNewFriend] = useState("");

  const handleOnSearchFriend = (event) => {
    event.preventDefault();

    socket.emit("addFriend", { currentUserID: userID, newFriend }, ({ friendID, errors }) => {
      errors && console.log("addFriend errors", errors);
      setSelectedFriend(friendID)
      setNewFriend("");
    });
  };

  const handleOnChangeNewFriend = ({ target: { value } }) => {
    setNewFriend(value);
  };

  return (
    <div className="addFriendControl">
      <h2>Add a friend</h2>
      <input
        type="text"
        value={newFriend}
        placeholder="Add friend"
        onChange={handleOnChangeNewFriend}
      />
      <Link to="/dashboard/chat">
        <button type="button" onClick={handleOnSearchFriend}>
          Add friend
        </button>
      </Link>
    </div>
  );
}

AddFriendControl.propTypes = {
  socket: PropTypes.object,
  userID: PropTypes.string
};
