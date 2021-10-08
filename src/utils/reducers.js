import firebase from 'firebase'
import _ from 'lodash'

import {
  FETCH_BUSINESS_DETAILS,
  FETCH_CASH_IN_HAND,
  FETCH_TRANSACTIONS,
  LOGIN_USER,
  LOGOUT_USER,
  SAVE_TRANSACTION,
  SET_BUSINESS_DETAILS,
  SET_TODAYS_BALANCE,
} from './actions'

const initialState = {
  loggedIn: false,
  user: {},
  totalAmountInHand: 0,
  transfers: {},
  todaysTransfers: {},
  businessDetails: {},
  error: '',
  allTransactions: {},
  todaysBalance: 0,
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
        allTransactions: action.payload,
      }
    }
    case FETCH_CASH_IN_HAND: {
      return { ...state, totalAmountInHand: action.payload }
    }

    case SET_TODAYS_BALANCE: {
      return { ...state, todaysBalance: action.payload }
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
