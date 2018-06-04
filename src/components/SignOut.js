import React from 'react';
import {auth} from '../firebase'


const SignOutPage = () =>
  <button
  className="btn btn-danger"
  type="button"
  onClick ={auth.doSignOut}
  >
  Sign Out
    
  </button>
 
export default SignOutPage;