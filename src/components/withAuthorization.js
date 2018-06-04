import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';
import * as routes from  '../constant/routes';

const withAuthorization = (authCondition) => (Component) => {
  class withAuthorization extends React.Component {
      
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
          //this.props.history.push('/HOME');
        }
      });
    }

    render() {
      return this.props.authUser ? <Component /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });
  return compose(
    withRouter,
    connect(mapStateToProps),
  )(withAuthorization);
}
  

export default withAuthorization;