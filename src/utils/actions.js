export const SAVE_DATA = 'SAVE_DATA'
export const SET_DATA = 'SET_DATA'
export const LOGIN_USER = 'LOGIN_USER'
export const FETCH_DATA = 'FETCH_DATA'
export const PERSIST_DATA = 'PERSIST_DATA'

export const loginUser = () => ({
  type: LOGIN_USER,
})

export const setData = (data) => ({ type: SET_DATA, payload: data })

export const fetchData = (uid) => ({ type: FETCH_DATA, payload: uid })

export const persistData = (details) => ({ type: PERSIST_DATA, payload: details })
