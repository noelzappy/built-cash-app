import React, { useState } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { DataTable } from 'react-native-paper'
import PropTypes from 'prop-types'
import { width, height } from 'react-native-dimension'
import { useSelector } from 'react-redux'
import en from '../../languages/english'
import CashTableCell from '../CashTableCell/CashTableCell'
import { appColors, appStyles } from '../../theme/globalStyle'

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
})

export default function CashTable(props) {
  const { data, totalInOut, navigation, route } = props
  const today = new Date().toLocaleDateString()

  const { businessDetails } = useSelector((state) => state.mainReducer)

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: width(0.5),
          alignItems: 'center',
        }}
      >
        <DataTable>
          <DataTable.Header
            style={{
              backgroundColor: appColors.appWhite,
              paddingTop: height(2),
              paddingBottom: height(5),
              // marginVertical: height(1),
              // justifyContent: 'center',
              // alignItems: 'center',
              // alignContent: 'center',
            }}
            // sortDirection="descending"
          >
            <DataTable.Title numberOfLines={1}>
              <View>
                <Text
                  style={{
                    ...appStyles.textRegular,
                    color: appColors.appDarkAsh,
                    // ...styles.text,
                  }}
                >
                  {en.TODAYS_ENTRIES}
                </Text>
                <Text
                  style={{
                    ...appStyles.textMaxi,
                    color: appColors.appBase,
                    ...styles.text,
                  }}
                >
                  {today}
                </Text>
              </View>
            </DataTable.Title>
            <DataTable.Title>
              <View>
                <Text
                  style={{
                    ...appStyles.textRegular,
                    color: appColors.appDarkAsh,
                    ...styles.text,
                  }}
                >
                  {en.TOTAL_IN}
                </Text>
                <Text
                  style={{
                    ...appStyles.textMaxi,
                    color: appColors.appGreen,
                    ...styles.text,
                  }}
                >
                  {`${businessDetails.country.currency[0]} ${totalInOut.totalIn}`}
                </Text>
              </View>
            </DataTable.Title>
            <DataTable.Title>
              <View>
                <Text
                  style={{
                    ...appStyles.textRegular,
                    color: appColors.appDarkAsh,
                    ...styles.text,
                  }}
                >
                  {en.TOTAL_OUT}
                </Text>
                <Text
                  style={{
                    ...appStyles.textMaxi,
                    color: appColors.appRed,
                    ...styles.text,
                  }}
                >
                  {`${businessDetails.country.currency[0]} ${totalInOut.totalOut}`}
                </Text>
              </View>
            </DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              // console.log(item.key)
              return (
                <CashTableCell
                  cashIn={item.cashIn}
                  cashOut={item.cashOut}
                  time={item.time}
                  navigation={navigation}
                  route={route}
                  itemId={item.key}
                  itemDate={item.itemDate}
                />
              )
            }}
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
