export const SAVE_DATA = 'SAVE_DATA'
export const SET_DATA = 'SET_DATA'
export const LOGIN_USER = 'LOGIN_USER'
export const FETCH_DATA = 'FETCH_DATA'
export const PERSIST_DATA = 'PERSIST_DATA'
export const LOGOUT_USER = 'LOGOUT_USER'
export const CALCULATE_IN_OUT = 'CALCULATE_IN_OUT'

export const loginUser = () => ({
  type: LOGIN_USER,
})

export const logoutUser = () => ({ type: LOGOUT_USER })

export const setData = (data) => ({ type: SET_DATA, payload: data })

export const fetchData = (uid) => ({ type: FETCH_DATA, payload: uid })

export const persistData = (details) => ({
  type: PERSIST_DATA,
  payload: details,
})
export const calculateInOut = (data) => ({
  type: CALCULATE_IN_OUT,
  payload: data,
})
