import React from 'react';
import { ListItem } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Store from '@material-ui/icons/Store';
import People from '@material-ui/icons/People';
import Person from '@material-ui/icons/Person';

import { makeStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { ROLES } from '../../../app-constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '##fff',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function Navbar (props) {
  const classes = useStyles();

  const handleNavigation = page=>{
    page !== '/' ? props.history.push(`/${page}`) : props.history.push('/');
    
  };
  
  const home = props.open ? (
    <ListItem  onClick={ ()=>handleNavigation('/') }  button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
  ) : ( <Tooltip title='Home' arrow placement='right'>
    <ListItem onClick={ ()=>handleNavigation('/') }  button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
  </Tooltip>);


  const users = props.open ? (
    <ListItem onClick={ ()=>handleNavigation('users') } button>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  ) : (<Tooltip title='Users' arrow placement='right'>
    <ListItem onClick={ ()=>handleNavigation('users') } button>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  </Tooltip>);

const profile = props.open ? (
  <ListItem onClick={ ()=>handleNavigation('profile') } button>
    <ListItemIcon>
      <Person />
    </ListItemIcon>
    <ListItemText primary="Profile" />
  </ListItem>
) : (<Tooltip title='Profile' arrow placement='right'>
  <ListItem onClick={ ()=>handleNavigation('profile') } button>
    <ListItemIcon>
      <Person />
    </ListItemIcon>
    <ListItemText primary="Profile" />
  </ListItem>
</Tooltip>);

  const products = props.open ? (
    <ListItem onClick={ ()=>handleNavigation('profile/products') } button>
      <ListItemIcon>
        <Store />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
  ) : (<Tooltip title='Products' arrow placement='right'>
    <ListItem onClick={ ()=>handleNavigation('profile/products') } button>
      <ListItemIcon>
        <Store />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
  </Tooltip>);

  
  return (
    <List className={ classes.root }>
      { home }
      { profile }
      { props.auth.role === ROLES.ADMIN && users }
      { products }
    </List>);
}

const mapStateToProps = state => {
  return ({
    auth: state.authReducer
  });
};
export default compose(withRouter, connect(mapStateToProps, null))(Navbar);

Navbar.propTypes = {
  startLogout: PropTypes.func,
  history: PropTypes.object,
  open: PropTypes.bool

};