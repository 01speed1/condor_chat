import React, { useEffect } from "react";

import { Link } from "react-router-dom";

function GroupItem({ groupID, groupName, socket }) {
  useEffect(() => {
    socket && socket.on("notifyGroup", console.log);
  }, []);

  return (
    <div className="groupItem">
      <Link to="/dashboard/chat" key={groupID}>
        {groupName}
      </Link>
      <div className="statusNotify"></div>
    </div>
  );
}

export default GroupItem;
