const initialState = {
  budget: {}
}

const GET_BUDGET = 'GET_BUDGET'
const UPDATE_BUDGET = 'UPDATE_BUDGET'

export function getBudget(budget){
  return {
    type: GET_BUDGET,
    payload: budget
  }
}

export function updateBudget(budget){
  return {
    type: UPDATE_BUDGET,
    payload: budget
  }
}

export default function budgetReducer(state = initialState, action){
  switch(action.type){
    case GET_BUDGET:
      return {...state, budget: action.payload}
    case UPDATE_BUDGET:
      return {...state, budget: action.payload}
    default:
      return state
  }
}