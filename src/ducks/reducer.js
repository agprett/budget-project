const initialState = {
  user: {}
}

const GET_USER = 'GET_USER'

export function getUser(user){
  return {
    type: GET_USER,
    payload: user
  }
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case GET_USER:
      return {...state, user: action.payload}
    default:
      return initialState
  }
}