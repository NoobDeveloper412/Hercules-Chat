import React, { Component } from "react";
import { Button, Icon, Input,  Modal } from "semantic-ui-react";
import mime from "mime-types";
export default class FileModal extends Component {
  state = {
    file: null,
    authorized: ["image/jpeg", "image/png"],
  };

  addFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };
  clearFile = () => {
    this.setState({ file: null });
  };

  uploadFile = () => {
    const { file } = this.state;
    const { uploadFileToCloud, handleModalChange } = this.props;

    if (file !== null) {
      if (this.isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFileToCloud(metadata, file);
        handleModalChange();
        this.clearFile();
      }
    }
  };

  isAuthorized = (filename) =>
    this.state.authorized.includes(mime.lookup(filename));

  render() {
    const { modal, handleModalChange } = this.props;
    return (
      <Modal dimmer="blurring" transition="scale" open={modal}>
        <Modal.Header>Select an image file</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            label="File types: jpg, png"
            type="file"
            name="file"
            onChange={this.addFile}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={this.uploadFile}>
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
