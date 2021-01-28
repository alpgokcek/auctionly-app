import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { updateUser, createUser } from '../../../store/actions';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { ROLES, PAGES } from '../../../app-constants';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(10),
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function EditUser (props) {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState('false');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Seçiniz');

  const [items, setItems] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);

  useEffect(() => {
    const userObj = props.usersList?.find(user => {
      return user.uid === props.match.params.id;
    });
    if (userObj) {
      setUser(userObj);
      setRole(userObj.role);
      setDisplayName(userObj.displayName);
      setEmail(userObj.email);
      setDisabled(!userObj.disabled ? 'false' : 'true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.restaurantsList]);
  const handleSubmit = () => {
    let data = {
      displayName,
      email,
      disabled: disabled === 'true',
      role
    };
    if (password) data['password'] = password;
    if (user) props.updateUser(props.auth.token, user.uid, data);
    else props.createUser(props.auth.token, data);
    props.history.push('/users');
  };
  const handleRoleSelection = e => {
    const newRole = e.target.value;
    setRole(newRole);
  };

  return (
    <div>
      <IconButton aria-label="go back" onClick={ e=>props.history.push('/users') }>
        <ArrowBackIcon />
      </IconButton>
      <div className="info-panel__first-paper-container">
        <Paper elevation={ 3 }>
          <div className="info-panel">
            <p className="info-panel__header">{ PAGES.USERS.BODY.USER_INFO }</p>
          </div>
          <div className="info-panel__form-container">
            <Grid container spacing={ 3 }>
              <Grid item xs={ 2 }>
                <p>Name Surname</p>
              </Grid>
              <Grid item xs={ 4 }>
                <TextField
                  color='secondary'
                  style={ { width: '80%' } }
                  value={ displayName }
                  onChange={ e=>setDisplayName(e.target.value) }
                  label="Name Surname *"
                />
              </Grid>
              <Grid item xs={ 2 }>
                <p>Email</p>
              </Grid>
              <Grid item xs={ 4 }>
                <TextField
                  color='secondary'
                  style={ { width: '80%' } }
                  inputProps={ { 'aria-label': 'email' } }
                  value={ email }
                  onChange={ e=>setEmail(e.target.value) }
                  label="Email *"
                />
              </Grid>
              <Grid item xs={ 2 }>
                <p>Status</p>
              </Grid>
              <Grid item xs={ 4 }>
                <FormControl component="fieldset">
                  <RadioGroup name="status" row value={ disabled } onChange={ e=>setDisabled(e.target.value) }>
                    <FormControlLabel value="false" control={ <Radio /> } label="Aktif" />
                    <FormControlLabel value="true" control={ <Radio /> } label="Pasif" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={ 2 }>
                <p>Password</p>
              </Grid>
              <Grid item xs={ 4 }>
                <TextField
                  color='secondary'
                  style={ { width: '80%' } }
                  value={ password }
                  helperText='Must be at least 6 characters.'
                  onChange={ e=>setPassword(e.target.value) }
                  inputProps={ {
                    autoComplete: 'new-password',
                    form: {
                      autoComplete: 'off',
                    },
                  } }
                  type="password"
                  label={ `Password ${user ? '' : '*'}` }
                />
              </Grid>
              <Grid item xs={ 2 }>
                <p>Role</p>
              </Grid>
              <Grid item xs={ 4 }>
                <FormControl className={ classes.formControl } style={ { width: '80%' } }>
                  <Select
                    color='secondary'
                    value={ role }
                    onChange={ handleRoleSelection }
                  >
                    <MenuItem value="Please select" disabled>
                      Select *
                    </MenuItem>
                    { Object.keys(ROLES).map(role =>{
                      return (<MenuItem key={ role } value={ role }>{ role }</MenuItem>);
                    }) }
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
      <div className="add-new-button">
        <Button disabled={ !(displayName && email && role !== 'Please select' && email.includes('@') && ((user && !password) || password.length > 5)) } onClick={ handleSubmit } variant="contained" color="secondary">
        Kaydet
        </Button>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return ({
    usersList: state.adminReducer.usersList,
    auth: state.authReducer
  });
};
const mapDispatchToProps = dispatch => {
  return {
    updateUser: (token, id, data) => {
      dispatch(updateUser(token, id, data));
    },
    createUser: (token, data) => {
      dispatch(createUser(token, data));
    }
  };
};
export default compose(withRouter, connect(
  mapStateToProps,
  mapDispatchToProps
))(EditUser);

EditUser.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  usersList: PropTypes.array,
  auth: PropTypes.object,
  updateUser: PropTypes.func,
  createUser: PropTypes.func
};