import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UserProductsTable from './table';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROLES, API_URL } from '../../../app-constants';
import axios from 'axios';

function UserProducts (props) {
  const { auth, history } = props;
  const [productsList, setProductsList] = useState([])

  useEffect(() => {
    if (ROLES[auth.role] && !props.usersList) axios.get(`${API_URL}/user-products/${auth.uid}`).then(res=>{
      setProductsList(res.data.products)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="add-new-button">
        <Fab onClick={ ()=>history.push('/profile/products/create') } color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
      <UserProductsTable userProductsList={ productsList }/>
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
))(UserProducts);

UserProducts.propTypes = {
  history: PropTypes.object,
  auth: PropTypes.object
};