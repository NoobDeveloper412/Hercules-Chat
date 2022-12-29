import React from "react";
import {
  Button,
  Divider,
  Menu,
  Sidebar,
  Modal,
  Icon,
  Label,
  Segment,
} from "semantic-ui-react";

import { TwitterPicker } from "react-color";
import firebase from "../../firebase";

class ColorPanel extends React.Component {
  state = {
    modal: false,
    primaryColor: "",
    secondaryColor: "",
    user: this.props.currentUser,
    usersRef: firebase.database().ref("users"),
  };
  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleChangePrimary = (color) => this.setState({ primaryColor: color.hex });
  handleChangeSecondary = (color) =>
    this.setState({ secondaryColor: color.hex });

  handleSaveColors = () => {
    if (this.state.primaryColor && this.state.secondaryColor) {
      this.saveColors(this.state.primaryColor, this.state.secondaryColor);
    }
  };

  saveColors = (primary, secondary) => {
    this.state.usersRef
      .child(`${this.state.user.uid}/colors`)
      .push()
      .update({
        primary,
        secondary,
      })
      .then(() => {
        console.log("Colors added.");
        this.toggleModal();
      })
      .catch((err) => console.error(err));
  };
  render() {
    const { modal, primaryColor, secondaryColor } = this.state;
    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
      >
        <Divider />
        <Button
          icon="add"
          color="blue"
          size="small"
          onClick={this.toggleModal}
        />

        {/* Color Picker */}
        <Modal dimmer="blurring" transition="scale" open={modal} size="small">
          <Modal.Header>Choose App Colors</Modal.Header>
          <Modal.Content
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Segment style={{ margin: "10px" }}>
              <Label content="Primary Color" />
              <TwitterPicker
                className="twitterPicker"
                onChange={this.handleChangePrimary}
                value={primaryColor}
              />
            </Segment>
            <Segment style={{ margin: "10px" }}>
              <Label content="Secondary Color" />
              <TwitterPicker
                className="twitterPicker"
                onChange={this.handleChangeSecondary}
                value={secondaryColor}
              />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSaveColors}>
              <Icon name="checkmark" />
              Save Colors
            </Button>
            <Button color="red" inverted onClick={this.toggleModal}>
              <Icon name="remove" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default ColorPanel;
