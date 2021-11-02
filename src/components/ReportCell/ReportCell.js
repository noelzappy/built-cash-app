import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DataTable } from 'react-native-paper'
import PropTypes from 'prop-types'
import { width, height as pHeight } from 'react-native-dimension'
import { appColors, appStyles } from 'theme/globalStyle'
import { colors } from '../../theme'

const styles = StyleSheet.create({
  cardTimeText: {
    ...appStyles.textRegular,
    color: appColors.appDarkAsh,
    textAlign: 'center',
  },
  text: {
    ...appStyles.textMaxi,
    color: appColors.appDarkAsh,
    textAlign: 'center',
  },
  greenText: {
    color: colors.green,
  },
  redText: { color: colors.red },
  balanceText: {
    color: colors.green,
    fontWeight: 'bold',
  },
  balanceTextRed: {
    color: colors.red,
    fontWeight: 'bold',
  },
})

export default function ReportCell(props) {
  const { time, cashIn, cashOut, Balance, navigation, item } = props

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SingleReport', { item })}
      style={{
        width: '95%',
        paddingTop: pHeight(1),
        borderRadius: width(2),
        borderColor: '#fff',
        elevation: 2,
        alignSelf: 'center',
        backgroundColor: appColors.appWhite,
        marginVertical: pHeight(0.5),
      }}
      activeOpacity={0.8}
    >
      <DataTable.Row>
        <DataTable.Cell>
          <Text style={styles.cardTimeText}>{time}</Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text style={{ ...styles.text, color: appColors.appGreen }}>
            {cashIn}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text style={{ ...styles.text, color: appColors.appRed }}>
            {cashOut}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell>
          <Text
            style={{
              ...styles.text,
              color:
                parseInt(Balance) < 0 ? appColors.appRed : appColors.appGreen,
            }}
          >
            {Balance}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
    </TouchableOpacity>
  )
}

ReportCell.propTypes = {
  time: PropTypes.string.isRequired,
  cashIn: PropTypes.string,
  cashOut: PropTypes.string,
  Balance: PropTypes.string,
}

ReportCell.defaultProps = {
  cashIn: '-',
  cashOut: '-',
  Balance: '-',
}
