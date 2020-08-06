import "./Dashboard.scss";

import React, { useState, useEffect } from "react";

import io from "socket.io-client";
import PropTypes from "prop-types";

import { BACKEND_URL_SOCKET_PRIVATE } from "../../constants";

import { decodeUserToken } from "../../helpers/token.helper";

import ChatPanel from "../../components/Panels/ChatPanel";
import GroupsControl from "../../components/Controls/GroupsControl";
import FriendsControl from "../../components/Controls/FriendsControl";
import GroupCreaterPanel from "../../components/Panels/GroupCreaterPanel";
import SearchControl from "../../components/Controls/SearchControl";

export default function Dashboard() {
  const [socket, setSocket] = useState(null);

  const [token] = useState(localStorage.getItem("token"));

  const [messages, setMessages] = useState([]);

  const [currentUserData, setCurrentUserData] = useState({});

  const [newFriend, setNewFriend] = useState("");

  const [friends, setFriends] = useState([]);

  const [selectedFriendID, setSelectedFriendID] = useState("");
  const [selectedGroupID, setSelectedGroupID] = useState("");

  const [isCreatingGroup, setCreatingGroup] = useState(false);

  useEffect(() => {
    const initialSocket = io(BACKEND_URL_SOCKET_PRIVATE, {
      query: `token=${token}`,
    });

    setSocket(initialSocket);

    const userData = decodeUserToken(token);

    setCurrentUserData(userData);

    initialSocket &&
      initialSocket.emit("connectUser", { userID: userData._id }, (values) => {
        console.log("connectUser", values);
      });

    initialSocket.on("notifyPrivateMessage", () => alert("new message"));

    return () => {
      initialSocket.emit("disconnect", { userID: userData._id });
      initialSocket.off();
      localStorage.removeItem("token");
    };
  }, [BACKEND_URL_SOCKET_PRIVATE, token]);

  useEffect(() => {
    socket &&
      socket.on("message", (message) => {
        setMessages([...messages, message]);
      });
  }, [messages]);

  const handleOnSearchFriend = (event) => {
    event.preventDefault();
    const { _id: currentUserID } = decodeUserToken(token);

    socket.emit(
      "addFriend",
      { currentUserID, newFriend },
      ({ error }) => {
        error && console.log("addFriend errors", error);
        setNewFriend("");
      }
    );
  };

  const handleOnChangeNewFriend = ({ target: { value } }) => {
    setNewFriend(value);
  };

  return (
    <div className="Dashboard">
      <div className="Dashboard__sideBar">
        <h1>Dashboard</h1>
        {currentUserData?.username && (<h2>{`Hello ${currentUserData?.username}!`}</h2>)}

        {/* Move to in component */}
        <div className="SideBar">
          <div className="SideBar__searchContainer">
            <SearchControl socket={socket} userID={currentUserData._id} />
          </div>

          <div className="SideBar__addFriendContainer">
            {/* Move to in component */}
            <h2>Add a friend</h2>
            <input
              type="text"
              value={newFriend}
              placeholder="Add friend"
              onChange={handleOnChangeNewFriend}
            />
            <button type="button" onClick={handleOnSearchFriend}>
              Add friend
            </button>
          </div>
          <div className="SideBar__friendsList">
            <FriendsControl
              userID={currentUserData._id}
              socket={socket}
              friends={friends}
              setFriends={setFriends}
              setSelectedFriend={setSelectedFriendID}
              setSelectedGroup={setSelectedGroupID}
              setCreatingGroup={setCreatingGroup}
            />
          </div>

          <div className="SideBar__groupsList">
            <GroupsControl
              socket={socket}
              setSelectedGroup={setSelectedGroupID}
              setSelectedFriend={setSelectedFriendID}
              setCreatingGroup={setCreatingGroup}
              userID={currentUserData._id}
            />
          </div>
        </div>
      </div>
      <div className="Dashboard__chatPanel">
        {isCreatingGroup ? (
          <GroupCreaterPanel
            userID={currentUserData._id}
            socket={socket}
            friends={friends}
            setCreatingGroup={setCreatingGroup}
          />
        ) : (
          <ChatPanel
            socket={socket}
            selectedGroup={selectedGroupID}
            selectedFriend={selectedFriendID}
          />
        )}
      </div>
    </div>
  );
}
