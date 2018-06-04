import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import {auth} from '../firebase';

const PasswordForgetPage = () =>
  <div>
    <h1>Password Forget Page</h1>
    <PasswordForgetForm/>
  </div>

const errorStyle ={
  color: 'red',
  
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE ={
  email: '',
  error: null,
};

class PasswordForgetForm extends Component{
  constructor(props){
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event) =>{
    const {email} = this.state;

    auth.doPasswordReset(email)
    .then(()=>{
      this.setState(()=> ({...INITIAL_STATE}));
    })
    .catch(error => {
      this.setState(byPropKey('error', error));
    });
    event.preventDefault();
  }

 
  render(){
    const{
      email,
      error,
    } = this.state;
    const isInvalid = email === '';
    return(
      <form onSubmit={this.onSubmit}>
      <div className="form-group col-md-6">
      <label for="exampleInputEmail1">Email: </label>
      <input
        className="form-control"
        value={this.state.email}
        onChange={event => this.setState(byPropKey('email', event.target.value))}
        type="text"
        placeholder="Email Address"
      />
      </div>
      <button className="btn btn-warning" disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      { error && <p style={errorStyle}>{'*'+error.message}</p> }
    </form>
    );
  }

}
const PasswordForgetLink = () =>
<p>
  <Link to ="/pw-forget">Forgot Password</Link>
</p>

export default PasswordForgetPage;
export {
  PasswordForgetForm,
  PasswordForgetLink
};