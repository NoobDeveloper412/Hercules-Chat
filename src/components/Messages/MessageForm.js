import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import firebase from "../../firebase";
import FileModal from "./FileModal";

class MessageForm extends React.Component {
  state = {
    message: "",
    loading: false,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    errors: [],
    modal: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleModalChange = () => this.setState({ modal: !this.state.modal });

  createMessage = () => {
    const message = {
      content: this.state.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      },
    };
    return message;
  };

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;
    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" }),
      });
    }
  };

  render() {
    const { errors, message, loading, modal } = this.state;
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          placeholder="Write your message"
          onChange={this.handleChange}
          value={message}
          className={
            errors.some((error) => error.message.includes("message"))
              ? "error"
              : ""
          }
        />
        <Button.Group icon widths="2">
          <Button
            color="orange"
            content="Add Reply"
            onClick={this.sendMessage}
            labelPosition="left"
            disabled={loading}
            icon="edit"
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            onClick={this.handleModalChange}
            icon="cloud upload"
          />
          <FileModal modal={modal} handleModalChange={this.handleModalChange} />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
