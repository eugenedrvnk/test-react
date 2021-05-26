import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";

firebase.initializeApp({
  apiKey: "AIzaSyAWKizA18tgAkzR-iZqU5hFdVH5vAQMiiA",
  authDomain: "react-test-12d21.firebaseapp.com",
  projectId: "react-test-12d21",
  storageBucket: "react-test-12d21.appspot.com",
  messagingSenderId: "614789708124",
  appId: "1:614789708124:web:fe8ed11d8f2c57ff912999"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
