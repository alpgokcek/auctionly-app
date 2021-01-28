import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import UsersTable from './table';
import { getUsersList, deleteUser } from '../../store/actions';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROLES } from '../../app-constants';

function Users (props) {
  const { getUsersList, auth, history, usersList } = props;
  const [open, setOpen] = useState(false);
  const [deletedRowData, setDeletedRowData] = useState({});
  useEffect(() => {
    if (ROLES[auth.role] && !props.usersList) getUsersList(auth.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUsersList]);
  return (
    <div>
      <div className="add-new-button">
        <Fab onClick={ ()=>history.push('/users/create') } color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
      <UsersTable setDeletedRowData={ setDeletedRowData } setOpen={ setOpen } usersList={ usersList }/>
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
    getUsersList: token => {
      dispatch(getUsersList(token));
    },
    deleteUser: (role, brand) => {
      dispatch(deleteUser(role, brand));
    },
  };
};
export default compose(withRouter, connect(
  mapStateToProps,
  mapDispatchToProps
))(Users);

Users.propTypes = {
  history: PropTypes.object,
  usersList: PropTypes.array,
  auth: PropTypes.object,
  getUsersList: PropTypes.func,
  deleteUser: PropTypes.func
};