import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { appStyles } from '../../../theme/globalStyle'

const HeaderTitle = () => {
  const { businessDetails } = useSelector((state) => state.mainReducer)

  return (
    <TouchableOpacity onPress={() => {}}>
      <Text style={appStyles.headMaxi}>
        {businessDetails.businessName
          ? businessDetails.businessName
          : 'My Company'}
      </Text>
    </TouchableOpacity>
  )
}

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

export default HeaderTitle
