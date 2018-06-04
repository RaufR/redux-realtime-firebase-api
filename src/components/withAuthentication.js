import React, { Component } from 'react';
import {firebase} from '../firebase';
import AuthUserContext from './AuthUserContext';
import { connect } from 'react-redux';


const withAuthentication = (Component) => {
    class withAuthentication extends React.Component{
        constructor(props){
            super(props);

            this.state={
                authUser: null,
            };
        }

        componentDidMount(){
            const { onSetAuthUser } = this.props;
            
            firebase.auth.onAuthStateChanged(authUser => {
                authUser
                ? onSetAuthUser(authUser)
                : onSetAuthUser(null);
            });
        }

        render(){
            return(
                <Component/>
            );
        }
    }

    const mapDispatchToProps = (dispatch) => ({
        onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
      });
      return connect(null, mapDispatchToProps)(withAuthentication);
}

export default withAuthentication;