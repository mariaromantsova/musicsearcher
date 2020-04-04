import updatePlaylistsReducer from './updatePlaylistsReducer'
import updateQueryReducer from './updateQueryReducer'
import { combineReducers } from 'redux'

export default combineReducers({
  playlists: updatePlaylistsReducer,
  query: updateQueryReducer
})
