const initialState = {
  user: {}
}

const GET_USER = 'GET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function getUser(user){
  return {
    type: GET_USER,
    payload: user
  }
}

export function logoutUser(){
  return {
    type: LOGOUT_USER,
    payload: initialState
  }
}

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_USER:
      return {...state, user: action.payload}
    case LOGOUT_USER:
      return {...state, ...action.payload}
    default:
      return state
  }
}