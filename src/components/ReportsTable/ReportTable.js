import React from 'react'
import {
  View, Text, FlatList, Dimensions,
} from 'react-native'
import { DataTable } from 'react-native-paper'
import en from '../../languages/english'
import ReportCell from '../ReportCell/ReportCell'

const { height } = Dimensions.get('window')

export default function ReportTable(props) {
  const { data } = props
  return (
    <View style={{ marginBottom: height - (height - 100) }}>
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

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ReportCell
              time={item.time}
              cashIn={item.cashIn}
              cashOut={item.cashOut}
              Balance={item.balance}
            />
          )}
          keyExtractor={(item) => item.index}
        />
      </DataTable>
    </View>
  )
}
