import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {auth, db} from '../firebase';

import * as routes from '../constant/routes';



const SignUpPage = ({ history }) =>
<div>
  <h1>Please Fill your details here</h1>
  <SignUpForm history={history} />
</div>

const errorStyle ={
  color: 'red',
  
};

const INITIAL_STATE ={
  username: '',
  email:'',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (proppertyName, value) => () => ({
  [proppertyName]:value,
});

class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event) =>{
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.state;

    auth.doCreateUserWithEmailAndPassword(email,passwordOne)
      .then(authUser => {


        db.doCreateUser(authUser.uid, username, email)
        .then(()=> {
          this.setState(() => ({...INITIAL_STATE}));
          this.props.history.push('/HOME');
          //history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
        
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
      event.preventDefault();

  }
  render(){
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const IsInValid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email ==='' ||
      username === '';

    return (
      <div className="col-md-12">
      <form onSubmit ={this.onSubmit}> 
        <div className="form-group col-md-6">
        <label for="exampleInputEmail1">UerName: </label>
          <input
          className="form-control"
          value = {username}
          onChange = {event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder = "Please Enter your name!"
          />
          </div>
         
          <div className="form-group col-md-6">
          <label for="exampleInputEmail1">Email: </label>
          <input
          className="form-control"
          value = {email}
          onChange = {event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder = "Please Enter your email!"
          />
          </div>

          <div className="form-group col-md-6">
          <label for="exampleInputEmail1">Password: </label>
          <input
          className="form-control"
          value = {passwordOne}
          onChange = {event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder = "Please Enter Password!"
          />
          </div>
          <div className="form-group col-md-6">
          <label for="exampleInputEmail1">Confirm Password: </label>
          <input
          className="form-control"
          value = {passwordTwo}
          onChange = {event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder = "Please Enter password again"
          />
          </div>
          <button className="btn btn-success " disabled={IsInValid} type ="submit">Sign Up
          </button>

          {error && <p style = {errorStyle}>{'*' + error.message}</p>}     
          
      </form>
      </div>
    );
  }
} 

const SignUpLink = () => 
  <p>
    Do not have a account! 
    {' '}
    <Link to ={routes.SIGN_UP}>Sign Up</Link>
  </p>

  export default withRouter(SignUpPage);

  export {
    SignUpForm,
    SignUpLink,
  }