import React, { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ActivityIndicator } from 'react-native-paper'

export default function RedirectScreen({ navigation }) {
  function navigateAway(routeName) {
    navigation.replace(routeName)
  }

  useEffect(() => {
    try {
      SecureStore.getItemAsync('initialLaunch').then((val) => {
        if (val) {
          navigateAway('AuthScreen')
        } else {
          SecureStore.setItemAsync('initialLaunch', 'yes').catch((err) =>
            console.log(err),
          )

          navigateAway('Onboarding')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <SafeAreaProvider
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator />
    </SafeAreaProvider>
  )
}
