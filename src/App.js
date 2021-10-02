import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import 'utils/ignore'
import FlashMessage from 'react-native-flash-message'

import { PersistGate } from 'redux-persist/integration/react'
// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import { NativeBaseProvider } from 'native-base'
import Routes from './routes'
import { store, persistor } from './utils/store'

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
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <Routes />
          <FlashMessage style={{ paddingTop: 20 }} position="top" />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
