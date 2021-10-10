import firebase from 'firebase'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SAVE_TRANSACTION = 'SAVE_TRANSACTION'
export const SET_ERROR = 'SET_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const FETCH_BUSINESS_DETAILS = 'FETCH_BUSINESS_DETAILS'
export const SET_BUSINESS_DETAILS = 'SET_BUSINESS_DETAILS'
export const UPDATE_CASH_IN_HAND = 'UPDATE_CASH_IN_HAND'
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const FETCH_TODAYS_TRANSACTION = 'FETCH_TODAYS_TRANSACTIONS'
export const FETCH_CASH_IN_HAND = 'FETCH_CASH_IN_HAND'
export const SET_TODAYS_BALANCE = 'SET_TODAYS_BALANCE'

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
                dispatch({
                  type: FETCH_BUSINESS_DETAILS,
                  payload: {},
                })
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref(`${user.uid}/businessDetails`)
          .set({
            businessName: data,
          })
          .then((snapshot) => {
            dispatch(fetchBusinessDetails())
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
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
    } else {
      dispatch({ type: LOGOUT_USER })
    }
  })
}

export const setTodaysBalance = (data) => (dispatch) => {
  dispatch({ type: SET_TODAYS_BALANCE, payload: data })
}

export const fetchCashInHand = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .database()
        .ref(`${user.uid}/transactions`)
        .once('value', (snapshot) => {
          if (snapshot.exists()) {
            dispatch({
              type: FETCH_CASH_IN_HAND,
              payload: snapshot.val().totalAmount,
            })
          }
        })
    } else {
      dispatch({ type: LOGOUT_USER })
    }
  })
}

export const updateCashInHand = (data) => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let tempAmount = 0
      if (data.entry.entryType === 'cashIn') {
        tempAmount = parseFloat(data.entry.amount)
      } else {
        tempAmount = -Math.abs(parseFloat(data.entry.amount))
      }
      const finalAmount = parseFloat(data.totalAmountInHand) + tempAmount

      // console.log(finalAmount)

      firebase
        .database()
        .ref(`${user.uid}/transactions/totalAmount`)
        .set(finalAmount)
    }
  })
}

export const watchCashInHand = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .database()
        .ref(`${user.uid}/transactions/totalAmount`)
        .on('value', (snapshot) => {
          if (snapshot.exists()) {
            dispatch({
              type: FETCH_CASH_IN_HAND,
              payload: snapshot.val(),
            })
          }
        })
    } else {
      dispatch({ type: LOGOUT_USER })
    }
  })
}

export const fetchTransactions = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .database()
        .ref(`${user.uid}/transactions/transfers`)
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
              dispatch({
                type: FETCH_TRANSACTIONS,
                payload: {},
              })
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
          .ref(`${user.uid}/transactions/transfers`)
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
      } else {
        dispatch({ type: LOGOUT_USER })
      }
    })
  }
}
