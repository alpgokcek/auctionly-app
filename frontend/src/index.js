import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './AppRouter';
import configureStore from './store/index';
import { login, logout } from './store/actions/auth';
import { firebase } from './firebase/index';
import Loading from './components/loading';
import { ROLES } from './app-constants';

const store = configureStore();
const jsx = (
  <Provider store={ store }>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

ReactDOM.render(<Loading/>, document.getElementById('root'));

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    await user.getIdTokenResult().then(res=>{
      if (ROLES[res.claims.role]) {
        user.getIdToken().then(token=>{
          store.dispatch(login(user.uid, token, res.claims.role, res.claims.name, res.claims.email, res.claims.restaurants, res.claims.brands));
          renderApp();
        });
        
      } else {
        store.dispatch(logout());
        renderApp();
      }
    });
    
  } else {
    store.dispatch(logout());
    renderApp();
  }
});
