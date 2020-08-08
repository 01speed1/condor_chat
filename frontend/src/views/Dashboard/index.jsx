import React, { useState, useEffect } from "react";

import io from "socket.io-client";

import { BACKEND_URL_SOCKET_PRIVATE } from "../../constants";

import { decodeUserToken } from "../../helpers/token.helper";

import { Route, Link } from "react-router-dom";

import ChatPanel from "../../components/Panels/ChatPanel";
import GroupsControl from "../../components/Controls/GroupsControl";
import FriendsControl from "../../components/Controls/FriendsControl";
import GroupCreaterPanel from "../../components/Panels/GroupCreaterPanel";
import SearchControl from "../../components/Controls/SearchControl";
import SearchResultsPanel from "../../components/Panels/SearchResultsPanel";
import AddFriendControl from "../../components/Controls/addFriendControl";
import ProfilePanel from "../../components/Panels/ProfilePanel";
import UserControl from "../../components/Controls/UserControl";

export default function Dashboard() {
  const [socket, setSocket] = useState(null);

  const [token] = useState(localStorage.getItem("token"));

  const [currentUserData, setCurrentUserData] = useState({});

  const [friends, setFriends] = useState([]);

  const [selectedFriendID, setSelectedFriendID] = useState("");
  const [selectedGroupID, setSelectedGroupID] = useState("");

  useEffect(() => {
    const initialSocket = io(BACKEND_URL_SOCKET_PRIVATE, {
      query: `token=${token}`,
    });

    setSocket(initialSocket);

    const userData = decodeUserToken(token);

    setCurrentUserData(userData);

    return () => {
      initialSocket.emit("disconnect", { userID: userData._id });
      initialSocket.off();
      localStorage.removeItem("token");
    };
  }, [token]);

  return (
    <div className="Dashboard">
      <div className="Dashboard__sideBar">
        {/* Move to in component */}
        <div className="SideBar">
          <div className="SideBar__userContainer">
            <UserControl userID={currentUserData._id} socket={socket} />
          </div>
          <div className="SideBar__searchContainer">
            <SearchControl socket={socket} userID={currentUserData._id} />
          </div>

          <div className="SideBar__addFriendContainer">
            <AddFriendControl
              setSelectedFriend={setSelectedFriendID}
              socket={socket}
              userID={currentUserData._id}
            />
          </div>
          <div className="SideBar__friendsList">
            <FriendsControl
              userID={currentUserData._id}
              socket={socket}
              friends={friends}
              setFriends={setFriends}
              setSelectedFriend={setSelectedFriendID}
              setSelectedGroup={setSelectedGroupID}
            />
          </div>

          <div className="SideBar__groupsList">
            <GroupsControl
              socket={socket}
              setSelectedGroup={setSelectedGroupID}
              setSelectedFriend={setSelectedFriendID}
              userID={currentUserData._id}
            />
          </div>
        </div>
      </div>
      <div className="Dashboard__chatPanel">
        <Route
          path="/dashboard/profile"
          exact
          render={() => <ProfilePanel userID={currentUserData._id} />}
        />

        <Route
          path="/dashboard/chat"
          exact
          render={() => (
            <ChatPanel
              socket={socket}
              selectedGroup={selectedGroupID}
              selectedFriend={selectedFriendID}
            />
          )}
        />

        <Route
          path="/dashboard/result"
          exact
          render={() => <SearchResultsPanel socket={socket} />}
        />

        <Route
          path="/dashboard/create_group"
          exact
          render={() => (
            <GroupCreaterPanel
              setSelectedGroup={setSelectedGroupID}
              socket={socket}
              userID={currentUserData._id}
              friends={friends}
            />
          )}
        />
      </div>
    </div>
  );
}
