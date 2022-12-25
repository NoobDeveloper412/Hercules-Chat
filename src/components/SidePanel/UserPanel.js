import React from "react";
import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";
import { HerculesMedalLogo } from "../../globals/Images";

class UserPanel extends React.Component {
  dropDownOptions = () => [
    {
      text: (
        <span>
          Signed in as <strong>User</strong>
        </span>
      ),
      disabled: true,
      key: "user",
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signOut",
      text: <span>Sign Out</span>,
    },
  ];
  render() {
    return (
      <Grid style={{ background: "#4c3c4c" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Header inverted floated="left" as="h2">
              {/* App Header */}
              <Icon name="lightning" />
              <Header.Content>HerculesChat</Header.Content>
            </Header>
          </Grid.Row>

          {/* User DropDown */}

          <Header style={{ padding: ".25em" }} as="h4" inverted>
            <Dropdown
              trigger={<span>User</span>}
              options={this.dropDownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
