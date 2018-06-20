import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import auth from '../firebase/firebase';
import * as routes from '../constants/routes';

const withAuthorization = authCondition => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      auth.onAuthStateChanged((authUser) => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (authUser ? <Component /> : null)}
        </AuthUserContext.Consumer>
      );
    }
  }

  WithAuthorization.propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  return withRouter(WithAuthorization);
};

export default withAuthorization;
