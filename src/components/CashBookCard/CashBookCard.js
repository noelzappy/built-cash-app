import React from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../../theme'

export default function CashBookCard() {
  return (
    <View style={globalStyles.cardContainer}>
      <View style={globalStyles.cardContainerInner}>
        <View style={globalStyles.cardTime}>
          <Text style={globalStyles.cardTimeText}>10:15 AM</Text>
        </View>
        <View style={globalStyles.cardCashIn}>
          <Text style={globalStyles.cardCashInText}>Cash In</Text>
        </View>
        <View style={globalStyles.cardCashOut}>
          <Text style={globalStyles.cardCashOutText}>Cash Out</Text>
        </View>
      </View>
    </View>
  )
}
