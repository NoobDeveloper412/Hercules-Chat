import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import "./App.css";
import ColorPanel from "./ColorPanel/ColorPanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel.js/MetaPanel";
import SidePanel from "./SidePanel/SidePanel";
// import { ToastContainer } from "react-toastify";

const App = ({ currentUser }) => {
  return (
    <React.Fragment>
      <Grid columns="equal" className="app" style={{ background: "#eee" }}>
        <ColorPanel />
        <SidePanel currentUser={currentUser} />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages />
        </Grid.Column>
        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>
      {/* <ToastContainer /> */}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(App);
