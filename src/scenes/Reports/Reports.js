import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import ReportTab from '../../components/ReportTab'

export default function Reports() {
  const { allTransactions } = useSelector((state) => state.mainReducer)

  const [data, setData] = useState([])
  // console.log(allTransactions)

  const generateReport = () => {
    const tempArray = []
    if (!_.isEmpty(allTransactions)) {
      Object.keys(allTransactions).forEach((key) => {
        let tempTotalCashIn = 0
        let tempTotalCashOut = 0

        Object.entries(allTransactions[key]).forEach((item) => {
          // console.log(item[1])
          if (item[1].entryType === 'cashIn') {
            tempTotalCashIn += parseFloat(item[1].amount)
          } else {
            tempTotalCashOut += parseFloat(item[1].amount)
          }
        })

        const tempData = {
          date: key,
          totalCashIn: tempTotalCashIn,
          totalCashOut: tempTotalCashOut,
          balanceOfDay: tempTotalCashIn - tempTotalCashOut,
        }
        tempArray.push(tempData)
      })
    }
    setData(tempArray)
  }

  useEffect(() => {
    generateReport()
  }, [allTransactions])

  // console.log(data)

  return (
    <>
      <ReportTab data={data} />
    </>
  )
}
