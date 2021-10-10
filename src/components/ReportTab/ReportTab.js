import React, { useState, useEffect, useCallback } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Actionsheet, useDisclose } from 'native-base'
import DownloadReportButton from '../DownloadReportButton'
import ReportFilter from '../ReportFilter/ReportFilter'
import ReportHeader from '../ReportHeader/ReportHeader'
import ReportTable from '../ReportsTable/ReportTable'
import en from '../../languages/english'

const styles = StyleSheet.create({
  dContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 100,
    justifyContent: 'space-between',
  },
  cContainer: {
    margin: 10,
    padding: 5,
  },
})

export default function ReportTab({ data }) {
  const { isOpen, onOpen, onClose } = useDisclose()
  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)
  const [openSheet, setOpenSheet] = useState(false)

  function calcReports() {
    let tempIn = 0
    let tempOut = 0
    data.forEach((element) => {
      tempIn += element.totalCashIn
      tempOut += element.totalCashOut
    })
    setTotalIn(tempIn)
    setTotalOut(tempOut)
  }

  useEffect(() => {
    calcReports()
  }, [data])

  return (
    <>
      <ReportFilter />
      <TouchableOpacity
        onPress={() => {
          onOpen()
        }}
        activeOpacity={0.7}
      >
        <ReportHeader
          totalIn={totalIn}
          totalOut={totalOut}
          balance={totalIn - totalOut}
        />
      </TouchableOpacity>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <View>
            <Text>{en.DETAILED_REPORT}</Text>
          </View>
          <View style={styles.dContainer}>
            <View style={styles.cContainer}>
              <Text>{en.OUT}</Text>
              <Text>{totalIn}</Text>
            </View>
            <View style={styles.cContainer}>
              <Text>{en.IN}</Text>
              <Text>{totalOut}</Text>
            </View>
            <View style={styles.cContainer}>
              <Text>{en.BALANCE}</Text>
              <Text>{totalIn - totalOut}</Text>
            </View>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
      <ReportTable data={data} />
      <DownloadReportButton />
    </>
  )
}
