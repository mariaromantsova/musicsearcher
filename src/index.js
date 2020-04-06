import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import axios from 'axios';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import { updatePlaylists } from './actions';
import allReducer from './reducers/index';

import "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";


const store = createStore(
  allReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


// //action
// const increment = () => {
//   return {
//     type: 'INCREMENT'
//   }
// }
//
// const decrement = () => {
//   return {
//     type: 'DECREMENT'
//   }
// }
//
// //reducer
// const counter = (state = 0, action) => {
//     switch (action.type) {
//       case 'INCREMENT':
//         return state + 1;
//       case 'DECREMENT':
//         return state - 1;
//   }
// }
//
//
// let store = createStore(counter)
// //log
// store.subscribe(() => console.log(store.getState()))
//
// //dispatch
// store.dispatch(increment())
// store.dispatch(decrement())



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
