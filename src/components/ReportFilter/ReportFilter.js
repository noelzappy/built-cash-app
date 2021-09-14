import React, { useState } from 'react'
import { View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { FontAwesome5 } from '@expo/vector-icons'
import { Actionsheet, useDisclose } from 'native-base'
import { colors } from '../../theme'

export default function ReportFilter() {
  const today = new Date()

  const [fromDate, setFromDate] = useState(today)
  const [toDate, setToDate] = useState(today)
  const { isOpen, onOpen, onClose } = useDisclose()
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
      }}
    >
      <View>
        <DatePicker
          date={fromDate}
          placeholder="From Date"
          format="DD/MM/YY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(d) => setFromDate(d)}
          showIcon={false}
        />
      </View>
      <View>
        <DatePicker
          date={toDate}
          placeholder="To Date"
          format="DD/MM/YY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(d) => setToDate(d)}
          showIcon={false}
        />
      </View>
      <View>
        <FontAwesome5.Button
          name="sliders-h"
          backgroundColor="transparent"
          color={colors.darkPurple}
          size={24}
          style={{
            borderWidth: 0.4,
            borderColor: colors.darkPurple,
          }}
          onPress={() => {
            onOpen()
          }}
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
            Today
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
            A Week Ago
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
            A Month Ago
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
            }}
          >
            A Year Ago
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  )
}
