import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import firebase from 'firebase'
import Navigation from './navigation'
import { AuthNavigator } from './navigation/stacks/Stacks'
import { logoutUser, fetchTodayData, fetchBusinessData } from '../utils/actions'

const Routes = () => {
  const loggedIn = useSelector((state) => state.mainReducer.loggedIn)

  const dispatch = useDispatch()
  // TODO: switch router by loggedIn state
  console.log('[##] loggedIn', loggedIn)

  let uid = ''
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      dispatch(logoutUser())
    }
    uid = user.uid
  })

  if (loggedIn) {
    dispatch(fetchTodayData(uid))
    dispatch(fetchBusinessData(uid))
  }

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
