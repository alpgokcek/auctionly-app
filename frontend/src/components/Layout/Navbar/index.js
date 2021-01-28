import React from 'react';
import { ListItem } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import Store from '@material-ui/icons/Store';
import People from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles';

import LayersIcon from '@material-ui/icons/Layers';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CreateIcon from '@material-ui/icons/Create';
import ClassIcon from '@material-ui/icons/Class';
import MenuBookIcon from '@material-ui/icons/MenuBook';
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
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleNavigation = page=>{
    props.history.push(`/${page}`);
  };
  
  const home = props.open ? (
    <ListItem  onClick={ ()=>handleNavigation('home') }  button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Ana Sayfa" />
    </ListItem>
  ) : ( <Tooltip title='Ana Sayfa' arrow placement='right'>
    <ListItem onClick={ ()=>handleNavigation('home') }  button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Ana Sayfa" />
    </ListItem>
  </Tooltip>);


  const users = props.open ? (
    <ListItem onClick={ ()=>handleNavigation('users') } button>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Kullanıcılar" />
    </ListItem>
  ) : (<Tooltip title='Kullanıcılar' arrow placement='right'>
    <ListItem onClick={ ()=>handleNavigation('users') } button>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Kullanıcılar" />
    </ListItem>
  </Tooltip>);

  const brands = props.open ? (
    <ListItem onClick={ ()=>handleNavigation('brands') } button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Markalar" />
    </ListItem>
  ) : (<Tooltip title='Markalar' arrow placement='right'>
    <ListItem onClick={ ()=>handleNavigation('brands') } button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Markalar" />
    </ListItem>
  </Tooltip>);

  const restaurants = props.open ? (
    <ListItem onClick={ ()=>handleNavigation('restaurants') } button>
      <ListItemIcon>
        <Store />
      </ListItemIcon>
      <ListItemText primary="Restoranlar" />
    </ListItem>
  ) : (<Tooltip title='Restoranlar' arrow placement='right'>
    <ListItem onClick={ ()=>handleNavigation('restaurants') } button>
      <ListItemIcon>
        <Store />
      </ListItemIcon>
      <ListItemText primary="Restoranlar" />
    </ListItem>
  </Tooltip>);

  const menus = props.open ? (
    <>
      <ListItem onClick={ handleClick } button>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Menüler" />
        { open ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={ open } timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={ classes.nested } onClick={ ()=>handleNavigation('menus') }>
            <ListItemIcon>
              <RestaurantMenu />
            </ListItemIcon>
            <ListItemText primary="Menüler" />
          </ListItem>
          <ListItem button className={ classes.nested } onClick={ ()=>handleNavigation('menu-categories') }>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="Kategoriler" />
          </ListItem>
          <ListItem button className={ classes.nested }  onClick={ ()=>handleNavigation('menu-items') }>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Menü Kalemleri" />
          </ListItem>
        </List>
      </Collapse>
    </>
  ) : (<>
  <Tooltip title='Menüler' arrow placement='right'>
    <ListItem onClick={ ()=>handleNavigation('menus') } button>
      <ListItemIcon>
        <RestaurantMenu />
      </ListItemIcon>
      <ListItemText primary="Menüler" />
    </ListItem>
  </Tooltip>
  <Tooltip title='Kategoriler' arrow placement='right'>
    <ListItem onClick={ ()=>handleNavigation('menu-categories') } button>
      <ListItemIcon>
      <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="Kategoriler" />
    </ListItem>
  </Tooltip>
  <Tooltip title='Menü Kalemleri' arrow placement='right'>
    <ListItem onClick={ ()=>handleNavigation('menu-items') } button>
      <ListItemIcon>
      <CreateIcon />
      </ListItemIcon>
      <ListItemText primary="Menü Kalemleri" />
    </ListItem>
  </Tooltip>
  </>);

  
  return (
    <List className={ classes.root }>
      { home }
      { props.auth.role === ROLES.SUPER_ADMIN ? users : undefined }
      { props.auth.role === ROLES.SUPER_ADMIN || props.auth.role === ROLES.BRAND_ADMIN ? brands : undefined }
      { restaurants }
      { menus }
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