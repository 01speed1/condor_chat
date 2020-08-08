import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FriendItem from './FriendItem'

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
      socket.emit(
        "loadFriendList",
        { userID },
        ({ errors, friends: friendsList }) => {
          setFriends(friendsList.reverse());
        }
      );
  }, [socket, friends]);

  const handleSetSeledtedFriend = (friendID) => (event) => {
    setSelectedFriend(friendID)
    setSelectedGroup(null)
  }

  return (
    <div className="FriendsControl">
      <h2>FRIENDS</h2>
      <ul className="friendsList">
        {friends?.map(({ username, friendID, imagePath }, index) => (
          <div onClick={handleSetSeledtedFriend(friendID)}>
            <FriendItem key={`friend${index}`} username={username} friendID={friendID} socket={socket} image={imagePath} />
          </div>
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
