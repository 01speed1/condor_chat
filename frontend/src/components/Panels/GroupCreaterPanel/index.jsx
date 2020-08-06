import "./GroupCreaterPanel.scss";

import React, { useState } from "react";
import PropTypes from "prop-types";

import Checkbox from "../../Base/Checkbox";

function GroupCreaterPanel({ socket, friends, setCreatingGroup, userID }) {
  const [groupName, setGroupName] = useState('')
  const [checkedFriends, setCheckedFriends] = useState(new Set([userID]));

  const handleOnCheckFriend = (friendID) => (event) => {
    let copy = checkedFriends;
    copy.has(friendID) ? copy.delete(friendID) : copy.add(friendID);
    setCheckedFriends(copy);
  };

  const handleOnCreategroup = () => {
    socket && socket.emit('createGroup', { users: [...checkedFriends], name: groupName }, ({errors}) => {
      errors && console.log('createGroup', errors)
      setCreatingGroup(false)
    })
  }

  return (
    <div className="GroupCreaterPanel">
      <input type="text" value={groupName} placeholder="Group name" onChange={({target: {value}}) => setGroupName(value)} />
      <ul>
        {friends.map(({ username, friendID }) => (
          <Checkbox key={friendID} label={username} onChange={handleOnCheckFriend(friendID)} />
        ))}
      </ul>
      <button type="button" onClick={handleOnCreategroup} >Create</button>
    </div>
  );
}

GroupCreaterPanel.propTypes = {
  socket: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
  setCreatingGroup: PropTypes.func.isRequired,
};

export default GroupCreaterPanel;
