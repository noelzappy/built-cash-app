import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button } from 'native-base'
import { colors } from 'theme'
import { width, height } from 'react-native-dimension'
import { appStyles, appColors } from 'theme/globalStyle'
import { logoutUser } from '../../utils/actions'

const Settings = ({ route, navigation }) => {
  const dispatch = useDispatch()

  const { totalAmountInHand, businessDetails } = useSelector(
    (state) => state.mainReducer,
  )

  const { businessName } = businessDetails

  const iconGenerator = () => {
    const tempArray = businessName.split(' ')
    if (tempArray.length < 2) {
      return businessName.charAt(0).toUpperCase()
    }

    return `${tempArray[0].charAt(0).toUpperCase()}${tempArray[1]
      .charAt(0)
      .toUpperCase()}`
  }
  return (
    <View style={{ backgroundColor: appColors.appDirtyWhite }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: appColors.appWhite,
          paddingVertical: height(2),
          marginVertical: height(2),
          paddingHorizontal: width(3),
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16,
            )}`, // appColors.appBase,
            padding: width(2),
            borderRadius: width(50),
            justifyContent: 'flex-start',
            marginRight: width(5),
            alignItems: 'center',
            alignContent: 'center',
            width: width(12),
          }}
        >
          <Text style={{ ...appStyles.headHuge, textAlign: 'center' }}>
            {iconGenerator()}
          </Text>
        </View>
        <View style={{ marginLeft: width(3) }}>
          <Text style={{ ...appStyles.headMaxi, color: appColors.appDarkAsh }}>
            {businessName}
          </Text>
          <Text style={{ ...appStyles.regular, color: appColors.appDarkAsh }}>
            Your Name
          </Text>
        </View>
      </View>
      <Button
        onPress={() => {
          dispatch(logoutUser())
        }}
        style={{
          backgroundColor: appColors.appBase,
          marginHorizontal: width(3),
          height: height(5.5),
          elevation: 1,
          marginVertical: height(2),
        }}
        size="lg"
      >
        Logout
      </Button>
    </View>
  )
}

Settings.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
}

Settings.defaultProps = {
  route: { params: { from: '' } },
  navigation: { goBack: () => null },
}

export default Settings
