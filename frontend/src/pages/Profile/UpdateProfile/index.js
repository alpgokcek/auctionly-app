import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { API_URL } from '../../../app-constants';


const useStyles = makeStyles(() => ({
  root: {}
}));

const UpdateProfile = ({ className, auth, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    displayName: auth.name||'',
    email: auth.email || '',
    password: '',
    confirm:''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    if (values.password === values.confirm){
      let data = {
        displayName: values.displayName,
        email: values.email,
        password: values.password,
        disabled: false,
        role: auth.role
      }
      axios.patch(`${API_URL}/users/${auth.uid}`, data)
    } else{
      alert("Password entries are not matching!")
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                color="secondary"
                label="First name"
                name="displayName"
                onChange={handleChange}
                required
                value={values.displayName}
                variant="outlined"
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                color="secondary"
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                fullWidth
                color="secondary"
                label="Password"
                margin="normal"
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
            />
          </Grid>
          <Grid
              item
              md={6}
              xs={12}
            >
            <TextField
                color="secondary"
                fullWidth
                label="Confirm password"
                margin="normal"
                name="confirm"
                onChange={handleChange}
                type="password"
                value={values.confirm}
                variant="outlined"
            />
          </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={()=>handleSubmit()}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

const mapStateToProps = state => {
    return ({
      auth: state.authReducer
    });
  };
  
  
  export default connect(mapStateToProps, null)(UpdateProfile);
  
  UpdateProfile.propTypes = {
    children: PropTypes.node,
    startLogout: PropTypes.func,
    auth: PropTypes.object,
    className: PropTypes.string
  
  };
  