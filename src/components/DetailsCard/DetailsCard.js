import React from 'react'
import { View, Text } from 'react-native'
import { width, height } from 'react-native-dimension'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import en from '../../languages/english'
import { appStyles, appColors } from '../../theme/globalStyle'

export default function DetailsCard(props) {
  const { type, cashAmount, onlineAmount } = props
  const { businessDetails } = useSelector((state) => state.mainReducer)

  return (
    <View
      style={{
        marginHorizontal: width(2),
        paddingTop: height(1.5),
        paddingLeft: '5%',
        paddingRight: '5%',
        borderRadius: width(2),
        paddingBottom: height(3),
        marginTop: height(2),
        borderColor: '#fff',
        elevation: 1,
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          borderBottomColor: appColors.appLightAsh,
          borderBottomWidth: width(0.07),
          paddingBottom: height(1.5),
          justifyContent: 'center',
        }}
      >
        <Text style={{ ...appStyles.textMaxi, color: appColors.appDarkAsh }}>
          {type === 'IN' ? en.IN_DETAILS : en.OUT_DETAILS}
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: height(2),
            }}
          >
            <MaterialCommunityIcons
              name="cash-100"
              size={24}
              color={type === 'IN' ? appColors.appGreen : appColors.appRed}
            />
            <Text
              style={{
                ...appStyles.textMaxi,
                color: type === 'IN' ? appColors.appGreen : appColors.appRed,
                paddingLeft: width(2),
              }}
            >
              {en.CASH}
            </Text>
          </View>
          <View style={{ alignItems: 'center', paddingTop: height(2) }}>
            <Text
              style={{
                ...appStyles.textMaxi,
                color: type === 'IN' ? appColors.appGreen : appColors.appRed,
                paddingLeft: width(2),
              }}
            >
              {`${businessDetails.country.currency[0]} ${cashAmount}`}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: height(2),
            }}
          >
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={24}
              color={type === 'IN' ? appColors.appGreen : appColors.appRed}
            />
            <Text
              style={{
                ...appStyles.textMaxi,
                color: type === 'IN' ? appColors.appGreen : appColors.appRed,
                paddingLeft: width(2),
              }}
            >
              {en.ONLINE}
            </Text>
          </View>
          <View style={{ alignItems: 'center', paddingTop: height(2) }}>
            <Text
              style={{
                ...appStyles.textMaxi,
                color: type === 'IN' ? appColors.appGreen : appColors.appRed,
                paddingLeft: width(2),
              }}
            >
              {`${businessDetails.country.currency[0]} ${onlineAmount}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
