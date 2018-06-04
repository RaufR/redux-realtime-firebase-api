import React, { Component } from 'react';

import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const errorStyle ={
  color: 'red',
  
};

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '';


    return (
      <form onSubmit={this.onSubmit}>
      <div className="form-group col-md-6">
      <label for="exampleInputEmail1">Password: </label>
        <input
          className ="form-control"
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="New Password"
        />
        </div>

        <div className="form-group col-md-6">
        <label for="exampleInputEmail1">Confirm Password: </label>
        <input
          className="form-control"
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm New Password"
        />
        </div>
        <button className="btn btn-success" disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        { error && <p style={errorStyle}>{'*'+error.message}</p> }
      </form>
    );
  }
}

export default PasswordChangeForm;