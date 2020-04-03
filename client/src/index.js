import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import axios from 'axios';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import { updatePlaylists } from './actions';
import updatePlaylistsReducer from './reducers/updatePlaylistsReducer';

import "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";


const store = createStore(
  updatePlaylistsReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


// axios.get('/api/users/' + JSON.parse(localStorage.getItem('userData')).userId + '/playlists')
// .then(res => {
//   console.log(res.data);
//   store.dispatch(updatePlaylists({playlists: res.data}))
// })
// .catch(err => console.log(err))

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
