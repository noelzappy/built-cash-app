import React, { useState, useEffect, useCallback } from 'react'
import DownloadReportButton from '../DownloadReportButton'
import ReportFilter from '../ReportFilter/ReportFilter'
import ReportHeader from '../ReportHeader/ReportHeader'
import ReportTable from '../ReportsTable/ReportTable'

export default function ReportTab({ data }) {
  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)

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
      <ReportHeader
        totalIn={totalIn}
        totalOut={totalOut}
        balance={totalIn - totalOut}
      />
      <ReportTable data={data} />
      <DownloadReportButton />
    </>
  )
}
