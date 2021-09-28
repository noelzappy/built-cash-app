import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import store from 'utils/store'
import 'utils/ignore'
import FlashMessage from 'react-native-flash-message'
import firebase from 'firebase/app'
// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import { NativeBaseProvider } from 'native-base'
import Router from './routes'

const firebaseConfig = {
  apiKey: 'AIzaSyCEVkg_anAk0gIQ-2UV6f48cPTZuIIan0w',
  authDomain: 'built-cash.firebaseapp.com',
  databaseURL:
    'https://built-cash-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'built-cash',
  storageBucket: 'built-cash.appspot.com',
  messagingSenderId: '1074241807544',
  appId: '1:1074241807544:web:e88b42f46ba6a009da404d',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const App = () => {
  // state
  const [didLoad, setDidLoad] = useState(false)

  // handler
  const handleLoadAssets = async () => {
    // assets preloading
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
        <Router />
        <FlashMessage style={{ paddingTop: 20 }} position="top" />
      </NativeBaseProvider>
    </Provider>
  )
}

export default App
