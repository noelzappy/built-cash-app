import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button } from 'native-base'
import { colors } from 'theme'
import { width, height } from 'react-native-dimension'
import { appStyles, appColors } from 'theme/globalStyle'
import { logoutUser } from '../../utils/actions'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})

const Settings = ({ route, navigation }) => {
  const dispatch = useDispatch()

  const { totalAmountInHand, businessDetails } = useSelector(
    (state) => state.mainReducer,
  )

  return (
    <View style={{ backgroundColor: appColors.appDirtyWhite }}>
      <Card
        style={{
          ...appStyles.mainCard,
          backgroundColor: appColors.appWhite,
          paddingTop: height(2),
          paddingBottom: height(2),
        }}
      >
        <Text
          style={{
            ...appStyles.textMaxi,
            color: appColors.appDarkAsh,
            paddingVertical: height(1),
          }}
        >
          {businessDetails.businessName}
        </Text>
        <Text
          style={{
            ...appStyles.textMaxi,
            color: appColors.appDarkAsh,
            paddingVertical: height(1),
          }}
        >
          {`Total Amount In Hand: ${totalAmountInHand}`}
        </Text>
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
      </Card>
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
