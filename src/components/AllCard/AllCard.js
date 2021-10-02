import React from 'react'
import { View, Text } from 'react-native'
import en from '../../languages/english'
import { globalStyles } from '../../theme'

export default function AllCard({ totalBalance }) {
  return (
    <View style={globalStyles.allCardContainer}>
      <View>
        <Text style={globalStyles.allCardCash}>{totalBalance}</Text>
        <Text style={globalStyles.allCardCashText}>{en.CASH_IN_HAND}</Text>
      </View>

      <View>
        <Text style={globalStyles.allCardBalance}>{totalBalance}</Text>
        <Text style={globalStyles.allCardBalanceText}>{en.TOTAL_BALANCE}</Text>
      </View>
    </View>
  )
}
