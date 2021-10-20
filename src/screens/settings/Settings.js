import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'components/Button'
import { colors } from 'theme'
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

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Setting Screen</Text>
      <Button
        title="Logout"
        color="white"
        backgroundColor={colors.pink}
        onPress={() => {
          dispatch(logoutUser())
        }}
      />
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
