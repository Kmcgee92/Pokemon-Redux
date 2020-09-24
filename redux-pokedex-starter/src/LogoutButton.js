import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {thunks} from './store/authentication';

const LogoutButton = (props) => {
    if (props.loggedOut) {
      return <Redirect to="/login" />;
    }
    return (
      <div id="logout-button-holder">
        <button onClick={props.logout}>Logout</button>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    loggedOut: !state.authentication.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {dispatch(thunks.logout())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
