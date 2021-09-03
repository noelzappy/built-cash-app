import React from 'react'
import { View, Text } from 'react-native'
import { DataTable } from 'react-native-paper'
import PropTypes from 'prop-types'
import { globalStyles } from '../../theme'

export default function CashTableCell(props) {
  const { time, cashIn, cashOut } = props
  return (
    <View>
      <View style={globalStyles.cardContainerInner}>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              <View style={globalStyles.cardTime}>
                <Text style={globalStyles.cardTimeText}>{time}</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={globalStyles.cardCashIn}>
                <Text style={globalStyles.cardCashInText}>{cashIn}</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={globalStyles.cardCashOut}>
                <Text style={globalStyles.cardCashOutText}>{cashOut}</Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  )
}

CashTableCell.propTypes = {
  time: PropTypes.string.isRequired,
  cashIn: PropTypes.number,
  cashOut: PropTypes.number,
}

CashTableCell.defaultProps = {
  cashIn: '',
  cashOut: '',
}
