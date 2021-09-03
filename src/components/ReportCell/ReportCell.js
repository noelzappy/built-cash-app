import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
  },
})

export default function ReportCell() {
  return (
    <View>
      <View style={styles.cardContainerInner}>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              <View style={styles.cardTime}>
                <Text style={styles.cardTimeText}>TIME</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={styles.cardCashIn}>
                <Text style={styles.cardCashInText}>CASHIN</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={styles.cardCashOut}>
                <Text style={styles.cardCashOutText}>cashout</Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  )
}
