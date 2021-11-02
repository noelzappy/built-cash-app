import React, { useState, useEffect, useCallback } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { width, height as pHeight } from 'react-native-dimension'
import DownloadReportButton from '../DownloadReportBtn'
import ReportFilter from '../ReportFilter/ReportFilter'
import ReportHeader from '../ReportHeader/ReportHeader'
import ReportTable from '../ReportsTable/ReportTable'
import en from '../../languages/english'
import { appColors } from '../../theme/globalStyle'
import DetailBottomSheet from '../DetailBottomSheet/DetailBottomSheet'

export default function ReportTab({ data, navigation, route }) {
  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)
  const [openSheet, setOpenSheet] = useState(false)

  const sheetHandler = (index) => {
    if (index === -1) {
      setOpenSheet(false)
    }
  }

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

  const getFilterDate = (d) => {
    console.log(d)
  }

  return (
    <View style={{ backgroundColor: appColors.appDirtyWhite, flex: 1 }}>
      <ReportFilter getFilterDate={getFilterDate} />
      <TouchableOpacity
        onPress={() => {
          setOpenSheet(true)
        }}
        activeOpacity={0.7}
      >
        <ReportHeader
          totalIn={totalIn}
          totalOut={totalOut}
          balance={totalIn - totalOut}
        />
      </TouchableOpacity>
      {openSheet ? (
        <TouchableOpacity
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0.5,
            backgroundColor: 'black',
            width: width(100),
            height: pHeight(100),
          }}
          activeOpacity={0.5}
          onPress={() => {
            setOpenSheet(false)
          }}
        />
      ) : null}

      <ReportTable data={data} navigation={navigation} route={route} />
      <DownloadReportButton />

      <DetailBottomSheet
        title={en.THIS_MONTH}
        totalIn={totalIn}
        totalOut={totalOut}
        callBack={sheetHandler}
        openSheet={openSheet}
        extra={false}
        totalINPaidOnline={0}
        totalINPaidOffline={0}
        totalOUTPaidOffline={0}
        totalOUTPaidOnline={0}
      />
    </View>
  )
}
