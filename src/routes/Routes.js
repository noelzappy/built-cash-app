import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import firebase from 'firebase'

import Navigation from './navigation'

import {
  fetchBusinessDetails,
  fetchTransactions,
  logoutUser,
} from '../utils/actions'
import { AuthNavigator } from './navigation/stacks/Stacks'

const Routes = () => {
  const loggedIn = useSelector((state) => state.mainReducer.loggedIn)

  const dispatch = useDispatch()

  if (loggedIn) {
    dispatch(fetchBusinessDetails())
    dispatch(fetchTransactions())
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        dispatch(logoutUser())
      }
    })
  }, [])

  // rendering
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    )
  }

  return <Navigation />
}

export default Routes
