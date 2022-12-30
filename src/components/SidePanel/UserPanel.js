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
} from "semantic-ui-react";
import AvatarEditor from "react-avatar-editor";

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    modal: false,
    previewImage: "",
    croppedImage: "",
    blob: "",
    storageRef: firebase.storage().ref(),
    userRef: firebase.auth().currentUser,
    metadata: {
      contentType: "image/jpeg",
    },
    uploadCroppedimage: "",
    usersRef: firebase.database().ref("users"),
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
  handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };
  handleCropImage = () => {
    if (this.avatarEditor) {
      this.avatarEditor.getImageScaledToCanvas().toBlob((blob) => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          croppedImage: imageUrl,
          blob,
        });
      });
    }
  };
  uploadCroppedimage = () => {
    const { storageRef, userRef, blob, metadata } = this.state;
    storageRef
      .child(`avatars/users/${userRef.uid}`)
      .put(blob, metadata)
      .then((snap) => {
        snap.ref.getDownloadURL().then((downloadURL) => {
          this.setState({ uploadCroppedimage: downloadURL }, () =>
            this.changeAvatar()
          );
        });
      });
  };
  changeAvatar = () => {
    this.state.userRef
      .updateProfile({
        photoURL: this.state.uploadCroppedimage,
      })
      .then(() => {
        console.log("Photo updated");
        this.closeModal();
      })
      .catch((err) => {
        console.error(err);
      });

    this.state.usersRef
      .child(this.state.user.uid)
      .update({ avatar: this.state.uploadCroppedimage })
      .then(() => {
        console.log("User avatar updated!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { user, modal, previewImage, croppedImage } = this.state;
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
              <Input
                onClick={this.handleChange}
                fluid
                type="file"
                label="New Avatar"
                name="previewImage"
              />
              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <Grid.Column className="ui centered aligned grid">
                    {previewImage && (
                      <AvatarEditor
                        image={previewImage}
                        width={120}
                        height={120}
                        border={50}
                        scale={1.2}
                        ref={(node) => (this.avatarEditor = node)}
                      />
                    )}
                  </Grid.Column>
                  <Grid.Column>
                    {croppedImage && (
                      <Image
                        width={100}
                        height={100}
                        src={croppedImage}
                        style={{ margin: "3.5em auto" }}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              {croppedImage && (
                <Button
                  color="green"
                  inverted
                  onClick={this.uploadCroppedimage}
                >
                  <Icon name="save" /> Change Avatar
                </Button>
              )}
              <Button color="green" inverted onClick={this.handleCropImage}>
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
