import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import PropTypes from 'prop-types'
import { colors } from '../../theme'

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
  },
  cardTimeText: {
    fontSize: 14,
    color: colors.gray,
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
  const { time, cashIn, cashOut, Balance } = props
  return (
    <DataTable.Row>
      <DataTable.Cell>
        <View style={styles.textContainer}>
          <Text style={styles.cardTimeText}>{time}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell>
        <View style={styles.textContainer}>
          <Text style={styles.greenText}>{cashIn}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell>
        <View style={styles.textContainer}>
          <Text style={styles.redText}>{cashOut}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell>
        <View style={styles.textContainer}>
          <Text
            style={Balance < 0 ? styles.balanceTextRed : styles.balanceText}
          >
            {Balance}
          </Text>
        </View>
      </DataTable.Cell>
    </DataTable.Row>
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
