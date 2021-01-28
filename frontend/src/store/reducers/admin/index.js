/* eslint-disable no-case-declarations */
import {
  GET_USERS_LIST,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  PENDING,
  REJECTED,
  FULFILLED,
} from '../../../app-constants';

const initialState = {
  brandsList: [],
  restaurantsList: [],
  error: null,
  menuCategories: [],
  menuItems: [],
  menusList: [],
  categories: [],
  subCategories: [],
  items: []
};
const adminReducer = (state = initialState, action)=>{
  switch (action.type) {
    case `${GET_USERS_LIST}${PENDING}`:
      return { ...state, usersList: action.payload };
    case `${GET_USERS_LIST}${FULFILLED}`:
      return { ...state, usersList: action.payload };
    case `${GET_USERS_LIST}${REJECTED}`:
      return { ...state, usersList: action.payload };
    case `${CREATE_USER}`:
      return { ...state };
    case `${UPDATE_USER}`:
      return { ...state };
    case `${DELETE_USER}`:
      return { ...state };
    default:
      return state;
  }
};
export default adminReducer;