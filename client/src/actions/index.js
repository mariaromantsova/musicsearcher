export const addAlbum = (album) => {
  return {
    type: 'ADD',
    payload: album
  }
}

export const removeAlbum = (album) => {
  return {
    type: 'REMOVE',
    payload: album
  }
}
