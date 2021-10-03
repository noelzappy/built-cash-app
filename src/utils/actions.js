export const SAVE_DATA = 'SAVE_DATA'
export const SET_DATA = 'SET_DATA'
export const LOGIN_USER = 'LOGIN_USER'
export const FETCH_TODAY_DATA = 'FETCH_TODAY_DATA'
export const PERSIST_DATA = 'PERSIST_DATA'
export const LOGOUT_USER = 'LOGOUT_USER'
export const CALCULATE_IN_OUT = 'CALCULATE_IN_OUT'
export const FETCH_BUSINESS_DATA = 'FETCH_BUSINESS_DATA'
export const UPDATE_AMOUNT_IN_HAND = 'UPDATE_AMOUNT_IN_HAND'

export const loginUser = (data) => ({
  type: LOGIN_USER,
  payload: data,
})

export const logoutUser = () => ({ type: LOGOUT_USER })

export const setData = (data) => ({ type: SET_DATA, payload: data })

export const fetchTodayData = (uid) => ({
  type: FETCH_TODAY_DATA,
  payload: uid,
})
export const fetchBusinessData = (uid) => ({
  type: FETCH_BUSINESS_DATA,
  payload: uid,
})

export const persistData = (details) => ({
  type: PERSIST_DATA,
  payload: details,
})
export const calculateInOut = (data) => ({
  type: CALCULATE_IN_OUT,
  payload: data,
})
