const updatePlaylistsReducer = (state = {playlists: {}}, action) => {
    switch (action.type) {
      // case 'ADD':
      // return [...state, action.payload]
      case 'UPDATE':
      // return state.filter(x => x.name !== action.payload.name)
        return action.payload
      default:
        return state;
  }
}

export default updatePlaylistsReducer;
