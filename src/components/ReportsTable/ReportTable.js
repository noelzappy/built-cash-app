import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'
import en from '../../languages/english'
import ReportCell from '../ReportCell/ReportCell'

const styles = StyleSheet.create({})

export default function ReportTable() {
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <View>
              <Text style={styles.hCardTime}>{en.TODAYS_ENTRIES}</Text>
              <Text style={styles.hCardDate}>today</Text>
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
        <ReportCell />
      </DataTable>
    </View>
  )
}
