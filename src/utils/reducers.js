import firebase from 'firebase'

import { FETCH_DATA, LOGIN_USER, PERSIST_DATA, SET_DATA } from './actions'

const initialState = {
  loggedIn: false,
  userDetail: {},
  newData: {},
  error: '',
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

    default:
      return state
  }
}

export default mainReducer
