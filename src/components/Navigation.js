import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import SignOutPage from './SignOut';
import AuthUserContext from './AuthUserContext';

import * as routes from '../constant/routes';
import { auth } from '../firebase/index';


const Navigation =({ authUser }) =>
        <div>
        { authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
        </div>
            
            
    

const NavigationAuth = () =>
    
        <ul>
            <li><Link to ={routes.SIGN_IN}>Sign In</Link></li>
            <li><Link to ={routes.LANDING}>Landing</Link></li>
            <li><Link to ={routes.HOME}>Home</Link></li>
            <li><Link to ={routes.ACCOUNT}>Account</Link></li>
            <li><SignOutPage /></li>
        </ul>
    
const NavigationNonAuth = () =>
            <ul>
               <li> <Link to = {routes.LANDING}>Landing</Link></li>
                <li><Link to = {routes.SIGN_IN}>Sign in</Link></li>
                
            </ul>

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });

export default connect(mapStateToProps)(Navigation);