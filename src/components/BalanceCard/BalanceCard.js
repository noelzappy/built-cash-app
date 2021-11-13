import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { width, height } from 'react-native-dimension'
import { Card } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import en from '../../languages/english'
import { appColors, appStyles } from '../../theme/globalStyle'

const styles = StyleSheet.create({
  balances: { color: appColors.appGreen, fontSize: 22 },
  balanceDescription: { color: appColors.appBase },
  balanceRed: { color: appColors.appRed, fontSize: 22 },
})

export default function BalanceCard(props) {
  const { totalAmountInHand, todaysBalance, businessDetails, currency } = props

  return (
    <Card
      style={{
        ...appStyles.mainCard,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        backgroundColor: appColors.appWhite,
        marginBottom: height(3),
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.balances}>
          {`${currency} ${totalAmountInHand.offlineBalance}`}
        </Text>
        <Text style={styles.balanceDescription}>{en.CASH_IN_HAND}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={todaysBalance < 0 ? styles.balanceRed : styles.balances}>
          {`${currency} ${todaysBalance}`}
        </Text>
        <Text style={styles.balanceDescription}>{en.TODAYS_BALANCE}</Text>
      </View>
      <View style={{ width: '5%', maxWidth: '5%' }}>
        <AntDesign
          name="caretdown"
          size={width(5)}
          color={appColors.appBase}
          style={{ marginTop: 5 }}
        />
      </View>
    </Card>
  )
}
