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

export function fetchBusinessDetails() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .database()
          .ref(`${user.uid}/businessDetails`)
          .once(
            'value',
            (snapshot) => {
              if (snapshot.exists()) {
                dispatch({
                  type: FETCH_BUSINESS_DETAILS,
                  payload: snapshot.val(),
                })
              } else {
                console.log('No Data found')
              }
            },
            (error) => {
              console.log(error)
            },
          )
      } else {
        dispatch({ type: LOGOUT_USER })
      }
    })
  }
}

export const setBusinessDetails = (data) => {
  return (dispatch) => {
    console.log(dispatch)
  }
}

export const saveTransaction = (data) => (dispatch) => {
  const nowDate = new Date()
  const today = `${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`.toString()

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .database()
        .ref(`${user.uid}/transactions/transfers/${today}`)
        .push(data)
        .then(() => {
          dispatch(fetchTransactions())
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })
}

export const fetchTransactions = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .database()
        .ref(`${user.uid}/transactions`)
        .once(
          'value',
          (snapshot) => {
            if (snapshot.exists()) {
              // console.log(snapshot.val())
              dispatch({
                type: FETCH_TRANSACTIONS,
                payload: snapshot.val(),
              })
            } else {
              console.log('No  data')
            }
          },
          (err) => {
            console.log(err)
          },
        )
    } else {
      dispatch({ type: LOGOUT_USER })
    }
  })
}

export function watchTransactions() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref(`${user.uid}/transactions`)
          .on(
            'value',
            (snapshot) => {
              if (snapshot.exists()) {
                dispatch({ type: FETCH_TRANSACTIONS, payload: snapshot.val() })
              }
            },
            (err) => {
              console.log(err)
            },
          )
      }
    })
  }
}
