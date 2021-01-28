import { LOGIN, REJECTED, LOGOUT } from '../../../app-constants';
const initialState = {
  uid: null,
  error: null
};
const authReducer = (state = initialState, action)=>{
  switch (action.type) {
    case `${LOGIN}${REJECTED}`:
      return { ...state,
        error: action.error };
    case `${LOGIN}`:
      if (action.uid && action.role) {
        return {
          ...state,
          uid: action.uid, token: action.token, role: action.role, name: action.name, email: action.email };
      } break;
    case 'LOGIN_ERROR':
      return { ...state, error: action.payload };
    case `${LOGOUT}`:
      return {
        ...state,
        uid: '' };
    default:
      return state;
  }
};
export default authReducer;