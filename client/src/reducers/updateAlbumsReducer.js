const updateAlbumsReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD':
      return [...state, action.payload]
      case 'REMOVE':
        return state.filter(x => x.name !== action.payload.name)
      default:
        return state;
  }
}

export default updateAlbumsReducer;
