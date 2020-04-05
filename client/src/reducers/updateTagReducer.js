const updateTagReducer = (state = [], action) => {
    switch (action.type) {
      case 'UPDATE_TAG':
        return [...new Set([...state, action.payload])]
      default:
        return state;
  }
}

export default updateTagReducer;
