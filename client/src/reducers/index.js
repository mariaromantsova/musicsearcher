import updateAlbumsReducer from './updateAlbumsReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
  addedAlbums: updateAlbumsReducer,
})

export default allReducers;
