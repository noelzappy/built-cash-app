import React from 'react'
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { DataTable } from 'react-native-paper'

import en from '../../languages/english'
import { appColors, appStyles } from '../../theme/globalStyle'
import ReportCell from '../ReportCell/ReportCell'

const { height } = Dimensions.get('window')

export default function ReportTable({ data, navigation }) {
  return (
    <View style={{ marginBottom: height - (height - 350) }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <View>
              <Text
                style={{
                  ...appStyles.textRegular,
                  color: appColors.appDarkAsh,
                  textAlign: 'center',
                }}
              >
                {en.DATE}
              </Text>
            </View>
          </DataTable.Title>
          <DataTable.Title>
            <View>
              <Text
                style={{
                  ...appStyles.textRegular,
                  color: appColors.appDarkAsh,
                  textAlign: 'center',
                }}
              >
                {en.TOTAL_IN}
              </Text>
            </View>
          </DataTable.Title>
          <DataTable.Title>
            <View>
              <Text
                style={{
                  ...appStyles.textRegular,
                  color: appColors.appDarkAsh,
                  textAlign: 'center',
                }}
              >
                {en.TOTAL_OUT}
              </Text>
            </View>
          </DataTable.Title>
          <DataTable.Title>
            <View>
              <Text
                style={{
                  ...appStyles.textRegular,
                  color: appColors.appDarkAsh,
                  textAlign: 'center',
                }}
              >
                {en.BALANCE}
              </Text>
            </View>
          </DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ReportCell
              time={item.date}
              cashIn={item.totalCashIn}
              cashOut={item.totalCashOut}
              Balance={item.balanceOfDay}
              navigation={navigation}
              item={item}
            />
          )}
          keyExtractor={(item) => item.index}
        />
      </DataTable>
    </View>
  )
}
