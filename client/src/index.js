import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import 'resources/styles/styles.css'
import { Provider } from 'react-redux';
import ReduxStore from 'store';

const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log('Render root with Provider store=ReduxStore')
root.render(
  <React.StrictMode>
    <Provider store={ReduxStore()}>
      <Router />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
