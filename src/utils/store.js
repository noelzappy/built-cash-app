import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem'

import mainReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
}

const rootReducer = combineReducers({
  mainReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
