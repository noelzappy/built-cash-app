import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

const styles = StyleSheet.create({
  logo: {
    color: '#fff',
  },
})

const HeaderTitle = () => {
  const mainReducer = useSelector((state) => state.mainReducer)

  // console.log(mainReducer.businessDetails)
  return (
    <Text style={styles.logo}>
      {mainReducer.businessDetails.businessName !== null
        ? mainReducer.businessDetails.businessName
        : 'My Company'}
    </Text>
  )
}

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

export default HeaderTitle
