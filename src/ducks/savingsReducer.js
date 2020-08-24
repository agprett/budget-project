const initialState = {}

const GET_SAVINGS = 'GET_SAVINGS'

export function getSavings(savings) {
  return {
    type: GET_SAVINGS,
    payload: savings
  }
}

export default function savingsReducer(state = initialState, action) {
  switch(action.type){
    case GET_SAVINGS:
      return {...state, ...action.payload}
    default:
      return state
  }
}