import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'

const styles = StyleSheet.create({
  button: {
    paddingLeft: 15,
  },
})

const HeaderRight = ({ navigation }) => (
  <FontIcon.Button
    name="cog"
    color="white"
    backgroundColor="transparent"
    onPress={() => {
      navigation.navigate('Settings')
    }}
    style={styles.button}
  />
)

HeaderRight.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func,
  }),
}

HeaderRight.defaultProps = {
  navigation: { openDrawer: () => null },
}

export default HeaderRight
