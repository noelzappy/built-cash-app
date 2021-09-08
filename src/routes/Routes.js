import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'
import Main from './navigation'

const Routes = () => {
  const { checked, loggedIn } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authenticate({ loggedIn: true, checked: true }))
  }, [])

  // TODO: switch router by loggedIn state
  console.log('[##] loggedIn', loggedIn)

  // rendering
  return !checked ? (
    <View style={{ justifyContent: 'center', alignContent: 'center' }}>
      <ActivityIndicator />
    </View>
  ) : (
    <Main />
  )
}

export default Routes
