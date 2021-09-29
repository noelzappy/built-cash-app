import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './navigation'
import { AuthNavigator } from './navigation/stacks/Stacks'

const Routes = () => {
  const loggedIn = useSelector((state) => state.authReducer)

  // TODO: switch router by loggedIn state
  console.log('[##] loggedIn', loggedIn)

  // rendering
  return !loggedIn ? (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  ) : (
    <Navigation />
  )
}

export default Routes
