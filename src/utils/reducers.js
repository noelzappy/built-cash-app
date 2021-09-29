import firebase from 'firebase'

import { CREATE_USER, FETCH_DATA } from './actions'

const initialState = {
  loggedIn: false,
  userDetail: {},
  userData: [],
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      console.log(action.payload)
    default:
      return state
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
    //TO DO: Create user in firebase
    default:
      return state.loggedIn
  }
}

export { dataReducer, authReducer }
