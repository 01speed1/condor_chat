import "./GroupsControl.scss";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import GroupItem from "./GroupItem";

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
        setGroups(groups);
      });
  }, [socket, groups]);

  const handleOnSelectedGroup = (groupID) => () => {
    setSelectedGroup(groupID);
    setSelectedFriend(null);
  };

  return (
    <div className="GroupsControl">
      <h2 className="GroupsControl__title">GROUPS</h2>
      <Link to="/dashboard/create_group">
        <button >Create a new Group</button>
      </Link>

      <div className="GroupsControl__list">
        {groups?.map(({ groupName, groupID }) => (
          <div onClick={handleOnSelectedGroup(groupID)}>
            <GroupItem groupID={groupID} groupName={groupName} socket={socket} />
          </div>
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
