import "./GroupsControl.scss";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function GroupsControl({
  socket,
  setSelectedGroup,
  setSelectedFriend,
  setCreatingGroup,
  userID,
}) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    socket &&
      socket.emit("loadGroups", { userID }, ({ errors, groups }) => {
        errors && console.log("loadGroups errors", errors);
        setGroups(groups);
      });
  }, [socket, groups]);

  const handleOnCreateGroup = () => {
    setCreatingGroup(true);
  };

  const handleOnSelecrGroup = (groupID) => (event) => {
    setSelectedGroup(groupID);
    setSelectedFriend(null);
  };

  return (
    <div className="GroupsControl">
      <h3 className="GroupsControl__title">Groups</h3>
      <button onClick={handleOnCreateGroup}>Create a Group</button>
      <div className="GroupsControl__list">
        {groups?.map(({ groupName, groupID }) => (
          <li key={groupID} onClick={handleOnSelecrGroup(groupID)}>
            {groupName}
          </li>
        ))}
      </div>
    </div>
  );
}

GroupsControl.propTypes = {
  socket: PropTypes.object,
  setSelectedGroup: PropTypes.func,
  setCreatingGroup: PropTypes.func,
  userID: PropTypes.string,
};

export default GroupsControl;
