import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function FriendsControl({
  userID,
  friends,
  setFriends,
  setSelectedFriend,
  setSelectedGroup,
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
  };

  return (
    <div className="FriendsControl">
      <h3>Friends</h3>
      <ul>
        {friends?.map(({ username, friendID }, index) => (
          <Link to="/dashboard/chat" key={`friend${index}`} onClick={handleOnSelectFriend(friendID)}>
            {username}
          </Link>
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
  socket: PropTypes.object,
};

export default FriendsControl;
