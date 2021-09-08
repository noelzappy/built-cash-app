import React from 'react'
import ReportHeader from '../ReportHeader/ReportHeader'
import ReportTable from '../ReportsTable/ReportTable'

export default function ReportTab() {
  return (
    <>
      <ReportHeader />
      <ReportTable
        data={[
          {
            time: '10:15AM', cashIn: 300, cashOut: 43, balance: 250,
          },
          {
            time: '10:15AM', cashIn: 300, cashOut: 43, balance: 250,
          },
          {
            time: '10:15AM', cashIn: 300, cashOut: 43, balance: 250,
          },
          {
            time: '10:15AM', cashIn: 300, cashOut: 43, balance: 250,
          },
        ]}
      />
    </>
  )
}
