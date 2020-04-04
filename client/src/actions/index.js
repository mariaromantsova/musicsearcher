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
