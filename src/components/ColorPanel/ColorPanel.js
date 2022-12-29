import React from "react";
import {
  Button,
  Divider,
  Menu,
  Sidebar,
  Modal,
  Icon,
  Label,
} from "semantic-ui-react";

import { TwitterPicker } from "react-color";

class ColorPanel extends React.Component {
  state = {
    modal: false,
  };
  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };
  render() {
    const { modal } = this.state;
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
            <div style={{ margin: "10px" }}>
              <Label content="Primary Color" />
              <TwitterPicker className="twitterPicker" />
            </div>
            <div style={{ margin: "10px" }}>
              <Label content="Secondary Color"  />
              <TwitterPicker className="twitterPicker" />
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted>
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
