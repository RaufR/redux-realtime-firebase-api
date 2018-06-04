import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from './withAuthorization';
import {db} from '../firebase';

class HomePage extends Component{
  constructor(props){
    super(props);

    this.state ={
      users : null
        };
  }
  componentDidMount() {
    const { onSetUsers } = this.props;
    
        db.onceGetUsers().then(snapshot =>
          onSetUsers(snapshot.val())
        );
  }

  render(){
  const { users } = this.props;

    return(
      <div>
        <h1>Home</h1>
        <p>Home is accessible by every users</p>
        {!!users && <UserList users ={users}/>}

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  users: state.userState.users,
});
const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

const UserList = ({users}) =>
<div>
  <h2>List of username of users.</h2>
  <p>(Saved on sign in time)</p>
  {Object.keys(users).map(key =>
    <div key={key}>{users[key].username}</div>
    
  )}

</div>

const authCondition =(authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);


