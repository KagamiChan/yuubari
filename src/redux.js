const initialState = {
  ships: {},
  items: {},
  types: {},
  recipes: {},
  count: 0,
  time: 0,
}

export const Yuubari = (state = initialState, action) => {
  const { type, data } = action
  switch (type) {
    case 'SAVE_DATA2':
    case 'SAVE_RECIPE':
    case 'UPDATE_QUERY':
      return {
        ...state,
        ...data,
      }
    default:
      return state
  }
}

export const saveData2 = data => ({
  type: 'SAVE_DATA2',
  data,
})

export const saveRecipe = data => ({
  type: 'SAVE_RECIPE',
  data,
})

export const updateQuery = query => ({
  type: 'UPDATE_QUERY',
  data: {
    query,
  },
})
