import MaterialTable from 'material-table';
import React from 'react';
import PropTypes from 'prop-types';
import { PAGES } from '../../../../app-constants';
import { withRouter } from 'react-router-dom';

function UserProductsTable (props) {
  const { userProductsList, history } = props;
 
  return (
    <div className="table-container">
      <MaterialTable
        color='secondary'
        localization={ {
          header: {
            actions: '',
          },
          body: {
            emptyDataSourceMessage: 'Please refresh the page.'
          },
          toolbar: {
            searchPlaceholder: 'Search'
          }
        } }
        title={ PAGES.USERPRODUCTS.BODY.TABLE }
        columns={ [
          { title: 'Name', field: 'name' },
          { title: 'Start Price', field: 'startPrice' },
          { title: 'Current Price', field: 'currentPrice' },
          { title: 'State', field: 'state' }
        ] }
        data={ userProductsList }
        actions={ [
          {
            icon: 'visibility',
            tooltip: 'Check out',
            onClick: (event, rowData) =>
              history.push(`/products/${rowData.id}`),
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

export default withRouter(UserProductsTable);

UserProductsTable.propTypes = {
  userProductsList: PropTypes.array,
  history: PropTypes.object,
  deleteUser: PropTypes.func
};
