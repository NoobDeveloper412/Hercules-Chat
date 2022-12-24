import React from "react";
import firebase from "../../firebase";
import { Grid, Form, Segment, Header, Message, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { OmegaVioletLogo } from "../../globals/Images";
import CustomButton from "../Utility/Button";
import { Colors } from "../Utility/Colors";

class Login extends React.Component {
  state = {
    email: "ali@gmail.com",
    password: "12345678Az",
    errors: [],
    loading: false,
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
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((signedInUser) => {
          console.log(signedInUser);
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false,
          });
        });
    }
  };

  isFormValid = () => {
    const { email, password } = this.state;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);

    return isEmailValid && isPasswordValid;
  };

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "33%",
              marginBottom: "-20px",
            }}
          >
            <Image src={OmegaVioletLogo} size="small" alt="logo" />
          </div>
          <Header as="h1" icon color="violet" textAlign="center">
            Login to HerculesChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                style={{ color: Colors.violet }}
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
                style={{ color: Colors.violet }}
                type="password"
                value={password}
              />

              <CustomButton
                content={"Submit"}
                color={Colors.violet}
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
            Don't have an account?{" "}
            <Link to="/register" className="authenticationLinks">
              Register
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
