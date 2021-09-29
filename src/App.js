import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import 'utils/ignore'
import FlashMessage from 'react-native-flash-message'

import { createStore, combineReducers } from 'redux'
// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import { NativeBaseProvider } from 'native-base'
import Routes from './routes'
import { dataReducer, authReducer } from './utils/reducers'

const rootReducer = combineReducers({
  dataReducer,
  authReducer,
})
const store = createStore(rootReducer)

const App = () => {
  const [didLoad, setDidLoad] = useState(false)

  const handleLoadAssets = async () => {
    await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  // lifecycle
  useEffect(() => {
    handleLoadAssets()
  }, [])

  // rendering
  if (!didLoad) return <View />
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Routes />
        <FlashMessage style={{ paddingTop: 20 }} position="top" />
      </NativeBaseProvider>
    </Provider>
  )
}

export default App
