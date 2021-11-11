import React from 'react'
import { View, Text, Image } from 'react-native'
import * as RNOnboarding from 'react-native-onboarding-swiper'

export default function Onboarding() {
  return (
    <RNOnboarding
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../../assets/images/LoginImg.svg')} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  )
}
