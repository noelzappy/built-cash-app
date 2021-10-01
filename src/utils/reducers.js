import firebase from 'firebase'

import { FETCH_DATA, LOGIN_USER, PERSIST_DATA, SET_DATA } from './actions'

const initialState = {
  loggedIn: false,
  userDetail: {},
  transaction: {},
  base: { data: {}, user: {} },
  data: {},
}

const db = firebase.database()

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

    case PERSIST_DATA:
      let newData = {}
      db.ref(action.payload.details.uid + '/transactions')
        .push(action.payload.details.data)
        .then((d) => {
          newData = d
        })
      return { ...state, data: newData }
    default:
      return state
  }
}

export default mainReducer
