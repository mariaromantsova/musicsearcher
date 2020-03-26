import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers';

const store = createStore(
  allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
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
serviceWorker.unregister();
