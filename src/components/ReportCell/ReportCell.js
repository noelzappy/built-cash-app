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
  cardCashInText: {
    color: colors.green,
  },
  cardCashOutText: { color: colors.red },
  balanceText: {
    color: colors.green,
    fontWeight: 'bold',
  },
})

export default function ReportCell(props) {
  const {
    time, cashIn, cashOut, Balance,
  } = props
  return (
    <DataTable.Row>
      <DataTable.Cell>
        <View style={styles.cardTime}>
          <Text style={styles.cardTimeText}>{time}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell>
        <View style={styles.cardCashIn}>
          <Text style={styles.cardCashInText}>{cashIn}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell>
        <View style={styles.cardCashOut}>
          <Text style={styles.cardCashOutText}>{cashOut}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>{Balance}</Text>
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
