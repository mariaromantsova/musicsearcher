import updatePlaylistsReducer from './updatePlaylistsReducer'
import updateQueryReducer from './updateQueryReducer'
import updateTagReducer from './updateTagReducer'

import { combineReducers } from 'redux'

export default combineReducers({
  playlists: updatePlaylistsReducer,
  query: updateQueryReducer,
  tags: updateTagReducer
})
