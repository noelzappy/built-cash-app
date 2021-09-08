import React from 'react'
import { View, Text } from 'react-native'
import { DataTable } from 'react-native-paper'
import en from '../../languages/english'
import ReportCell from '../ReportCell/ReportCell'

export default function ReportTable() {
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <View>
              <Text>{en.DATE}</Text>
            </View>
          </DataTable.Title>
          <DataTable.Title>
            <View>
              <Text>{en.TOTAL_IN}</Text>
            </View>
          </DataTable.Title>
          <DataTable.Title>
            <View>
              <Text>{en.TOTAL_OUT}</Text>
            </View>
          </DataTable.Title>
          <DataTable.Title>
            <View>
              <Text>{en.BALANCE}</Text>
            </View>
          </DataTable.Title>
        </DataTable.Header>
        <ReportCell />
      </DataTable>
    </View>
  )
}
