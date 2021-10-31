import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import PropTypes from 'prop-types'
import { width, height } from 'react-native-dimension'
import { globalStyles } from '../../theme'
import { appColors, appStyles } from '../../theme/globalStyle'

const styles = StyleSheet.create({
  textStyle: {
    paddingStart: width(2),
    alignSelf: 'center',
  },
})
export default function CashTableCell(props) {
  const { time, cashIn, cashOut, itemId, navigation, route, itemDate } = props

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SingleEntry', { itemId, itemDate })
      }}
      style={{
        width: '95%',
        paddingTop: height(1),
        borderRadius: width(2),
        borderColor: '#fff',
        elevation: 2,
        alignSelf: 'center',
        backgroundColor: appColors.appWhite,
        marginVertical: height(0.5),
      }}
      activeOpacity={0.8}
    >
      <DataTable.Row>
        <DataTable.Cell>
          <View style={{ alignItems: 'center', ...styles.textStyle }}>
            <Text
              style={{
                ...appStyles.textRegular,
                color: appColors.appDarkAsh,
                textAlign: 'center',
                paddingLeft: width(2),
              }}
            >
              {time}
            </Text>
          </View>
        </DataTable.Cell>
        <DataTable.Cell>
          <View style={{ alignItems: 'center', ...styles.textStyle }}>
            <Text
              style={{
                ...appStyles.textMaxi,
                color: appColors.appGreen,
                textAlign: 'center',
              }}
            >
              {cashIn}
            </Text>
          </View>
        </DataTable.Cell>
        <DataTable.Cell>
          <View
            style={{
              alignItems: 'center',
              ...styles.textStyle,
            }}
          >
            <Text
              style={{
                ...appStyles.textMaxi,
                color: appColors.appRed,
                textAlign: 'center',
              }}
            >
              {cashOut}
            </Text>
          </View>
        </DataTable.Cell>
      </DataTable.Row>
    </TouchableOpacity>
  )
}

CashTableCell.propTypes = {
  time: PropTypes.string.isRequired,
  cashIn: PropTypes.string,
  cashOut: PropTypes.string,
}

CashTableCell.defaultProps = {
  cashIn: '-',
  cashOut: '-',
}
