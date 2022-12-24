import React from "react";
import firebase from "../../firebase";
import { Grid, Form, Segment, Header, Message, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { HerculesMedalLogo } from "../../globals/Images";
import CustomButton from "../Utility/Button";
import { Colors } from "../Utility/Colors";
import md5 from "md5";

class Register extends React.Component {
  state = {
    username: "Muhamamd Zuhair",
    email: "ali@gmail.com",
    password: "12345678Az",
    passwordConfirmation: "12345678Az",
    errors: [],
    loading: false,
    userRef: firebase.database().ref("users"),
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

  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("User saved!");
              });
              // this.setState({ loading: false });
            })
            .catch((error) => {
              this.setState({
                loading: false,
                errors: this.state.errors.concat(error),
              });
            });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err),
          });
        });
    }
  };

  saveUser = (createdUser) => {
    return this.state.userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  render() {
    const { username, email, password, passwordConfirmation, errors, loading } =
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
          <Header as="h1" icon color="orange" textAlign="center">
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
                className={this.handleInputError(errors, "username")}
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
                style={{ color: Colors.orange }}
                onChange={this.handleChange}
                type="email"
                value={email}
                className={this.handleInputError(errors, "email")}
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                className={this.handleInputError(errors, "password")}
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
                className={this.handleInputError(
                  errors,
                  "passwordConfirmation"
                )}
                style={{ color: Colors.orange }}
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}
              />

              <CustomButton
                content={"Submit"}
                color={"orange"}
                loading={loading}
              />
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error:</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already a user?{" "}
            <Link to="/login" className="authenticationLinks">
              Login
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
