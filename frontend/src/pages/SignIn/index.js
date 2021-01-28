import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startLogin } from '../../store/actions/auth';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { startLogin, auth, history } = props;

  useEffect(() => {
    if(auth.uid){
      history.push('/')
    }
  }, [auth])

  const onSubmit = e => {
    e.preventDefault();
    startLogin(email, password);
  };
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  let loginForm
    = auth.error?.code === 'auth/invalid-email'
    || auth.error?.code === 'auth/user-not-found' || auth.error?.code === 'auth/wrong-password' || auth.error?.code === 'auth/user-disabled' ? (
        <>
          <TextField
            color='secondary'
            error
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={ email }
            onChange={ handleEmailChange }
          />
          <TextField
            color='secondary'
            error
            helperText="Incorrect Email/Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={ password }
            onChange={ handlePasswordChange }
          />
        </>
      ) : (
        <>
          <TextField
            color='secondary'
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={ email }
            onChange={ handleEmailChange }
          />
          <TextField
            color='secondary'
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={ password }
            onChange={ handlePasswordChange }
          />
        </>
      );
 
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign-in
        </Typography>
        <form className={ classes.form }>
          { loginForm }
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={ classes.submit }
            onClick={ onSubmit }
          >Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
const mapStateToProps = state => {
  return {
    auth: state.authReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startLogin: (email, password) => {
      dispatch(startLogin(email, password));
    },
  };
};
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(SignIn);
