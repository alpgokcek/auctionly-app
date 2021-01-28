import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import RestrictedRoute from './components/RestrictedRoute';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Home from './pages/Home';

import Users from './pages/Users';
import EditUser from './pages/Users/edit';

import Products from './pages/Products';
//import EditBrand from './pages/brands/edit';

import { ROLES, PAGES } from './app-constants';
import { createBrowserHistory } from 'history';
import UpdateProfile from './pages/Profile/UpdateProfile';
import UserProducts from './pages/Profile/Products';
import CreateProduct from './pages/Profile/Products/edit';


import ProductDetail  from './pages/ProductDetail';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={ history }>
    <div>
      <Switch>
      <Route path="/" exact component={ Home } pageName={ PAGES.HOME.TITLES.LIST } />

        <Route path="/sign-in" exact component={ SignIn } />
        <Route path="/sign-up" exact component={ SignUp } />
        <Route path="/products" exact component={ Products } pageName={ PAGES.PRODUCTS.TITLES.LIST } />
        <Route path="/products/:id" exact component={ ProductDetail } pageName={ PAGES.PRODUCTS.TITLES.LIST } />
        <RestrictedRoute path="/profile/products" exact isProfileRoute component={UserProducts} roles={ [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER] } pageName={ PAGES.PRODUCTS.TITLES.LIST } />
        <RestrictedRoute path="/profile/products/create" exact isProfileRoute component={CreateProduct} roles={ [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER] } pageName={ PAGES.PRODUCTS.TITLES.LIST } />
        <RestrictedRoute path="/profile/update" exact isProfileRoute component={UpdateProfile} roles={ [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER] } pageName={ PAGES.PRODUCTS.TITLES.LIST } />
        <RestrictedRoute path="/profile" exact isProfileRoute component={UpdateProfile} roles={ [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER] } pageName={ PAGES.PRODUCTS.TITLES.LIST } />
        <RestrictedRoute path="/users" exact isProfileRoute component={ Users } roles={ [ROLES.ADMIN] } pageName={ PAGES.USERS.TITLES.LIST } />
        <RestrictedRoute path="/users/edit/:id" isProfileRoute exact component={ EditUser } roles={ [ROLES.ADMIN] } pageName={ PAGES.USERS.TITLES.EDIT } />
        <RestrictedRoute path="/users/create" isProfileRoute exact component={ EditUser } roles={ [ROLES.ADMIN] } pageName={ PAGES.USERS.TITLES.CREATE } />
        {/*
        <RestrictedRoute path="/users" exact component={ Users } roles={ [ROLES.SUPER_ADMIN] } pageName={ PAGES.USERS.TITLES.LIST } />
        <RestrictedRoute path="/users/edit/:id" exact component={ EditUser } roles={ [ROLES.SUPER_ADMIN] } pageName={ PAGES.USERS.TITLES.EDIT } />
        <RestrictedRoute path="/users/create" exact component={ EditUser } roles={ [ROLES.SUPER_ADMIN] } pageName={ PAGES.USERS.TITLES.CREATE } />
        <RestrictedRoute path="/product/create" exact component={ EditBrand } roles={ [ROLES.SUPER_ADMIN] } pageName={ PAGES.BRANDS.TITLES.CREATE } />
        */    }
      </Switch>
    </div>
  </Router>
);
export default AppRouter;
