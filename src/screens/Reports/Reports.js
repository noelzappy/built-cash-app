import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { TouchableOpacity, View, Alert } from 'react-native'
import { width, height as pHeight } from 'react-native-dimension'
import * as Print from 'expo-print'
import { shareAsync } from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import moment from 'moment'

// Components
import DownloadReportButton from 'components/DownloadReportBtn'
import ReportFilter from 'components/ReportFilter/ReportFilter'
import ReportHeader from 'components/ReportHeader/ReportHeader'
import ReportTable from 'components/ReportsTable/ReportTable'
import DetailBottomSheet from 'components/DetailBottomSheet/DetailBottomSheet'
import { appColors } from 'theme/globalStyle'
import en from '../../languages/english'

export default function Reports({ navigation, route }) {
  const { allTransactions, totalAmountInHand, businessDetails } = useSelector(
    (state) => state.mainReducer,
  )

  const [data, setData] = useState([])

  const [totalIn, setTotalIn] = useState(0)
  const [totalOut, setTotalOut] = useState(0)
  const [openSheet, setOpenSheet] = useState(false)

  const [totalINPaidOnline, setTotalINPaidOnline] = useState(0)
  const [totalINPaidOffline, setTotalINPaidOffline] = useState(0)
  const [totalOUTPaidOnline, setTotalOUTPaidOnline] = useState(0)
  const [totalOUTPaidOffline, setTotalOUTPaidOffline] = useState(0)

  const [sheetTitle, setSheetTitle] = useState(en.THIS_MONTH)
  const [exportedReport, setExportedReport] = useState([])

  const generatePrintableReport = () => {
    const tempArray = []

    if (!_.isEmpty(allTransactions)) {
      Object.entries(allTransactions).forEach((item) => {
        let tempIn = 0
        let tempOut = 0
        const [d, entry] = item

        Object.values(entry).forEach((element) => {
          if (element !== entry.balanceOfDay) {
            if (element.entryType === 'cashIn') {
              tempIn += parseFloat(element.amount)
            } else {
              tempOut += parseFloat(element.amount)
            }
          }
        })

        tempArray.push(
          `  <tr id="table-inner-container"> <td>${d}</td> <td>${tempIn}</td> <td>${tempOut}</td>  <td>${
            entry.balanceOfDay
          }</td>  <td>${
            parseFloat(totalAmountInHand.offlineBalance) +
            parseFloat(totalAmountInHand.onlineBalance)
          }</td>  </tr>`,
        )
      })
    }

    setExportedReport(tempArray)
  }

  const generateReport = () => {
    const tempArray = []
    if (!_.isEmpty(allTransactions)) {
      Object.keys(allTransactions).forEach((key) => {
        let tempTotalCashIn = 0
        let tempTotalCashOut = 0

        let paidOnlineIN = 0
        let paidOnlineOUT = 0

        let paidOfflineIN = 0
        let paidOfflineOUT = 0

        Object.entries(allTransactions[key]).forEach((item) => {
          if (!item.includes('balanceOfDay')) {
            // console.log(item)
            if (item[1].entryType === 'cashIn') {
              tempTotalCashIn += parseFloat(item[1].amount)
              if (item[1].paymentMethod === 'cash') {
                paidOfflineIN += parseFloat(item[1].amount)
              } else {
                paidOnlineIN += parseFloat(item[1].amount)
              }
            } else {
              tempTotalCashOut += parseFloat(item[1].amount)

              if (item[1].paymentMethod === 'online') {
                paidOnlineOUT += parseFloat(item[1].amount)
              } else {
                paidOfflineOUT += parseFloat(item[1].amount)
              }
            }
          }
        })

        const tempData = {
          date: key,
          totalCashIn: tempTotalCashIn,
          totalCashOut: tempTotalCashOut,
          balanceOfDay: tempTotalCashIn - tempTotalCashOut,
        }
        setTotalOUTPaidOffline(paidOfflineOUT)
        setTotalOUTPaidOnline(paidOnlineOUT)
        setTotalINPaidOffline(paidOfflineIN)
        setTotalINPaidOnline(paidOnlineIN)

        tempArray.push(tempData)
      })
    }

    setData(tempArray)
  }
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

  const htmlToPrint = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <title>BUILT CASH BOOK REPORT</title>
    <style>
      /* @page {
        margin: 100px;
      } */
      .div-container {
        height: 5vh;
        max-height: 6vh;
      }
      .logo {
        /* margin-right: auto; */
        max-width: 100px;
        /* max-height: 8vh; */
        align-items: center;
        text-align: center;
      }
      .heading {
        text-align: center;
        align-items: center;
        padding: 3vh 0;
        font-size: 20px;
      }
      .my-btn {
        /* margin-left: 80vw; */
        align-items: center;
        text-align: right;
      }
      .business-name {
        color: white;
        font-size: 18px;
        text-align: left;
        margin-left: 3vw;
      }
      .d-btn {
        text-align: center;
        margin-left: 70vw;
        margin-top: 1vh;
      }
      .header-container {
        margin-bottom: 3vh;
        padding: 1vh 0;
        align-items: center;
      }
      .summary-container {
        border: 0.3px solid gainsboro;
        margin: 0 auto 3vh auto;
        border-radius: 10px;
        box-shadow: -3px 1px 35px -3px rgba(95, 94, 94, 0.51);
        padding: 2vh 5vw;
        justify-content: center;
        align-items: center;
        align-self: center;
      }
      .content-area {
        border: 0.3px solid gainsboro;
        margin: 0 auto 3vh auto;
        border-radius: 10px;
        box-shadow: -3px 1px 35px -3px rgba(95, 94, 94, 0.51);
        padding: 2vh 5vw;
        justify-content: center;
        align-items: center;
        align-self: center;
      }
      .footer-container {
        padding-top: 10px;
        padding-bottom: 10px;
        /* justify-content: center; */
        align-items: center;
      }
      .main-footer-text {
        text-align: left;
        color: white;
        justify-content: flex-start;
        padding: 1vh 3vw;
        width: 30vw;
      }
      .footer-btn {
        margin: 2vh 5vw;
        width: 30vw;
      }
      .help-text {
        justify-content: flex-end;
        color: white;
        margin-left: 10vw;
        width: 30vw;
      }
    </style>
  </head>
  <body>
    <section class="container-fluid bg-light">
      <header class="row bg-primary header-container">
        <h2 class="business-name" id="business-name">
          ${businessDetails.businessName}
          <span class="d-btn">
            <img
              src="https://builtaccounting.com/wp-content/uploads/2020/01/Built_logo_home.png"
              class="logo img-thumbnail rounded"
          /></span>
        </h2>
      </header>

      <div class="row summary-container">
        <div class="col">
          <p id="totalin-label">TOTAL IN</p>
          <p id="totalin-amount">${
            businessDetails.country.currency[0]
          } ${totalIn}</p>
          <p id="paid-in-online">ONLINE: ${
            businessDetails.country.currency[0]
          } ${totalINPaidOnline}</p>
          <p id="paid-in-offline">OFFLINE: ${
            businessDetails.country.currency[0]
          } ${totalINPaidOffline}</p>
        </div>
        <div class="col">
          <p id="totalout-label">TOTAL OUT</p>
          <p id="totalout-amount">${
            businessDetails.country.currency[0]
          } ${totalOut}</p>
          <p id="paid-out-online">ONLINE: ${
            businessDetails.country.currency[0]
          } ${totalOUTPaidOnline}</p>
          <p id="paid-out-offline">OFFLINE: ${
            businessDetails.country.currency[0]
          } ${totalOUTPaidOffline}</p>
        </div>
        <div class="col">
          <p id="net-balance-label">NET BALANCE</p>
          <p id="net-balance">${businessDetails.country.currency[0]} ${
    parseFloat(totalIn) - parseFloat(totalOut)
  }</p>
        </div>
      </div>

      <div class="container-fluid bg-light content-area">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" id="table-date-label">Date</th>
              <th scope="col" id="table-total-in-label">TOTAL IN</th>
              <th scope="col">TOTAL OUT</th>
              <th scope="col">DAILY BALANCE</th>
              <th scope="col">CASH IN HAND</th>
            </tr>
          </thead>
          <tbody>
           ${exportedReport}
          </tbody>
        </table>
      </div>

      <footer class="row footer-container bg-primary">
        <div>
          <span class="main-footer-text">Start Using Built Cash Book Now</span>
          <span class="footer-btn"
            ><a href="#" class="btn btn btn-light">Install</a></span
          >
          <span class="help-text">
            <a
              class="btn btn-clear"
              href="mailto:hello@builtaccounting.com"
              style="color: white"
            >
              hello@builtaccounting.com</a
            ></span
          >
        </div>
      </footer>
    </section>
  </body>
</html>
`

  const printToFile = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlToPrint,
      })

      const pdfName = `${uri.slice(
        0,
        uri.lastIndexOf('/') + 1,
      )}BUILT-CASHBOOK-REPORT-OF-${sheetTitle}.pdf`

      await FileSystem.moveAsync({
        from: uri,
        to: pdfName,
      })

      await shareAsync(pdfName, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
      })
    } catch (error) {
      Alert.alert('ERROR', error.message, [{ text: 'OK', onPress: () => {} }])
    }
  }

  const exportReport = () => {
    printToFile()
  }

  useEffect(() => {
    generatePrintableReport()
  }, [])

  useEffect(() => {
    calcReports()
  }, [data])

  const getFilterDate = (d) => {
    console.log(d)
  }

  useEffect(() => {
    generateReport()
  }, [allTransactions])

  return (
    <View style={{ backgroundColor: appColors.appDirtyWhite, flex: 1 }}>
      {/* <ReportFilter getFilterDate={getFilterDate} /> */}
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
      <DownloadReportButton exportReport={exportReport} />

      <DetailBottomSheet
        title={sheetTitle}
        totalIn={totalIn}
        totalOut={totalOut}
        callBack={sheetHandler}
        openSheet={openSheet}
        extra={false}
        totalINPaidOnline={totalINPaidOnline}
        totalINPaidOffline={totalINPaidOffline}
        totalOUTPaidOffline={totalOUTPaidOffline}
        totalOUTPaidOnline={totalOUTPaidOnline}
      />
    </View>
  )
}
