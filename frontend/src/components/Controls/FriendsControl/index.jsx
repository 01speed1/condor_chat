import React, { useEffect } from "react";
import PropTypes from "prop-types";

function FriendsControl({
  userID,
  friends,
  setFriends,
  setSelectedFriend,
  setSelectedGroup,
  setCreatingGroup,
  socket,
}) {

  useEffect(() => {
    socket &&
      socket.emit("loadFriendList", { userID }, ({ errors, friends: friendsList }) => {
        setFriends(friendsList);
      });
  }, [socket, friends]);

  const handleOnSelectFriend = (friendID) => (event) => {
    setSelectedFriend(friendID);
    setSelectedGroup(null)
    setCreatingGroup(false);
  };

  return (
    <div className="FriendsControl">
      <h3>Friends</h3>
      <ul>
        {friends?.map(({ username, friendID }, index) => (
          <li key={`friend${index}`} onClick={handleOnSelectFriend(friendID)}>
            {username}
          </li>
        ))}
      </ul>
    </div>
  );
}

FriendsControl.propTypes = {
  userID: PropTypes.string,
  friends: PropTypes.array,
  setFriends: PropTypes.func,
  setSelectedFriend: PropTypes.func,
  setSelectedGroup: PropTypes.func,
  setCreatingGroup: PropTypes.func,
  socket: PropTypes.object,
};

export default FriendsControl;
