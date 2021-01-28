import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { withRouter } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startLogout } from '../../store/actions/auth';
import { compose } from 'redux';

const drawerWidth = 240;

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
      paddingRight: 24,
      display: 'flex',
      justifyContent: 'space-between'
    },
    logo: {
      minWidth: '150px',
      width: '8%',
      alignSelf: 'center'
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: '#fff',
      color: '#E70D55'
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    componentContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    title: {
      flexGrow: 0,
      marginRight:"10px"
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    marginBelow:{
      paddingBottom: "4.2rem"
    }
  }));

function Header(props) {
    const { auth, startLogout, history } = props;
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
      setOpen(true);
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
  const dropdownOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
        <div className={classes.marginBelow}>
            <AppBar
        position="absolute"
        className={ clsx(classes.appBar, open && classes.appBarShift) }
      >
        <Toolbar className={ classes.toolbar }>
        
          <div className={ classes.componentContainer }>
          { props.isProfileRoute &&
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={ handleDrawerOpen }
              className={ clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              ) }
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={ classes.title }
            >
              { props.pageName }
            </Typography>
            </>
            }
          </div>
        
          <img className={ classes.logo } alt="logo" src="/auction-logo.png" onClick={e=>history.push('/')}/>
          
          <div className={ classes.componentContainer }>
          {auth.uid ? 
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Typography
              variant="subtitle2"
              color="inherit"
              noWrap
              className={ classes.title }
            >
              Welcome, 
              <br/>
              <b>{auth.name}</b>
            </Typography>
            <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={dropdownOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={ ()=>history.push("/")}>Home</MenuItem>
                <MenuItem onClick={ ()=>history.push("/profile")}>Profile</MenuItem>
                <MenuItem onClick={ ()=>{
                startLogout() 
                history.push('/')
                }}>Logout</MenuItem>
              </Menu>
            </div>
            :
            <IconButton
              edge="end"
              color="inherit"
              aria-label="logout"
              onClick={ ()=>history.push("/sign-in") }
            >
            <Typography
              variant="subtitle1"
              color="inherit"
              noWrap
              className={ classes.title }
            >
              Login
            </Typography>
              <ExitToApp/>
            </IconButton>


          }
          </div>
        </Toolbar>
      </AppBar>
        </div>
    )
}

Header.propTypes = {
    isProfileRoute: PropTypes.bool,
    startLogout: PropTypes.func,
    history: PropTypes.object
}

Header.defaultProps = {
    isProfileRoute: false
}

const mapDispatchToProps = dispatch => ({
    startLogout: () => dispatch(startLogout())
  });

const mapStateToProps = state => {
    return ({
      auth: state.authReducer
    });
  };
  
  export default compose(withRouter, connect(
    mapStateToProps,
    mapDispatchToProps
  ))(Header);