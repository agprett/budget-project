const initialState = {
  current: {weekly: 0, monthly: 0},
  budget: {monthly: 0, weekly: 0, personal: 0, groceries: 0, travel: 0, other: 0}
}

export default function expenseReducer(state = initialState, action){
  switch(action.type){
    default:
      return initialState
  }
}