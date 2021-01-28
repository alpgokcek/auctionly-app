import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
import { ROLES, PAGES, API_URL } from '../../../../app-constants';
import Select from '@material-ui/core/Select';
import axios from 'axios';
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

function CreateProduct (props) {

  const {auth} = props;

  const classes = useStyles();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startPrice, setStartPrice] = useState(1);
  const [endTime, setEndTime] = useState('');
  const [images, setImages] = useState(['']);

  function handleChange(i, event) {
    const values = [...images];
    values[i] = event.target.value;
    setImages(values);
  }

  function handleAdd() {
    const values = [...images];
    values.push('');
    setImages(values);
  }

  function handleRemove(i) {
    const values = [...images];
    values.splice(i, 1);
    setImages(values);
  }

  const handleSubmit = () => {
    let data = {
      name,
      description,
      startPrice,
      endTime,
      images,
      seller: auth.uid
    };
    axios.post(`${API_URL}/products`, data).then(res=>{
      props.history.push('/profile/products');
    });
  };

  return (
    <div>
      <IconButton aria-label="go back" onClick={ e=>props.history.push('/profile/products') }>
        <ArrowBackIcon />
      </IconButton>
      <div className="info-panel__first-paper-container">
        <Paper elevation={ 3 }>
          <div className="info-panel">
            <p className="info-panel__header">{ PAGES.USERPRODUCTS.BODY.PRODUCT_INFO }</p>
          </div>
          <div className="info-panel__form-container">
            <Grid container spacing={ 3 }>
              <Grid item xs={ 2 }>
                <p>Product Name</p>
              </Grid>
              <Grid item xs={ 4 }>
                <TextField
                  color='secondary'
                  style={ { width: '80%' } }
                  value={ name }
                  onChange={ e=>setName(e.target.value) }
                  label="Product Name"
                />
              </Grid>
              <Grid item xs={ 2 }>
                <p>Product Description</p>
              </Grid>
              <Grid item xs={ 4 }>
                <TextField
                  color='secondary'
                  style={ { width: '80%' } }
                  value={ description }
                  onChange={ e=>setDescription(e.target.value) }
                  label="Product Description"
                />
              </Grid>
              <Grid item xs={ 2 }>
                <p>Start Price</p>
              </Grid>
              <Grid item xs={ 4 }>
                <TextField
                  type="number"
                  color='secondary'
                  style={ { width: '80%' } }
                  value={ startPrice }
                  onChange={ e=>setStartPrice(Number(e.target.value)) }
                  label="Start Price"
                />
              </Grid>
              
              <Grid item xs={ 2 }>
                <p>End Time</p>
              </Grid>
              <Grid item xs={ 4 }>
                <TextField
                  type="datetime-local"
                  color='secondary'
                  style={ { width: '80%' } }
                  value={ endTime }
                  onChange={ e=>setEndTime(e.target.value) }
                />
              </Grid>
              <Grid item xs={ 2 }>
                <p>Product Images</p>
              </Grid>
              <Grid item xs={ 4 }>
              {images.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
          <TextField
                  type="text"
                  color='secondary'
                  style={ { width: '80%' } }
                  value={ images[idx] }
                  onChange={e => handleChange(idx, e)}
                  label="Product Images"
                />
            <button type="button" onClick={() => handleRemove(idx)}>
              X
            </button>
          </div>
        );
      })}
                
              </Grid>
              <Grid item xs={2}>
              <button type="button" onClick={() => handleAdd()}>
                + 
              </button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
      <div className="add-new-button">
        <Button onClick={ handleSubmit } variant="contained" color="secondary">
        Kaydet
        </Button>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return ({
    auth: state.authReducer
  });
};

export default compose(withRouter, connect(
  mapStateToProps,
  null
))(CreateProduct);

CreateProduct.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  auth: PropTypes.object,
};