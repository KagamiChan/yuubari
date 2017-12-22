const initialState = {
  ships: {},
  items: {},
  types: {},
  recipes: [],
  count: 0,
  time: 0,
  query: '',
}

export const Yuubari = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'UPDATE_DATA':
    case 'UPDATE_QUERY':
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}

export const updateData = payload => ({
  type: 'UPDATE_DATA',
  payload,
})

export const updateQuery = query => ({
  type: 'UPDATE_QUERY',
  payload: {
    query,
  },
})
