import firebase from 'firebase'
import moment from 'moment'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SAVE_TRANSACTION = 'SAVE_TRANSACTION'
export const SET_ERROR = 'SET_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const FETCH_BUSINESS_DETAILS = 'FETCH_BUSINESS_DETAILS'
export const FETCH_BUSINESS_DETAILS_SUCCESSFUL =
  'FETCH_BUSINESS_DETAILS_SUCCESSFUL'
export const FETCH_BUSINESS_DETAILS_FAIL = 'FETCH_BUSINESS_DETAILS_FAIL'
export const SET_BUSINESS_DETAILS = 'SET_BUSINESS_DETAILS'
export const UPDATE_CASH_IN_HAND = 'UPDATE_CASH_IN_HAND'
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const FETCH_TODAYS_TRANSACTION = 'FETCH_TODAYS_TRANSACTIONS'
export const FETCH_CASH_IN_HAND = 'FETCH_CASH_IN_HAND'
export const SET_TODAYS_BALANCE = 'SET_TODAYS_BALANCE'
export const BALANCE_OF_DAY = 'BALANCE_OF_DAY'
export const UPDATE_ENTRY = 'UPDATE_ENTRY'
export const DELETE_ENTRY = 'DELETE_ENTRY'

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
})

export const logoutUser = () => ({ type: LOGOUT_USER })

export const setError = (err) => ({ type: SET_ERROR, payload: err })
export const clearError = () => ({ type: CLEAR_ERROR, payload: '' })

export const deleteEntry =
  ({ id, date }) =>
  (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref(`${user.uid}/transactions/transfers/${date}/${id}`)
          .remove()
      } else {
        dispatch({ type: LOGOUT_USER })
      }
    })
  }

export const updateEntry =
  ({ itemId, itemDate, entry }) =>
  (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref(`${user.uid}/transactions/transfers/${itemDate}`)
          .child(itemId)
          .update(entry)
          .catch((error) => console.log(error))
      } else {
        dispatch({ type: LOGOUT_USER })
      }
    })
  }

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
                  type: FETCH_BUSINESS_DETAILS_FAIL,
                  payload: 'Your business profile does not exist',
                })
              }
            },
            (error) => {
              dispatch({
                type: FETCH_BUSINESS_DETAILS_FAIL,
                payload: error,
              })
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
      } else {
        dispatch({ type: LOGOUT_USER })
      }
    })
  }
}

export const saveTransaction = (data) => (dispatch) => {
  const today = moment().format('DD-MM-YYYY')

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

export const updateBalanceOfDay = (balance) => (dispatch) => {
  const today = moment().format('DD-MM-YYYY')

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .database()
        .ref(`${user.uid}/transactions/transfers/${today}/balanceOfDay`)
        .set(balance)
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

export const getBalanceOfDay = (day) => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .database()
        .ref(`${user.uid}/transactions/transfers/${day}/balanceOfDay`)
        .once('value', (snapshot) => {
          console.log(snapshot.val())
          dispatch({ type: BALANCE_OF_DAY, payload: snapshot.val() })
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
      const { onlineBalance, offlineBalance } = data.totalAmountInHand

      let tempAmount = 0

      if (
        data.entry.entryType === 'cashIn' &&
        data.entry.paymentMethod === 'online'
      ) {
        tempAmount = parseFloat(data.entry.amount)
      }

      if (
        data.entry.entryType === 'cashOut' &&
        data.entry.paymentMethod === 'offline'
      ) {
        tempAmount = -Math.abs(parseFloat(data.entry.amount))
      }

      const finalAmount =
        data.entry.paymentMethod === 'online'
          ? {
              onlineBalance: parseFloat(onlineBalance) + tempAmount,
              offlineBalance,
            }
          : {
              onlineBalance,
              offlineBalance: parseFloat(offlineBalance) + tempAmount,
            }

      // console.log(finalAmount)
      firebase
        .database()
        .ref(`${user.uid}/transactions/totalAmount`)
        .set(finalAmount)
    } else {
      dispatch({ type: LOGOUT_USER })
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
