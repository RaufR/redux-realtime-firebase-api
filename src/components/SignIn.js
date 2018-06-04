import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {SignUpLink, SignUpForm} from './SignUp';
import {PasswordForgetLink} from './PasswordForget';

import {auth} from '../firebase';
import * as routes from '../constant/routes';

const SignInPage = ({history}) => 
  <div> 
    <h1>SignIn</h1>
    <SignInForm history={history}/>
    <PasswordForgetLink/>
    <SignUpLink/>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
const errorStyle ={
  color: 'red',
  
};
class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.props.history.push('/HOME');
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }
  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';
      return (
        <div className="col-md-12">
        <form onSubmit={this.onSubmit}>
        <div className="form-group col-md-6">
        <label for="exampleInputEmail1">Email: </label>
          <input
            className="form-control"
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          </div>
          <div className="form-group col-md-6">
          <label for="exampleInputEmail1">Password: </label>
          <input
            className ="form-control"
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholder="Password"
          />
          </div>
          <button className="btn btn-info" disabled={isInvalid} type="submit">
            Sign In
          </button>
  
          { error && <p style={errorStyle}>{error.message}</p> }
        </form>
        </div>
      );
    }
  }
  export default withRouter(SignInPage);
  
  export {
    SignInForm,
  };