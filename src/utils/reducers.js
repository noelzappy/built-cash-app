import firebase from 'firebase'

import { FETCH_DATA, LOGIN_USER, SET_DATA } from './actions'

const initialState = {
  loggedIn: false,
  userDetail: {},
  transaction: {},
  base: { data: {}, user: {} },
  data: {},
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
      }
    case SET_DATA:
      return {
        ...state,
        userDetail: action.payload.user,
        data: action.payload.snapshot,
      }
    case FETCH_DATA:
      let tempData = {}
      firebase
        .database()
        .ref(action.payload)
        .on('value', (snapshot) => {
          if (snapshot.exists()) {
            tempData = snapshot.val()
          }
        })
      return { ...state, data: tempData }
    default:
      return state
  }
}

export default mainReducer
