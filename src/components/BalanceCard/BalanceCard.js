import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import en from '../../languages/english'
import { colors, globalStyles } from '../../theme'

const styles = StyleSheet.create({
  balances: { color: colors.green, fontSize: 22 },
  balanceDescription: { color: colors.darkPurple },
  balanceRed: { color: colors.red, fontSize: 22 },
})

export default function BalanceCard() {
  const { totalAmountInHand, todaysBalance } = useSelector(
    (state) => state.mainReducer,
  )

  return (
    <View style={globalStyles.allCardContainer}>
      <View>
        <Text style={styles.balances}>{totalAmountInHand}</Text>
        <Text style={styles.balanceDescription}>{en.CASH_IN_HAND}</Text>
      </View>

      <View>
        <Text style={todaysBalance < 0 ? styles.balanceRed : styles.balances}>
          {todaysBalance}
        </Text>
        <Text style={styles.balanceDescription}>{en.TODAYS_BALANCE}</Text>
      </View>
    </View>
  )
}
