import React from "react";
import { Button, Form, Icon, Input, Menu, Modal } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    channels: [],
    modal: false,
    channelName: "",
    channelDetails: "",
  };

  handleModalChange = () => this.setState({ modal: !this.state.modal });
  handleChange = (e) => {
    this.setState({ [e.target.value]: e.target.value });
  };
  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}){" "}
            <Icon name="add" onClick={this.handleModalChange} />
          </Menu.Item>

          {/* Channels */}
        </Menu.Menu>
        {/* Add Channel */}
        <Modal
          dimmer="blurring"
          transition="scale"
          open={modal}
        //   onClose={this.handleModalChange}
        >
          <Modal.Header>Add a channel</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Input
                  fluid
                  label="Name of the Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted>
              <Icon name="checkmark" />
              Add
            </Button>
            <Button color="red" inverted onClick={this.handleModalChange}>
              <Icon name="remove" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Channels;
