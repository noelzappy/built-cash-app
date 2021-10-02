import firebase from 'firebase'

import { FETCH_DATA, LOGIN_USER, PERSIST_DATA, SET_DATA } from './actions'

const initialState = {
  loggedIn: true,
  userDetail: {},
  incomes: {},
  expenses: {},
  error: '',
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

        if (action.payload.entry.entryType === 'cashIn') {
          db.ref(`${action.payload.uid}/transactions/incomes/${today}`)
            .push(action.payload.entry)
            .on('value', (d) => {
              newData = d
            })
        } else {
          db.ref(`${action.payload.uid}/transactions/expenses/${today}`)
            .push(action.payload.entry)
            .on('value', (d) => {
              newData = d
            })
        }
        if (action.payload.entry.entryType === 'cashIn') {
          return { ...state, incomes: newData }
        }
        return { ...state, expenses: newData }
      } catch (err) {
        return { ...state, error: err.message }
      }

    default:
      return state
  }
}

export default mainReducer
