import React from 'react'
import { StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  logo: {
    color: '#fff',
  },
})

const HeaderTitle = () => <Text style={styles.logo}>My Company</Text>

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

export default HeaderTitle
