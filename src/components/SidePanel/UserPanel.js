import firebase from "../../firebase";
import React from "react";
import {
  Button,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Modal,
  Modals,
} from "semantic-ui-react";

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    modal: false,
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  dropDownOptions = () => [
    {
      text: (
        <span>
          Signed in as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true,
      key: "user",
    },
    {
      key: "avatar",
      text: <span onClick={this.openModal}>Change Avatar</span>,
    },
    {
      key: "signOut",
      text: <span onClick={this.handleSignOut}>Sign Out</span>,
    },
  ];

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("Signed out!"));
  };
  render() {
    const { user, modal } = this.state;
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Header inverted floated="left" as="h2">
              {/* App Header */}
              <Icon name="lightning" />
              <Header.Content>HerculesChat</Header.Content>
            </Header>
            {/* User DropDown */}

            <Header style={{ padding: ".25em" }} as="h4" inverted>
              <Dropdown
                style={{ width: "200px" }}
                trigger={
                  <span>
                    <Image src={user.photoURL} spaced="right" avatar />
                    {user.displayName}
                  </span>
                }
                options={this.dropDownOptions()}
              />
            </Header>
          </Grid.Row>
          {/* Change User Avatar Modal */}
          <Modal dimmer="blurring" transition="scale" open={modal} size="small">
            <Modal.Header>Change Avatar</Modal.Header>
            <Modal.Content>
              <Input fluid type="file" label="New Avatar" name="previewImage" />
              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <Grid.Column className="ui centered aligned grid">
                    {/* Image Preview */}
                  </Grid.Column>
                  <Grid.Column>{/* Cropped Image */}</Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" inverted>
                <Icon name="save" /> Change Avatar
              </Button>
              <Button color="green" inverted>
                <Icon name="image" /> Preview
              </Button>
              <Button color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
