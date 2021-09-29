export const SAVE_DATA = 'SAVE_DATA'
export const FETCH_DATA = 'FETCH_DATA'
export const CREATE_USER = 'CREATE_USER'
export const LOGIN_USER = 'LOGIN_USER'

export const createUser = ({ phoneNumber }) {
    return {type: CREATE_USER,  }
}