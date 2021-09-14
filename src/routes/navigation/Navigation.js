import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { HomeNavigator } from './stacks/Stacks'

export default function Navigation() {
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  )
}
