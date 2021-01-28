import {
  GET_USERS_LIST,
  CLOUD_FUNCTIONS_BASE_URL,

} from '../../../app-constants';
import axios from 'axios';


export const getUsersList = token => {
  return dispatch => {
    return Promise.resolve(dispatch({
      type: GET_USERS_LIST,
      payload: axios.get(`${CLOUD_FUNCTIONS_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        return res.data.users;
      })
    })
    );
  };
};

export const deleteUser = (token, id) => {
  return dispatch => {
    axios.delete(`${CLOUD_FUNCTIONS_BASE_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      return dispatch(getUsersList(token));
    });
  };
};

export const createUser = (token, data) => {
  return dispatch => {
    axios.post(`${CLOUD_FUNCTIONS_BASE_URL}/users`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      return dispatch(getUsersList(token));
    });
  };
};

export const updateUser = (token, id, data) => {
  return dispatch => {
    axios.patch(`${CLOUD_FUNCTIONS_BASE_URL}/users/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      return dispatch(getUsersList(token));
    });
  };
};
