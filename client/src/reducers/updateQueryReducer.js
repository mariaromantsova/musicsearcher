const updateQueryReducer = (state = "", action) => {
    switch (action.type) {
      case 'UPDATE_QUERY':
        return action.payload
      default:
        return state;
  }
}

export default updateQueryReducer;
