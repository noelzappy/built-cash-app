import firebase from 'firebase'
import {
  FETCH_BUSINESS_DETAILS,
  FETCH_TODAYS_TRANSACTION,
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
      let bizData = {}
      let err = ''
      db.ref(`${action.payload}/businessDetails`).once(
        'value',
        (snapshot) => {
          bizData = snapshot.val()
        },
        (error) => {
          err = error.message
        },
      )
      return { ...state, businessDetails: bizData, error: err }
    }
    case SET_BUSINESS_DETAILS: {
      let error = ''
      // let tempBusinessDetail = {}
      db.ref(`${action.payload.uid}/businessDetails`).set(
        {
          businessName: action.payload.data.businessName,
        },
        (snapshot, err) => {
          // tempBusinessDetail = snapshot
          if (err) {
            error = err.message
          }
        },
      )
      return { ...state, error }
    }
    case FETCH_TRANSACTIONS: {
      let tempTransaction = {}
      let error = ''
      db.ref(`${action.payload}/transactions`).once(
        'value',
        (snapshot) => {
          tempTransaction = snapshot.val()
        },
        (err) => {
          error = err
        },
      )
      return { ...state, allTransactions: tempTransaction, error }
    }
    case FETCH_TODAYS_TRANSACTION: {
      const nowDate = new Date()
      let today = `${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`
      today = today.toString()

      // let tempTodaysTransaction = []
      let error = ''
      db.ref(`${action.payload}/transactions/transfers`)
        .child(today)
        .once(
          'value',
          (snapshot) => {
            if (snapshot.exists()) {
              // tempTodaysTransaction.push(snapshot.val())
              // console.log(snapshot.val())
              return { ...state, todaysTransfers: snapshot.val() }
            }
          },
          (err) => {
            error = err.message
          },
        )
      // console.log(tempTodaysTransaction)
      return { ...state, error }
    }
    case SAVE_TRANSACTION: {
      const nowDate = new Date()
      const today = `${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`.toString()

      // let tempTransactions = {}
      let error = ''
      db.ref(
        `${action.payload.uid}/transactions/transfers/${today}`,
      ).push(action.payload.value, (snapshot, err) => {})
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
