const initialState = {
  ships: {},
  items: {},
  types: {},
  recipes: {},
  count: 0,
  time: 0,
  query: '',
}

export const Yuubari = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SAVE_DATA2':
    case 'SAVE_RECIPE':
    case 'UPDATE_QUERY':
      return {
        ...state,
        ...payload,
      }
    default:
      return state
  }
}

export const saveData2 = payload => ({
  type: 'SAVE_DATA2',
  payload,
})

export const saveRecipe = payload => ({
  type: 'SAVE_RECIPE',
  payload,
})

export const updateQuery = query => ({
  type: 'UPDATE_QUERY',
  payload: {
    query,
  },
})
