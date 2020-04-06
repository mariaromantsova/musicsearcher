export const updatePlaylists = (playlists) => {
  return {
    type: 'UPDATE_PLAYLISTS',
    payload: playlists
  }
}

export const updateQuery = (query) => {
  return {
    type: 'UPDATE_QUERY',
    payload: query
  }
}

export const updateTag = (tag) => {
  return {
    type: 'UPDATE_TAG',
    payload: tag
  }
}
// export const addAlbum = (playlist) => {
//   return {
//     type: 'ADD',
//     payload: playlist
//   }
// }
//
// export const removeAlbum = (playlist) => {
//   return {
//     type: 'REMOVE',
//     payload: playlist
//   }
// }
