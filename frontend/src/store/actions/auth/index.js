import { firebase } from '../../../firebase/index';
import { LOGIN, LOGOUT } from '../../../app-constants';

export const login = (uid, token, role, name, email, restaurants, brands) => ({
  type: `${LOGIN}`,
  uid,
  token,
  role,
  name,
  email,
  restaurants,
  brands
});
export const startLogin = (email, password)=>{
  return dispatch=>{
    return firebase.auth().signInWithEmailAndPassword(
      email,
      password
    ).then(user=>{
      login(user.id);
    })
      .catch(error=>{
        dispatch({ type: 'LOGIN_ERROR', payload: error });
      });
  };
};

export const logout = () => ({
  type: `${LOGOUT}`
});
export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};