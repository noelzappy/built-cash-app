import React from 'react'
import { View, Text } from 'react-native'
import { DataTable } from 'react-native-paper'
import PropTypes from 'prop-types'
import { globalStyles } from '../../theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CashTableCell(props) {
  const { time, cashIn, cashOut, navigation, route } = props
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SingleEntry')
      }}
    >
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
