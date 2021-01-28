import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Layout from '../Layout';
import ProfileLayout from '../ProfileLayout';


function RestrictedRoute  ({ component: Component, auth, roles, isProfileRoute, ...allProps }) {
  return (
    <Route { ...allProps }
      render={ props => {
        return (
          roles.includes(auth.role)
            ? (<div className={ `wrapper wrapper--${allProps.panel}` }>
            { isProfileRoute ? 
              <ProfileLayout pageName={ allProps.pageName }>
                <div className="page-container">
                  <Component { ...allProps } match={ props.match } />
                </div>
              </ProfileLayout>
            :
              <Layout pageName={ allProps.pageName }>
                <div className="page-container">
                  <Component { ...allProps } match={ props.match } />
                </div>
              </Layout>
            }
            </div>)
            : <Redirect to={ '/' } />
        )
        ;
      } }
    />
  );
}

RestrictedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func
  ]),
  roles: PropTypes.array,
  match: PropTypes.object,
  isProfileRoute: PropTypes.bool
};

const mapStateToProps = state => {
  return ({
    auth: state.authReducer
  });
};

export default connect(
  mapStateToProps,
  null
)(RestrictedRoute);
