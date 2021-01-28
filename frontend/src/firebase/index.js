/* eslint-disable no-nested-ternary */
import * as firebase from 'firebase';
/*
let firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
*/
const firebaseConfig = {
  apiKey: "AIzaSyDsJ2rnR151CqF8joQIrooJ-ixjvxiR734",
  authDomain: "auction-app-4ae05.firebaseapp.com",
  projectId: "auction-app-4ae05",
  storageBucket: "auction-app-4ae05.appspot.com",
  messagingSenderId: "622809062018",
  appId: "1:622809062018:web:73d220653dee7d4818f29b"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

var storage = firebase.storage();


export { firebase, db, storage };