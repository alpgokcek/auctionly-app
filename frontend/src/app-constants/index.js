export const REJECTED = '_REJECTED';
export const PENDING = '_PENDING';
export const FULFILLED = '_FULFILLED';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const ROLES = {
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR',
  USER: 'USER'
};

export const API_URL = "http://localhost:4000"

export const CLOUD_FUNCTIONS_BASE_URL = process.env.REACT_APP_CLOUD_FUNCTIONS_BASE_URL ? process.env.REACT_APP_CLOUD_FUNCTIONS_BASE_URL : 'http://localhost:4000';

export const GET_USERS_LIST = 'GET_USERS_LIST';
export const DELETE_USER = 'DELETE_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const PAGES = {
  HOME: {
    TITLES: {
      LIST: 'Ana Sayfa'
    },
  },
  PRODUCTS: {
    TITLES: {
      EDIT: 'Edit Product',
      CREATE: 'Create a Product',
      LIST: 'Products'
    },
    BODY: {
      TABLE: 'Products'
    }
  },
  USERS: {
    TITLES: {
      EDIT: 'Update User',
      CREATE: 'Create User',
      LIST: 'Users'
    },
    BODY: {
      TABLE: 'Users',
      USER_INFO: 'User Info'
    }
  },
  USERPRODUCTS: {
    TITLES: {
      CREATE: 'Create Product',
      LIST: 'Products'
    },
    BODY: {
      TABLE: 'Products',
      PRODUCT_INFO: 'Product Info'
    }
  }
};
