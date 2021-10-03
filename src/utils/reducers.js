import firebase from 'firebase'

import {
  CALCULATE_IN_OUT,
  FETCH_DATA,
  LOGIN_USER,
  LOGOUT_USER,
  PERSIST_DATA,
  SET_DATA,
} from './actions'

const initialState = {
  loggedIn: false,
  userDetail: {},
  newData: {},
  error: '',
  data: {},
  totalInOut: {},
}

const db = firebase.database()

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
      }
    case LOGOUT_USER:
      firebase.auth().signOut()
      return {
        loggedIn: false,
        userDetail: {},
        newData: {},
        error: '',
        data: {},
      }
    case SET_DATA:
      return {
        ...state,
        userDetail: action.payload.user,
        data: action.payload.snapshot,
      }
    case FETCH_DATA:
      let tempData = {}
      try {
        firebase
          .database()
          .ref(action.payload)
          .on('value', (snapshot) => {
            if (snapshot.exists()) {
              tempData = snapshot.val()
            }
          })
      } catch (err) {
        return { ...state, error: err.message }
      }
      return { ...state, data: tempData }

    case PERSIST_DATA:
      try {
        const nowDate = new Date()
        const today =
          nowDate.getDate() +
          '-' +
          (nowDate.getMonth() + 1) +
          '-' +
          nowDate.getFullYear()

        let newData = {}
        db.ref(`${action.payload.uid}/transactions/${today}`)
          .push(action.payload.entry)
          .on('value', (d) => {
            newData = d
          })
        return { ...state, newData }
      } catch (err) {
        return { ...state, error: err.message }
      }
    case CALCULATE_IN_OUT:
      return { ...state, totalInOut: action.payload }

    default:
      return state
  }
}

export default mainReducer
