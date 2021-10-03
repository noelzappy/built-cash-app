import firebase from 'firebase'

import {
  CALCULATE_IN_OUT,
  FETCH_BUSINESS_DATA,
  FETCH_TODAY_DATA,
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
  transactionsToday: {},
}

const db = firebase.database()

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
        userDetail: action.payload,
      }
    case LOGOUT_USER:
      firebase.auth().signOut()
      return {
        loggedIn: false,
        userDetail: {},
        newData: {},
        error: '',
        data: {},
        totalInOut: {},
        transactions: {},
        businessDetails: {},
      }
    case FETCH_TODAY_DATA:
      const nowDate = new Date()
      let today =
        nowDate.getDate() +
        '-' +
        (nowDate.getMonth() + 1) +
        '-' +
        nowDate.getFullYear()
      today = today.toString()
      let tempData = {}
      try {
        firebase
          .database()
          .ref(`${action.payload}/${today}`)
          .on('value', (snapshot) => {
            if (snapshot.exists()) {
              tempData = snapshot.val().transactions
              // console.log(tempData)
            }
          })
      } catch (err) {
        console.log('FETCH_TODAY_DATA error: ' + err)
        return { ...state, error: err.message }
      }
      return { ...state, transactionsToday: tempData }

    case FETCH_BUSINESS_DATA:
      try {
        let newData = {}
        console.log(action.payload)
        db.ref(`${action.payload}/businessDetails`).on('value', (d) => {
          newData = d.val()
          console.log(d.val())
        })
        return { ...state, businessDetails: newData }
      } catch (err) {
        console.log('FETCH_BUSINESS_DATA error: ' + err)
        return { ...state, error: err.message }
      }

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
            newData = d.val()
          })
        console.log(newData)
        return { ...state, newData }
      } catch (err) {
        console.log('PERSIST_DATA error: ' + err)
        return { ...state, error: err.message }
      }
    case CALCULATE_IN_OUT:
      return { ...state, totalInOut: action.payload }

    default:
      return state
  }
}

export default mainReducer
