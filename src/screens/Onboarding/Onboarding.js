import React, { useEffect, useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import { width, height } from 'react-native-dimension'

import Image_1 from '../../../assets/images/onboarding/1.svg'
import Image_2 from '../../../assets/images/onboarding/2.svg'
import Image_3 from '../../../assets/images/onboarding/3.svg'
import Image_5 from '../../../assets/images/onboarding/5.svg'
import { appColors } from '../../theme/globalStyle'

export default function OnboardingScreen({ navigation }) {

  function navigateAway() {
    navigation.replace('AuthScreen')
  }

 

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: appColors.appTBase,
          image: <Image_5 width={width(90)} height={height(40)} />,
          title: 'Cash Management',
          subtitle: 'Managing the flow of cash has just been simplified',
          titleStyles: { color: appColors.appDarkAsh },
          subTitleStyles: { color: appColors.appDarkAsh },
        },
        {
          backgroundColor: appColors.appTGreen,
          image: <Image_3 width={width(90)} height={height(40)} />,
          title: 'Sales & Expenses',
          subtitle: 'Monitor your Sales & Expenses from your phone',
          titleStyles: { color: appColors.appDarkAsh },
          subTitleStyles: { color: appColors.appDarkAsh },
        },

        {
          backgroundColor: appColors.appTRed,
          image: <Image_1 width={width(90)} height={height(40)} />,
          title: 'Monitor Flow',
          subtitle: 'Monitor cash in hand & online balances',
          titleStyles: { color: appColors.appDarkAsh },
          subTitleStyles: { color: appColors.appDarkAsh },
        },

        {
          backgroundColor: appColors.appTGold,
          image: <Image_2 width={width(90)} height={height(40)} />,
          title: 'Cloud Backup',
          subtitle: "It's backed up in the cloud so you don't lose anything",
          titleStyles: { color: appColors.appDarkAsh },
          subTitleStyles: { color: appColors.appDarkAsh },
        },
      ]}
      // pageIndexCallback={(index) => setColorIndex(index)}
      onSkip={navigateAway}
      onDone={navigateAway}
      controlStatusBar
    />
  )
}
