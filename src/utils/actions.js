import firebase from 'firebase'
import moment from 'moment'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SAVE_TRANSACTION = 'SAVE_TRANSACTION'
export const SAVE_TRANSACTION_FAILED = ' SAVE_TRANSACTION_FAILED'
export const UPDATE_BALANCE_OF_DAY_FAIL = 'UPDATE_BALANCE_OF_DAY_FAIL'
export const SET_ERROR = 'SET_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const FETCH_BUSINESS_DETAILS = 'FETCH_BUSINESS_DETAILS'
export const FETCH_BUSINESS_DETAILS_FAIL = 'FETCH_BUSINESS_DETAILS_FAIL'
export const SET_BUSINESS_DETAILS = 'SET_BUSINESS_DETAILS'
export const SET_BUSINESS_DETAILS_FAILED = 'SET_BUSINESS_DETAILS_FAILED'
export const UPDATE_CASH_IN_HAND = 'UPDATE_CASH_IN_HAND'
export const UPDATE_CASH_IN_HAND_FAIL = 'UPDATE_CASH_IN_HAND_FAIL'
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const FETCH_TRANSACTIONS_FAILED = 'FETCH_TRANSACTIONS_FAILED'
export const FETCH_TODAYS_TRANSACTION = 'FETCH_TODAYS_TRANSACTIONS'
export const FETCH_TODAYS_TRANSACTION_FAILED = 'FETCH_TODAYS_TRANSACTION_FAILED'
export const FETCH_CASH_IN_HAND = 'FETCH_CASH_IN_HAND'
export const FETCH_CASH_IN_HAND_FAILED = 'FETCH_CASH_IN_HAND_FAILED'
export const SET_TODAYS_BALANCE = 'SET_TODAYS_BALANCE'
export const SET_TODAYS_BALANCE_FAILED = 'SET_TODAYS_BALANCE_FAILED'
export const BALANCE_OF_DAY = 'BALANCE_OF_DAY'
export const GET_BALANCE_OF_DAY_FAILED = 'GET_BALANCE_OF_DAY_FAILED'
export const UPDATE_ENTRY = 'UPDATE_ENTRY'
export const UPDATE_ENTRY_FAILED = 'UPDATE_ENTRY_FAILED'
export const DELETE_ENTRY = 'DELETE_ENTRY'
export const DELETE_ENTRY_FAILED = 'DELETE_ENTRY_FAILED'
export const DISABLE_HANDLERS = 'DISABLE_HANDLERS'

export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
})

export const disableHandlers = () => (dispatch) =>
  dispatch({ type: DISABLE_HANDLERS })

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
          .catch((error) => {
            dispatch({ type: UPDATE_ENTRY_FAILED, payload: error })
          })
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
            dispatch({ type: SET_BUSINESS_DETAILS_FAILED, payload: err })
          })
      } else {
        dispatch({ type: LOGOUT_USER })
      }
    })
  }
}

export const saveTransaction = (data) => (dispatch) => {
  const today = moment().format('MM-DD-YYYY')

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
          dispatch({ type: SAVE_TRANSACTION_FAILED, payload: error })
        })
    } else {
      dispatch({ type: LOGOUT_USER })
    }
  })
}

export const updateBalanceOfDay = (balance) => (dispatch) => {
  const today = moment().format('MM-DD-YYYY')

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
          dispatch({ type: UPDATE_BALANCE_OF_DAY_FAIL, payload: error })
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
          dispatch({ type: GET_BALANCE_OF_DAY_FAILED, payload: error })
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
        .catch((error) =>
          dispatch({ type: FETCH_CASH_IN_HAND_FAILED, payload: error }),
        )
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

      if (data.entry.entryType === 'cashIn') {
        tempAmount = parseFloat(data.entry.amount)
      } else {
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
      try {
        firebase
          .database()
          .ref(`${user.uid}/transactions/totalAmount`)
          .set(finalAmount)
      } catch (error) {
        dispatch({ type: UPDATE_CASH_IN_HAND_FAIL, payload: error })
      }
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
        .on(
          'value',
          (snapshot) => {
            if (snapshot.exists()) {
              dispatch({
                type: FETCH_CASH_IN_HAND,
                payload: snapshot.val(),
              })
            }
          },
          (err) => {
            dispatch({ type: FETCH_CASH_IN_HAND_FAILED, payload: err })
          },
        )
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
            dispatch({ type: FETCH_TODAYS_TRANSACTION_FAILED, payload: err })
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
              dispatch({ type: FETCH_TODAYS_TRANSACTION_FAILED, payload: err })
            },
          )
      } else {
        dispatch({ type: LOGOUT_USER })
      }
    })
  }
}
