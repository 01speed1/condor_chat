import "./GroupsControl.scss";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function GroupsControl({
  socket,
  setSelectedGroup,
  setSelectedFriend,
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

  const handleOnSelecrGroup = (groupID) => () => {
    setSelectedGroup(groupID);
    setSelectedFriend(null);
  };

  return (
    <div className="GroupsControl">
      <h3 className="GroupsControl__title">Groups</h3>
      <Link to="/dashboard/create_group">
        <button >Create a Group</button>
      </Link>

      <div className="GroupsControl__list">
        {groups?.map(({ groupName, groupID }) => (
          <Link to="/dashboard/chat" key={groupID} onClick={handleOnSelecrGroup(groupID)}>
            {groupName}
          </Link>
        ))}
      </div>
    </div>
  );
}

GroupsControl.propTypes = {
  socket: PropTypes.object,
  setSelectedGroup: PropTypes.func,
  userID: PropTypes.string,
};

export default GroupsControl;
