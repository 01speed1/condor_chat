(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{101:function(e,t,a){},102:function(e,t,a){"use strict";a.r(t);a(55);var n=a(0),r=a.n(n),c=a(50),o=a.n(c),s=(a(60),a(2)),l=a(8),u=a(1),i=a(13),m=a.n(i),d=a(29),p=function(e){return Object.assign({method:"POST",mode:"cors",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"34.71.53.122:8080/*","Access-Control-Allow-Methods":"POST"},body:JSON.stringify({})},e)},v=function(){var e=Object(d.a)(m.a.mark((function e(t,a){var n,r,c=arguments;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>2&&void 0!==c[2]?c[2]:{},e.next=3,fetch(t,p(Object(l.a)(Object(l.a)({},n),{},{body:JSON.stringify(a)})));case 3:return r=e.sent,e.next=6,r.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}();function f(){return(f=Object(d.a)(m.a.mark((function e(t,a){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{method:"POST",body:a});case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(e){var t=e.placeholder,a=e.type,n=e.value,c=e.handleOnChange,o=e.errors,s=e.handleOnKeyUp;return r.a.createElement("div",{className:"formField"},r.a.createElement("input",{type:a,placeholder:t,value:n,onChange:function(e){var t=e.target.value;return c(t)},onKeyUp:s}),r.a.createElement("span",null,o&&Object.values(o)))}function E(){var e=Object(n.useState)(""),t=Object(u.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(""),i=Object(u.a)(o,2),m=i[0],d=i[1],p=Object(n.useState)({}),f=Object(u.a)(p,2),E=f[0],h=f[1];return r.a.createElement("div",{className:"Join"},r.a.createElement("div",{className:"Join__container"},r.a.createElement("h1",{className:"Join__title"},"Welcome to CondorChat!"),r.a.createElement(b,{type:"text",placeholder:"Type your username",value:a,handleOnChange:c,errors:null===E||void 0===E?void 0:E.username}),r.a.createElement(b,{type:"password",placeholder:"Type your password",value:m,handleOnChange:d,errors:null===E||void 0===E?void 0:E.password}),r.a.createElement("div",{className:"Join__buttons"},r.a.createElement("button",{className:"--big",onClick:function(e){var t={username:a,password:m};v("".concat("http://34.71.53.122:8080/api","/login"),t).then((function(t){var a=t.valid,n=t.token,r=t.errors;e.preventDefault(),localStorage.setItem("token",n),h(r),a&&window.location.assign("/dashboard")})).catch((function(e){h(Object(l.a)(Object(l.a)({},E),{},{general:e}))}))},type:"button"},"Join",r.a.createElement("i",{className:"material-icons"})),r.a.createElement(s.b,{to:"/signup"},r.a.createElement("button",{type:"button"},"I dont have a accout")))),r.a.createElement("div",{className:"credentials"},r.a.createElement("a",{href:"https://github.com/01speed1/condor_chat"},r.a.createElement("span",null,"Created by"),r.a.createElement("p",null,"Ocar Guzman - 01speed1"),r.a.createElement("p",null,"A Condor lab test, I will take luck ;)"),r.a.createElement("img",{src:"/git.png",alt:""}),r.a.createElement("p",null,"Gihub repo"))))}b.defaultProps={handleOnKeyUp:function(){}};var h=a(52),g=a.n(h),O=a(53),j=a.n(O),_=function(){var e=localStorage.getItem("token");return e?j()(e):{}},N=a(3);var S=function(e){var t=e.socket,a=e.selectedGroup,c=e.selectedFriend,o=Object(n.useState)(""),s=Object(u.a)(o,2),l=s[0],i=s[1],m=Object(n.useState)(""),d=Object(u.a)(m,2),p=d[0],v=d[1],f=Object(n.useState)([]),b=Object(u.a)(f,2),E=b[0],h=b[1],g=_()._id;Object(n.useEffect)((function(){return c&&t&&t.emit("loadPrivateConversation",{userID:g,friendID:c},(function(e){var t=e.messages,a=e.username;h(t.reverse()),i(a)})),a&&t&&t.emit("loadGroupConversation",{userID:g,groupID:a},(function(e){var t=e.messages,a=e.groupName;i(a),h(t.reverse())})),function(){}}),[c,a,E]);var O,j=function(e){e.preventDefault(),c&&t&&p&&t.emit("sendPrivateMessage",{userID:g,friendID:c,message:p,createdAt:Date.now()},(function(e){e.errors;return v("")})),a&&t&&p&&t.emit("sendGroupMessage",{userID:g,groupID:a,message:p,createdAt:Date.now()},(function(e){e.errors;return v("")}))};return r.a.createElement("div",{className:"ChatPanel"},r.a.createElement("div",{className:"ChatPanel__username"},r.a.createElement("h2",null,l)),r.a.createElement("div",{className:"contain"},r.a.createElement("div",{className:"ChatPanel__messagesList"},null===E||void 0===E?void 0:E.map((function(e,t){var a=e.message,n=e.userFrom,c=e.createdAt;return r.a.createElement("div",null,r.a.createElement("p",{key:"message".concat(t),className:"MessageItem ".concat(g!==n&&"--me")},a,r.a.createElement("br",null),r.a.createElement("span",{style:{fontSize:"1rem"}},new Date(c).toString())))})))),!(!c&&!a)&&r.a.createElement("div",{className:"ChatPanel__messageInput formField"},r.a.createElement("div",{className:"messageInput"},r.a.createElement("input",{type:"text",value:p,placeholder:"Type your message",onKeyUp:(O=j,function(e){e&&13===e.keyCode&&O(e)}),onChange:function(e){var t=e.target.value;return v(t)}}),r.a.createElement("button",{className:"messageInput__sendButton",type:"button",onClick:j},r.a.createElement("i",{className:"material-icons"},"send")))))};a(101);var C=function(e){var t=e.groupID,a=e.groupName,c=e.socket;return Object(n.useEffect)((function(){c&&c.on("notifyGroup",console.log)}),[]),r.a.createElement("div",{className:"groupItem"},r.a.createElement(s.b,{to:"/dashboard/chat",key:t},a),r.a.createElement("div",{className:"statusNotify"}))};var y=function(e){var t=e.socket,a=e.setSelectedGroup,c=e.setSelectedFriend,o=e.userID,l=Object(n.useState)([]),i=Object(u.a)(l,2),m=i[0],d=i[1];Object(n.useEffect)((function(){t&&t.emit("loadGroups",{userID:o},(function(e){e.errors;var t=e.groups;d(t)}))}),[t,m]);var p=function(e){return function(){a(e),c(null)}};return r.a.createElement("div",{className:"GroupsControl"},r.a.createElement("h2",{className:"GroupsControl__title"},"GROUPS"),r.a.createElement(s.b,{to:"/dashboard/create_group"},r.a.createElement("button",null,"Create a new Group")),r.a.createElement("div",{className:"GroupsControl__list"},null===m||void 0===m?void 0:m.map((function(e,a){var n=e.groupName,c=e.groupID;return r.a.createElement("div",{key:"group_".concat(a),onClick:p(c)},r.a.createElement(C,{groupID:c,groupName:n,socket:t}))}))))},k=a(19);function I(e){var t=e.username,a=e.socket,c=e.image,o=e.friendID,l=Object(n.useState)(null),i=Object(u.a)(l,2),m=i[0],d=i[1],p=Object(n.useState)(null),v=Object(u.a)(p,2),f=v[0],b=v[1],E=Object(n.useState)([]),h=Object(u.a)(E,2),g=h[0],O=h[1];Object(n.useEffect)((function(){a&&a.on("notifyPrivateMessage",(function(e){var t=e.message;e.meesageUserID===o&&b(t)}))}),[a]),Object(n.useEffect)((function(){d(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(e.getHours(),":").concat(e.getMinutes())}()),O([].concat(Object(k.a)(g),[f]).filter(Boolean))}),[f]);return r.a.createElement("li",{className:"FriendItem",onClick:function(){return O([])}},r.a.createElement(s.b,{to:"/dashboard/chat"},r.a.createElement("div",{className:"FriendItem__image"},r.a.createElement("img",{src:function(e){return e?"".concat("http://34.71.53.122:8080/uploads/").concat(e):"https://image.shutterstock.com/image-vector/profile-photo-vector-placeholder-pic-260nw-535853263.jpg"}(c),alt:""})),r.a.createElement("div",{className:"FriendItem__content"},r.a.createElement("p",{className:"username"},t),r.a.createElement("p",{className:"lastMessage"},g.length>0&&f)),r.a.createElement("div",{className:"FriendItem__status"},r.a.createElement("div",{className:"statusHour"},g.length>0&&m),g.length>0&&r.a.createElement("div",{className:"statusNotify"},g.length))))}var D=function(e){var t=e.userID,a=e.friends,c=e.setFriends,o=e.setSelectedFriend,s=e.setSelectedGroup,l=e.socket;Object(n.useEffect)((function(){l&&l.emit("loadFriendList",{userID:t},(function(e){e.errors;var t=e.friends;c(t.reverse())}))}),[l,a]);var u=function(e){return function(t){o(e),s(null)}};return r.a.createElement("div",{className:"FriendsControl"},r.a.createElement("h2",null,"FRIENDS"),r.a.createElement("ul",{className:"friendsList"},null===a||void 0===a?void 0:a.map((function(e,t){var a=e.username,n=e.friendID,c=e.imagePath;return r.a.createElement("div",{onClick:u(n)},r.a.createElement(I,{key:"friend".concat(t),username:a,friendID:n,socket:l,image:c}))}))))};var w=function(e){var t=e.onChange,a=e.label,c=Object(n.useState)(!1),o=Object(u.a)(c,2),s=o[0],l=o[1];return r.a.createElement("div",{className:"Checkbox"},r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",value:a,checked:s,onChange:function(){l(!s),t(a)}}),a))};var F=function(e){var t=e.socket,a=e.friends,c=e.userID,o=Object(n.useState)(""),l=Object(u.a)(o,2),i=l[0],m=l[1],d=Object(n.useState)(new Set([c])),p=Object(u.a)(d,2),v=p[0],f=p[1],b=function(e){return function(t){var a=v;a.has(e)?a.delete(e):a.add(e),f(a)}};return r.a.createElement("div",{className:"GroupCreaterPanel formField"},r.a.createElement("input",{type:"text",value:i,placeholder:"Group name",onChange:function(e){var t=e.target.value;return m(t)}}),r.a.createElement("ul",null,r.a.createElement("h3",null,"Friends to add:"),a.map((function(e){var t=e.username,a=e.friendID;return r.a.createElement(w,{key:a,label:t,onChange:b(a)})}))),r.a.createElement(s.b,{to:"/dashboard"},r.a.createElement("button",{type:"button",onClick:function(){t&&t.emit("createGroup",{users:Object(k.a)(v),name:i},(function(e){var t=e.errors;return console.log("createGroup",t)}))}},"Create")))};var G=function(e){var t=e.socket,a=e.userID,c=Object(n.useState)(""),o=Object(u.a)(c,2),l=o[0],i=o[1],m=Object(n.useState)([]),d=Object(u.a)(m,2);return d[0],d[1],r.a.createElement("div",{className:"SearchControl"},r.a.createElement(b,{placeholder:"Search Conversation",type:"search",value:l,handleOnChange:i}),r.a.createElement(s.b,{to:"/dashboard/result"},r.a.createElement("button",{onClick:function(){t&&t.emit("searchConversation",{query:l,userID:a})},className:"SearchControl__searchButton",type:"button"},r.a.createElement("i",{className:"material-icons"},"find_in_page"))))};var P=function(e){var t=e.label,a=e.messages;return r.a.createElement("div",{className:"MessagesListResult"},r.a.createElement("h3",null,t),null===a||void 0===a?void 0:a.map((function(e,t){var a=e.message,n=e.username;return r.a.createElement("div",{className:"listResult",key:"mp".concat(t)},r.a.createElement("span",null,n),r.a.createElement("p",null,a))})))};var x=function(e){var t=e.socket,a=Object(n.useState)({}),c=Object(u.a)(a,2),o=c[0],l=c[1];return Object(n.useEffect)((function(){t&&t.on("searchResults",(function(e){l(e)}))}),[t,o]),r.a.createElement("div",{className:"SearchResultsPanel"},r.a.createElement("div",{className:"SearchResultsPanel__header"},r.a.createElement("h2",null,"Search ressults "),r.a.createElement(s.b,{to:"/dashboard/welcome"},r.a.createElement("button",null,"Close"))),r.a.createElement("div",{className:"SearchResultsPanel__results"},r.a.createElement(P,{label:"Private",messages:null===o||void 0===o?void 0:o.groupMessages}),r.a.createElement(P,{label:"Group",messages:null===o||void 0===o?void 0:o.privateMessages})))};function U(e){var t=e.socket,a=e.userID,c=e.setSelectedFriend,o=Object(n.useState)(""),l=Object(u.a)(o,2),i=l[0],m=l[1],d=Object(n.useState)(""),p=Object(u.a)(d,2),v=p[0],f=p[1];return r.a.createElement("div",{className:"addFriendControl"},r.a.createElement(b,{placeholder:"Add friend",type:"text",value:i,handleOnChange:m,errors:v}),r.a.createElement(s.b,{to:"/dashboard/chat"},r.a.createElement("button",{className:"addFriendControl__addButton",onClick:function(e){e.preventDefault(),t.emit("addFriend",{currentUserID:a,newFriend:i},(function(e){var t=e.friendID,a=e.errors;f(null===a||void 0===a?void 0:a.error),!a&&c(t),!a&&m("")}))}},r.a.createElement("span",{className:"material-icons"},"add_circle"))))}function B(e){var t=e.userID,a=Object(n.useState)(null),c=Object(u.a)(a,2),o=c[0],s=c[1],l=Object(n.useRef)(null),i=Object(n.useState)("Click here to Change the pick!"),m=Object(u.a)(i,2),d=m[0],p=m[1],v=Object(n.useState)(null),b=Object(u.a)(v,2),E=b[0],h=b[1],g="".concat("http://34.71.53.122:8080/api","/image_uploader");return r.a.createElement("div",{className:"uploader"},r.a.createElement("h2",null,"Change Profile Photo"),r.a.createElement("div",{className:"uploader__preview"},E&&r.a.createElement("img",{src:E,alt:""})),r.a.createElement("input",{ref:l,type:"file",name:"image",accept:"image/x-png,image/gif,image/jpeg",className:"uploader__input",onChange:function(e){var t=e.target.files;p("Image selected."),s(t[0])}}),r.a.createElement("label",{onClick:function(){l.current.click()},htmlFor:"image"},d),r.a.createElement("button",{type:"button",onClick:function(e){p("Uploading..."),e.preventDefault();var a=new FormData;a.append("image",o),a.append("userID",t),function(e,t){return f.apply(this,arguments)}(g,a).then((function(e){var t=e.imagePath;h("".concat("http://34.71.53.122:8080/uploads/").concat(t)),p("Updated image!!")})).catch(console.log)}},"upload"))}var J=function(e){var t=e.socket,a=e.userID,c=Object(n.useState)(""),o=Object(u.a)(c,2),l=o[0],i=o[1],m=Object(n.useState)(""),d=Object(u.a)(m,2),p=d[0],v=d[1],f="".concat("http://34.71.53.122:8080/uploads/").concat(l);return Object(n.useEffect)((function(){t&&t.emit("connectUser",{userID:a},(function(e){var t=e.user,a=t.imagePath,n=t.username;i(a),v(n)}))})),r.a.createElement("div",{className:"UserControl"},r.a.createElement(s.b,{to:"/dashboard/profile"},l&&r.a.createElement("div",{className:"UserControl__avatar"},r.a.createElement("img",{src:f,alt:"avatar"}))),p&&r.a.createElement("h1",{className:"UserControl__username"},"".concat(p)),r.a.createElement(s.b,{to:"/",className:"UserControl__closeButton"},r.a.createElement("span",{className:"material-icons"},"close")))};function A(){var e=Object(n.useState)(null),t=Object(u.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(localStorage.getItem("token")),s=Object(u.a)(o,1)[0],l=Object(n.useState)({}),i=Object(u.a)(l,2),m=i[0],d=i[1],p=Object(n.useState)([]),v=Object(u.a)(p,2),f=v[0],b=v[1],E=Object(n.useState)(""),h=Object(u.a)(E,2),O=h[0],j=h[1],C=Object(n.useState)(""),k=Object(u.a)(C,2),I=k[0],w=k[1];return Object(n.useEffect)((function(){var e=g()("34.71.53.122:8080/private",{query:"token=".concat(s)});c(e);var t=_();return d(t),function(){e.emit("disconnect",{userID:t._id}),e.off(),localStorage.removeItem("token")}}),[s]),r.a.createElement("div",{className:"Dashboard"},r.a.createElement("div",{className:"Dashboard__sideBar"},r.a.createElement("div",{className:"SideBar"},r.a.createElement("div",{className:"SideBar__userContainer"},r.a.createElement(J,{userID:m._id,socket:a})),r.a.createElement("div",{className:"SideBar__searchContainer"},r.a.createElement(G,{socket:a,userID:m._id})),r.a.createElement("div",{className:"SideBar__addFriendContainer"},r.a.createElement(U,{setSelectedFriend:j,socket:a,userID:m._id})),r.a.createElement("div",{className:"SideBar__friendsList"},r.a.createElement(D,{userID:m._id,socket:a,friends:f,setFriends:b,setSelectedFriend:j,setSelectedGroup:w})),r.a.createElement("div",{className:"SideBar__groupsList"},r.a.createElement(y,{socket:a,setSelectedGroup:w,setSelectedFriend:j,userID:m._id})))),r.a.createElement("div",{className:"Dashboard__chatPanel"},r.a.createElement(N.b,{path:"/dashboard/profile",exact:!0,render:function(){return r.a.createElement(B,{userID:m._id})}}),r.a.createElement(N.b,{path:"/dashboard/chat",exact:!0,render:function(){return r.a.createElement(S,{socket:a,selectedGroup:I,selectedFriend:O})}}),r.a.createElement(N.b,{path:"/dashboard/result",exact:!0,render:function(){return r.a.createElement(x,{socket:a})}}),r.a.createElement(N.b,{path:"/dashboard/create_group",exact:!0,render:function(){return r.a.createElement(F,{setSelectedGroup:w,socket:a,userID:m._id,friends:f})}})))}function M(){var e=Object(n.useState)(""),t=Object(u.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(""),i=Object(u.a)(o,2),m=i[0],d=i[1],p=Object(n.useState)(""),f=Object(u.a)(p,2),E=f[0],h=f[1],g=Object(n.useState)({}),O=Object(u.a)(g,2),j=O[0],_=O[1];return r.a.createElement("div",{className:"Join"},r.a.createElement("div",{className:"Join__container --signup"},r.a.createElement("h1",{className:"Join__title"},"Hey Sign Up to chat!"),r.a.createElement("span",null,(null===j||void 0===j?void 0:j.general)&&JSON.stringify(null===j||void 0===j?void 0:j.general,null,2)),r.a.createElement(b,{type:"text",placeholder:"Type your username",value:a,handleOnChange:c,errors:null===j||void 0===j?void 0:j.username}),r.a.createElement(b,{type:"password",placeholder:"Type your password",value:m,handleOnChange:d,errors:null===j||void 0===j?void 0:j.password}),r.a.createElement(b,{type:"password",placeholder:"Confirm your password",value:E,handleOnChange:h,errors:null===j||void 0===j?void 0:j.passwordConfirmantion}),r.a.createElement("div",{className:"Join__buttons"},r.a.createElement("button",{className:"--big",type:"submit",onClick:function(e){e.preventDefault();var t={username:a,password:m,passwordConfirmantion:E,createdAt:Date.now()};v("".concat("http://34.71.53.122:8080/api","/signup"),t).then((function(e){var t=e.valid,a=e.errors;t&&window.location.assign("/"),console.log(a)})).catch((function(e){_(Object(l.a)(Object(l.a)({},j),{},{general:e}))}))}},"SignUp"),r.a.createElement(s.b,{to:"/"},r.a.createElement("button",{type:"button"},"I have a Account")))))}var R=a(20),T=function(){return Boolean(localStorage.getItem("token"))};function L(e){var t=e.component,a=Object(R.a)(e,["component"]);return r.a.createElement(N.b,Object.assign({},a,{render:function(e){return T()?r.a.createElement(t,e):r.a.createElement(N.a,{to:"/"})}}))}function K(e){var t=e.component,a=e.restricted,n=Object(R.a)(e,["component","restricted"]);return r.a.createElement(N.b,Object.assign({},n,{render:function(e){return T()&&a?r.a.createElement(N.a,{to:"/dashboard"}):r.a.createElement(t,e)}}))}function H(){return r.a.createElement(s.a,null,r.a.createElement(K,{path:"/signup",component:M}),r.a.createElement(L,{path:"/dashboard",component:A}),r.a.createElement(K,{path:"/",exact:!0,component:E}))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},54:function(e,t,a){e.exports=a(102)},55:function(e,t,a){},60:function(e,t,a){},96:function(e,t){}},[[54,1,2]]]);
//# sourceMappingURL=main.25e6b667.chunk.js.map