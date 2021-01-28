import MaterialTable from 'material-table';
import React from 'react';
import PropTypes from 'prop-types';
import { PAGES } from '../../../app-constants';
import { withRouter } from 'react-router-dom';
function UsersTable (props) {
  const { usersList, history } = props;
 
  return (
    <div className="table-container">
      <MaterialTable
        color='secondary'
        localization={ {
          header: {
            actions: 'Actions',
          },
          body: {
            emptyDataSourceMessage: 'Please refresh the page.'
          },
          toolbar: {
            searchPlaceholder: 'Search'
          }
        } }
        title={ PAGES.USERS.BODY.TABLE }
        columns={ [
          { title: 'Name Surname', field: 'displayName' },
          { title: 'Email', field: 'email' },
          { title: 'Status', field: 'accountStatus' },
          { title: 'Role', field: 'role' }
        ] }
        data={ usersList }
        actions={ [
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData) =>
              history.push(`/users/edit/${rowData.uid}`),
          },
        ] }
        options={ {
          actionsColumnIndex: -1,
          rowStyle: {
            backgroundColor: '#fff'
          },
          headerStyle: {
            backgroundColor: '#E70D55',
            color: '#FFF'
          },
          searchFieldStyle: {
            color: 'red',
            '&:hover': {
              color: 'red'
            }
          }
        } }
      />
    </div>
  );
}

export default withRouter(UsersTable);

UsersTable.propTypes = {
  usersList: PropTypes.array,
  history: PropTypes.object,
  deleteUser: PropTypes.func,
  setOpen: PropTypes.func,
  setDeletedRowData: PropTypes.func
};