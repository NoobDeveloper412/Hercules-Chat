import React, { Component } from "react";
import { Button, Form, Icon, Input, Menu, Modal } from "semantic-ui-react";

export default class FileModal extends Component {
  state = {};

  render() {
    const { modal, handleModalChange } = this.props;
    return (
      <Modal dimmer="blurring" transition="scale"  open={modal}>
        <Modal.Header>Select an image file</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            label="File types: jpg, png"
            type="file"
            name="file"
            onChange={this.handleChange}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={this.handleSubmit}>
            <Icon name="checkmark" />
            Upload
          </Button>
          <Button color="red" inverted onClick={handleModalChange}>
            <Icon name="remove" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
