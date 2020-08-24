const initialState = {
  user_id: 0,
  username: '',
  profile_pic: '',
  savings_id: '',
  overall: '',
  budget_id: '',
  monthly: ''
}

const GET_USER = 'GET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

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

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_USER:
      return {...state, ...action.payload}
    case LOGOUT_USER:
      return {...state, ...action.payload}
    default:
      return state
  }
}