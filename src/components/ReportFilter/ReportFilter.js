import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Actionsheet, useDisclose } from 'native-base'
import CustomDatePicker from 'components/DatePicker'
import { width, height } from 'react-native-dimension'
import moment from 'moment'
import { colors } from '../../theme'
import { appColors } from '../../theme/globalStyle'
import en from '../../languages/english'

export default function ReportFilter(props) {
  const { getFilterDate } = props

  const today = new Date()

  const [fromDate, setFromDate] = useState(today)
  const [toDate, setToDate] = useState(today)
  const { isOpen, onOpen, onClose } = useDisclose()

  const fromDateHandler = (d) => {
    setFromDate(d)
    getFilterDate({ fromDate, toDate })
  }
  const toDateHandler = (d) => {
    setToDate(d)
    getFilterDate({ fromDate, toDate })
  }

  useEffect(() => {
    getFilterDate({ fromDate, toDate })
  }, [fromDate, toDate])
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height(3),
        alignItems: 'center',
        marginHorizontal: width(3),
      }}
    >
      <View>
        <CustomDatePicker onDateChange={fromDateHandler} />
      </View>
      <View>
        <CustomDatePicker onDateChange={toDateHandler} />
      </View>
      <View>
        <FontAwesome5.Button
          name="sliders-h"
          backgroundColor="transparent"
          color={appColors.appBase}
          size={width(7)}
          style={{
            justifyContent: 'center',
            backgroundColor: appColors.appWhite,
            alignItems: 'center',
          }}
          onPress={() => {
            onOpen()
          }}
          aciveOpacity={0.7}
          underlayColor="white"
        />
      </View>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => {
              setFromDate(today)
              setToDate(today)
              onClose()
            }}
          >
            {en.TODAY}
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              const d = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - 7,
              )
              setFromDate(d)
              setToDate(today)
              onClose()
            }}
          >
            {en.WEEK_AGO}
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              const d = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - 30,
              )
              setFromDate(d)
              setToDate(today)
              onClose()
            }}
          >
            {en.MONTH_AGO}
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              const d = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - 365,
              )
              setFromDate(d)
              setToDate(today)
              onClose()
              getFilterDate({ fromDate, toDate })
            }}
          >
            {en.YEAR_AGO}
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  )
}
