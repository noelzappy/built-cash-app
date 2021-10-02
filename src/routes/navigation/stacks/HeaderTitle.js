import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
  logo: {
    color: '#fff',
  },
})

const HeaderTitle = () => {
  const mainReducer = useSelector((state) => state.mainReducer)
  return <Text style={styles.logo}>{mainReducer.data.businessName}</Text>
}

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

export default HeaderTitle
