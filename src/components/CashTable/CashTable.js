import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
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
  hCardTime: {
    marginLeft: 4,
    paddingLeft: 10,
  },
  hCardDate: {
    marginLeft: 4,
    paddingLeft: 10,
  },
  hCardIn: {
    marginLeft: 4,
    paddingLeft: 10,
  },
  hCardInText: {
    marginLeft: 4,
    paddingLeft: 10,
  },
  hCardOut: {
    marginLeft: 4,
    paddingLeft: 10,
  },
  hCardOutText: {
    marginLeft: 4,
    paddingLeft: 10,
  },
})

export default function CashTable(props) {
  const { time, cashIn, cashOut } = props
  const today = new Date().toLocaleDateString()
  return (
    <View>
      <View style={styles.headingCardContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <View>
                <Text style={styles.hCardTime}>{en.TODAYS_ENTRIES}</Text>
                <Text style={styles.hCardDate}>{today}</Text>
              </View>
            </DataTable.Title>
            <DataTable.Title>
              <View>
                <Text style={styles.hCardIn}>{en.TOTAL_IN}</Text>
                <Text style={styles.hCardInText}>GHS 0.00</Text>
              </View>
            </DataTable.Title>
            <DataTable.Title>
              <View>
                <Text style={styles.hCardOut}>{en.TOTAL_OUT}</Text>
                <Text style={styles.hCardOutText}>GHS 854</Text>
              </View>
            </DataTable.Title>
          </DataTable.Header>

          <CashTableCell cashIn={cashIn} cashOut={cashOut} time={time} />
        </DataTable>
      </View>
    </View>
  )
}

CashTable.propTypes = {
  time: PropTypes.string.isRequired,
  cashIn: PropTypes.number,
  cashOut: PropTypes.number,
}

CashTable.defaultProps = {
  cashIn: '',
  cashOut: '',
}