import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import Navigation from './navigation'

const Routes = () => {
  const loggedIn = useSelector((state) => state.authReducer)

  // TODO: switch router by loggedIn state
  console.log('[##] loggedIn', loggedIn)

  // rendering
  return !loggedIn ? (
    <View style={{ justifyContent: 'center', alignContent: 'center' }}>
      <ActivityIndicator />
    </View>
  ) : (
    <Navigation />
  )
}

export default Routes
