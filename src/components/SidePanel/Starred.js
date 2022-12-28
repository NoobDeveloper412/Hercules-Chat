import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Menu } from "semantic-ui-react";
import { setCurrentChannel, setPrivateChannel } from "../../actions";

class Starred extends Component {
  state = {
    starredChannel: [],
    activeChannel: "",
  };

  setActiveChannel = (channel) => {
    this.setState({ activeChannel: channel.id });
  };

  changeChannel = (channel) => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  };

  displayChannels = (starredChannel) =>
    starredChannel.length > 0 &&
    starredChannel.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));
  render() {
    const { starredChannel } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu className="menu">
          <Menu.Item>
            <span>
              <Icon name="star" /> STARRED
            </span>{" "}
            ({starredChannel.length}){" "}
            {/* <Icon name="add" onClick={this.handleModalChange} /> */}
          </Menu.Item>
          {this.displayChannels(starredChannel)}
        </Menu.Menu>
      </React.Fragment>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);
