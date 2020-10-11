const initialState = {
  user: {},
  // budget: {},
  // savings: {},
  // debts: {},
  // expenses: {},
  // recurring: {}
}

const GET_USER = 'GET_USER'
const LOGOUT_USER = 'LOGOUT_USER'
// const GET_RECURRING = 'GET_RECURRING'
// const GET_BUDGET = 'GET_BUDGET'
// const GET_DEBT = "GET_DEBT"
// const GET_SAVINGS = "GET_SAVINGS"
// const GET_EXPENSES = "GET_EXPENSES"

export function getUser(userInfo){
  return {
    type: GET_USER,
    payload: userInfo
  }
}

export function logoutUser(){
  return {
    type: LOGOUT_USER,
    payload: initialState
  }
}

// export function getRecurring(recurring){
//   return {
//     type: GET_RECURRING,
//     payload: recurring
//   }
// }

// export function getSavings(savings){
//   return {
//     type: GET_SAVINGS,
//     payload: savings
//   }
// }

// export function getDebt(debt){
//   return {
//     type: GET_DEBT,
//     payload: debt
//   }
// }

// export function getBudget(budget){
//   return {
//     type: GET_BUDGET,
//     payload: budget
//   }
// }

// export function getExpenses(expenses){
//   return  {
//     type: GET_EXPENSES,
//     payload: expenses
//   }
// }

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_USER:
      return {...state, user: action.payload}
    case LOGOUT_USER:
      return {...state, ...action.payload}
    // case GET_RECURRING:
    //   return {...state, recurring: action.payload}
    // case GET_BUDGET:
    //   return {...state, budget: action.payload}
    // case GET_SAVINGS:
    //   return {...state, savings: action.payload}
    // case GET_DEBT:
    //   return {...state, debt: action.payload}
    // case GET_EXPENSES:
    //   return {...state, expenses: action.payload}
    default:
      return state
  }
}