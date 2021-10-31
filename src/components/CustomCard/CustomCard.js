import React from 'react'
import { View, Text } from 'react-native'
import { width, height } from 'react-native-dimension'
import { AntDesign } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { appColors, appStyles } from '../../theme/globalStyle'
import en from '../../languages/english'

export default function CustomCard(props) {
  const { color, amount } = props

  const { businessDetails } = useSelector((state) => state.mainReducer)

  const colors = {
    blue: 'rgba(47, 87, 148, 0.1)',
    green: 'rgba(14, 152, 115, 0.1)',
    red: 'rgba(240, 113, 103, 0.1)',
  }

  const iconColor = () => {
    switch (color) {
      case 'red':
        return appColors.appRed
      case 'green':
        return appColors.appGreen
      case 'blue':
        return appColors.appBlue
      default:
        return appColors.appBase
    }
  }

  const labelText = () => {
    switch (color) {
      case 'red':
        return en.OUT
      case 'green':
        return en.IN
      case 'blue':
        return en.NET
      default:
        return appColors.appBase
    }
  }

  return (
    <View
      style={{
        paddingLeft: '5%',
        paddingRight: '5%',
        borderRadius: width(2),
        marginTop: height(3),
        borderColor: '#fff',
        backgroundColor: colors[color],
        elevation: 0,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: height(1),
        }}
      >
        <AntDesign name="minuscircle" size={width(5)} color={iconColor()} />
        <Text
          style={{
            ...appStyles.textMaxi,
            color: iconColor(),
            paddingHorizontal: width(2),
          }}
        >
          {labelText()}
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: width(0.09),
          borderBottomColor: appColors.appMediumAsh,
        }}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: height(1),
        }}
      >
        <Text style={{ ...appStyles.textMaxi, color: appColors.appDarkAsh }}>
          {`${businessDetails.country.currency[0]} ${amount}`}
        </Text>
      </View>
    </View>
  )
}
