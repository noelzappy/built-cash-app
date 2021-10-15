import React, { useState } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { DataTable } from 'react-native-paper'
import PropTypes from 'prop-types'
import en from '../../languages/english'
import CashTableCell from '../CashTableCell/CashTableCell'

const styles = StyleSheet.create({
  headingCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  hCardIn: {
    marginLeft: 4,
    paddingLeft: 10,
  },
  hCardOutText: {
    marginLeft: 4,
    paddingLeft: 10,
  },
})

export default function CashTable(props) {
  const { data, totalInOut } = props
  const today = new Date().toLocaleDateString()
  // console.log(data)

  return (
    <View>
      <View style={styles.headingCardContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <View>
                <Text style={styles.hCardIn}>{en.TODAYS_ENTRIES}</Text>
                <Text style={styles.hCardOutText}>{today}</Text>
              </View>
            </DataTable.Title>
            <DataTable.Title>
              <View>
                <Text style={styles.hCardIn}>{en.TOTAL_IN}</Text>
                <Text style={styles.hCardOutText}>
                  GHS {totalInOut.totalIn}
                </Text>
              </View>
            </DataTable.Title>
            <DataTable.Title>
              <View>
                <Text style={styles.hCardIn}>{en.TOTAL_OUT}</Text>
                <Text style={styles.hCardOutText}>
                  GHS {totalInOut.totalOut}
                </Text>
              </View>
            </DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <CashTableCell
                cashIn={item.cashIn}
                cashOut={item.cashOut}
                time={item.time}
              />
            )}
            keyExtractor={(item) => item.key}
          />
        </DataTable>
      </View>
    </View>
  )
}

CashTable.propTypes = {
  data: PropTypes.arrayOf.isRequired,
}
