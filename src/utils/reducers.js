import firebase from 'firebase'
import _ from 'lodash'

import {
  FETCH_BUSINESS_DETAILS,
  FETCH_TRANSACTIONS,
  LOGIN_USER,
  LOGOUT_USER,
  SAVE_TRANSACTION,
  SET_BUSINESS_DETAILS,
} from './actions'

const initialState = {
  loggedIn: false,
  user: {},
  totalAmountInHand: '',
  transfers: {},
  todaysTransfers: {},
  businessDetails: {},
  error: '',
  allTransactions: {},
}

const db = firebase.database()

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUSINESS_DETAILS: {
      return { ...state, businessDetails: action.payload }
    }
    case SET_BUSINESS_DETAILS: {
      return state
    }
    case FETCH_TRANSACTIONS: {
      // console.log(action.payload.transfers)
      return {
        ...state,
        totalAmountInHand: action.payload.totalAmount,
        allTransactions: action.payload.transfers,
      }
    }

    case SAVE_TRANSACTION: {
      const nowDate = new Date()
      const today = `${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`.toString()
      let error = ''
      db.ref(`${action.payload.uid}/transactions/transfers/${today}`).push(
        action.payload.value,
        (snapshot, err) => {
          error = err
        },
      )
      return { ...state, error }
    }

    case LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      }
    case LOGOUT_USER:
      firebase.auth().signOut()
      return {
        loggedIn: false,
        user: {},
        totalAmountInHand: '',
        transfers: {},
        todaysTransfers: {},
        businessDetails: {},
      }
    default:
      return state
  }
}

export default mainReducer
