import firebase from 'firebase'

import {
  BALANCE_OF_DAY,
  FETCH_BUSINESS_DETAILS,
  FETCH_BUSINESS_DETAILS_FAIL,
  FETCH_CASH_IN_HAND,
  FETCH_CASH_IN_HAND_FAILED,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_FAILED,
  GET_BALANCE_OF_DAY_FAILED,
  LOGIN_USER,
  LOGOUT_USER,
  SET_TODAYS_BALANCE,
} from './actions'

const initialState = {
  loggedIn: false,

  user: null,

  totalAmountInHand: {},
  fetchTotalAmountInHandFailed: false,
  fetchTotalAmountInHandFailedError: null,
  fetchTotalAmountInHandSuccess: false,

  businessDetails: null,
  fetchBusinessDetailFail: false,
  fetchBusinessDetailSuccess: false,
  fetchBusinessDetailFailError: null,

  error: '',

  allTransactions: {},
  fetchTransactionsFailed: false,
  fetchTransactionsFailedError: null,
  fetchTransactionsSuccess: false,

  todaysBalance: 0,

  balanceOfDay: 0,
  fetchBalanceOfDayFailed: false,
  fetchBalanceOfDayFailedError: null,
  fetchBalanceOfDaySuccess: false,
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUSINESS_DETAILS: {
      return {
        ...state,
        businessDetails: action.payload,
        fetchBusinessDetailFail: false,
        fetchBusinessDetailSuccess: true,
        fetchBusinessDetailFailError: null,
      }
    }
    case FETCH_BUSINESS_DETAILS_FAIL:
      return {
        ...state,
        fetchBusinessDetailFail: true,
        fetchBusinessDetailSuccess: false,
        fetchBusinessDetailFailError: action.payload,
        businessDetails: null,
      }
    case FETCH_TRANSACTIONS: {
      return {
        ...state,
        allTransactions: action.payload,
        fetchTransactionsFailed: false,
        fetchTransactionsFailedError: null,
        fetchTransactionsSuccess: true,
      }
    }
    case FETCH_TRANSACTIONS_FAILED:
      return {
        ...state,
        allTransactions: {},
        fetchTransactionsFailed: true,
        fetchTransactionsFailedError: action.payload,
        fetchTransactionsSuccess: false,
      }
    case FETCH_CASH_IN_HAND: {
      return {
        ...state,
        totalAmountInHand: action.payload,
        fetchTotalAmountInHandFailed: false,
        fetchTotalAmountInHandFailedError: null,
        fetchTotalAmountInHandSuccess: true,
      }
    }
    case FETCH_CASH_IN_HAND_FAILED:
      return {
        ...state,
        totalAmountInHand: {},
        fetchTotalAmountInHandFailed: true,
        fetchTotalAmountInHandFailedError: action.payload,
        fetchTotalAmountInHandSuccess: false,
      }
    case SET_TODAYS_BALANCE: {
      return { ...state, todaysBalance: action.payload }
    }
    case BALANCE_OF_DAY:
      return {
        ...state,
        balanceOfDay: action.payload,
        fetchBalanceOfDayFailed: false,
        fetchBalanceOfDayFailedError: null,
        fetchBalanceOfDaySuccess: true,
      }
    case GET_BALANCE_OF_DAY_FAILED:
      return {
        ...state,
        balanceOfDay: 0,
        fetchBalanceOfDayFailed: true,
        fetchBalanceOfDayFailedError: action.payload,
        fetchBalanceOfDaySuccess: false,
      }
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      }
    case LOGOUT_USER:
      firebase.auth().signOut()
      return initialState

    default:
      return state
  }
}

export default mainReducer
