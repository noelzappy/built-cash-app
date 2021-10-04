import firebase from 'firebase'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SAVE_TRANSACTION = 'SAVE_TRANSACTION'
export const SET_ERROR = 'SET_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const FETCH_BUSINESS_DETAILS = 'FETCH_BUSINESS_DETAILS'
export const SET_BUSINESS_DETAILS = 'SET_BUSINESS_DETAILS'
// export const SAVE_TRANSACTIONS = 'SAVE_TRANSACTIONS'
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const FETCH_TODAYS_TRANSACTION = 'FETCH_TODAYS_TRANSACTIONS'

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
})

export const logoutUser = () => ({ type: LOGOUT_USER })

export const setError = (err) => ({ type: SET_ERROR, payload: err })
export const clearError = () => ({ type: CLEAR_ERROR, payload: '' })

export const fetchBusinessDetails = (uid) => ({
  type: FETCH_BUSINESS_DETAILS,
  payload: uid,
})
export const setBusinessDetails = (data) => ({
  type: SET_BUSINESS_DETAILS,
  payload: data,
})

export const saveTransaction = (data) => ({
  type: SAVE_TRANSACTION,
  payload: data,
})
export const fetchTransactions = (uid) => ({
  type: FETCH_TRANSACTIONS,
  payload: uid,
})

export const fetchTodaysTransactions = (uid) => ({
  type: FETCH_TODAYS_TRANSACTION,
  payload: uid,
})

// export const watchTransactions = (uid) => {
//   const nowDate = new Date()
//   const today = `${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`.toString()

//   return (dispatch) => {
//     firebase
//       .database()
//       .ref(`${uid}/transactions`)
//       .on(
//         'value',
//         (snapshot) => {
//           dispatch(fetchTransactions(snapshot.val()))
//         },
//         (err) => {
//           dispatch(setError(err.message))
//         },
//       )
//     firebase
//       .database()
//       .ref(`${uid}/transactions/transfers`)
//       .child(today)
//       .on(
//         'value',
//         (snapshot) => {
//           dispatch(fetchTransactions(snapshot.val()))
//         },
//         (err) => {
//           dispatch(setError(err.message))
//         },
//       )
//   }
// }
