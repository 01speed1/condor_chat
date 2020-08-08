import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InputText from "../../Base/InputText";

export default function AddFriendControl({
  socket,
  userID,
  setSelectedFriend,
}) {
  const [newFriend, setNewFriend] = useState("");
  const [errors, setErrors] = useState("");

  const handleOnSearchFriend = (event) => {
    event.preventDefault();

    socket.emit(
      "addFriend",
      { currentUserID: userID, newFriend },
      ({ friendID, errors }) => {
        setErrors(errors?.error);
        !errors && setSelectedFriend(friendID);
        !errors && setNewFriend("");
      }
    );
  };

  return (
    <div className="addFriendControl">
      {/* <input
        type="text"
        value={newFriend}
        placeholder="Add friend"
        onChange={handleOnChangeNewFriend}
      /> */}

      <InputText
        placeholder="Add friend"
        type="text"
        value={newFriend}
        handleOnChange={setNewFriend}
        errors={errors}
      />

      <Link to="/dashboard/chat">
        <button className="addFriendControl__addButton" onClick={handleOnSearchFriend}>
          <span className="material-icons">add_circle</span>
        </button>
      </Link>
    </div>
  );
}

AddFriendControl.propTypes = {
  socket: PropTypes.object,
  userID: PropTypes.string,
};
