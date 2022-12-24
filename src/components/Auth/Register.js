import React from "react";
import firebase from '../../firebase'
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { HerculesMedalLogo } from "../../globals/Images";

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: []
  };

  isFormValid = () => {

    let errors = []

    let error
    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in all the fields!' }
      this.setState({ errors: errors.concat(error) })
      return false
    }
    else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password is not valid!' }
      this.setState({ errors: errors.concat(error) })
      return false
    } else {
      return true
    }
  }

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length
  }

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) { return false }

    else if (password !== passwordConfirmation) {
      return false
    }
    else {
      return true
    }
  }

  displayErrors = (errors) => {
    return errors.map((error, i) => <p key={i}>{error.message}</p>)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.isFormValid()) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(createdUser => console.log(createdUser)).catch(err => console.log(err))
    }
  }

  render() {
    const { username, email, password, passwordConfirmation, errors } = this.state


    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }} >
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: "33%", marginBottom: '-40px' }}>
            <Image src={HerculesMedalLogo} size='small' alt='logo' />
          </div>
          <Header as="h2" icon color="orange" textAlign="center">
            Register for HerculesChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
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
                onChange={this.handleChange}
                type="password"
                value={password}
              />

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                type="password"
                value={passwordConfirmation}
              />

              <Button color="orange" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error:</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
