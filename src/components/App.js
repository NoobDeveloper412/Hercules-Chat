import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import "./App.css";
import ColorPanel from "./ColorPanel/ColorPanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel.js/MetaPanel";
import SidePanel from "./SidePanel/SidePanel";
// import { ToastContainer } from "react-toastify";

const App = ({ currentUser, currentChannel, isPrivateChannel, userPosts }) => {
  return (
    <React.Fragment>
      <Grid columns="equal" className="app" style={{ background: "#eee" }}>
        <ColorPanel
          currentUser={currentUser}
          key={currentUser && currentUser.name}
        />
        <SidePanel
          key={currentUser && currentUser.id}
          currentUser={currentUser}
        />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages
            key={currentChannel && currentChannel.id}
            currentChannel={currentChannel}
            currentUser={currentUser}
            isPrivateChannel={isPrivateChannel}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel
            key={currentChannel && currentChannel.name}
            isPrivateChannel={isPrivateChannel}
            currentChannel={currentChannel}
            userPosts={userPosts}
          />
        </Grid.Column>
      </Grid>
      {/* <ToastContainer /> */}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts,
});
export default connect(mapStateToProps)(App);
