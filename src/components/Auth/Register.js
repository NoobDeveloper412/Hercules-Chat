import React from "react";
import firebase from "../../firebase";
import {
  Grid,
  Form,
  Segment,
  Header,
  Message,
  Image,
  Input,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { HerculesMedalLogo } from "../../globals/Images";
import CustomButton from "../Utility/Button";
import { Colors } from "../Utility/Colors";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
  };

  isFormValid = () => {
    let errors = [];

    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all the fields!" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state, { error, errors })) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }, { error, errors }) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (password.length < 8 || passwordConfirmation.length < 8) {
      error = {
        message: "Password must be at least 8 characters long.",
      };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (password !== passwordConfirmation) {
      error = {
        message: "Passwords don't match!",
      };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!passwordRegex.test(password)) {
      error = {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, and one number.",
      };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  displayErrors = (errors) => {
    return errors.map((error, i) => <p key={i}>{error.message}</p>);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.isFormValid()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => console.log(createdUser))
        .catch((err) => console.log(err));
    }
  };

  render() {
    const { username, email, password, passwordConfirmation, errors } =
      this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "33%",
              marginBottom: "-40px",
            }}
          >
            <Image src={HerculesMedalLogo} size="small" alt="logo" />
          </div>
          <Header as="h2" icon color="orange" textAlign="center">
            Register for HerculesChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                style={{ color: Colors.orange }}
                icon="user"
                iconPosition="left"
                placeholder="Username"
                className="authenticationInputs"
                onChange={this.handleChange}
                type="text"
                value={username}
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                className="authenticationInputs"
                style={{ color: Colors.orange }}
                onChange={this.handleChange}
                type="email"
                value={email}
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                className="authenticationInputs"
                onChange={this.handleChange}
                style={{ color: Colors.orange }}
                type="password"
                value={password}
              />

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                className="authenticationInputs"
                style={{ color: Colors.orange }}
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}
              />

              <CustomButton content={"Submit"} color={Colors.orange} />
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error:</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already a user? <Link to="/login" className="authenticationLinks">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
