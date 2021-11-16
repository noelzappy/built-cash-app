import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, TextArea } from 'native-base'
import moment from 'moment'
import { width, height as pHeight } from 'react-native-dimension'
import { colors } from '../../theme'
import en from '../../languages/english'
import {
  saveTransaction,
  fetchTransactions,
  updateCashInHand,
  updateBalanceOfDay,
} from '../../utils/actions'
import { appColors, appStyles } from '../../theme/globalStyle'
import CustomDatePicker from '../../components/DatePicker'
import ContactsPicker from '../../components/ContactsPicker/ContactsPicker'

const styles = StyleSheet.create({
  paymentModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: width(3),
    alignItems: 'center',
    paddingStart: width(1),
    marginVertical: pHeight(2),
  },
  paymentMethodActive: {
    backgroundColor: appColors.appBase,
    paddingVertical: pHeight(1),
    paddingHorizontal: width(5),
    borderRadius: width(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodInActive: {
    paddingVertical: pHeight(1),
    paddingEnd: width(4),
    paddingStart: width(3),
    borderRadius: width(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textActive: {
    fontSize: 20,
    color: 'white',
  },
  label: {
    fontSize: 20,
    color: colors.black,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginBottom: 20,
  },
})

export default function EntryScreen({ route, navigation }) {
  const { entryType } = route.params

  const today = moment().format('MM-DD-YYYY')

  const {
    totalAmountInHand,
    businessDetails,
    fetchTotalAmountInHandFailed,
    fetchTotalAmountInHandFailedError,
    fetchTotalAmountInHandSuccess,
    allTransactions,
    fetchTransactionsFailed,
    fetchTransactionsFailedError,
    fetchTransactionsSuccess,
    balanceOfDay,
    fetchBalanceOfDayFailed,
    fetchBalanceOfDayFailedError,
    fetchBalanceOfDaySuccess,
  } = useSelector((state) => state.mainReducer)
  const dispatch = useDispatch()
  const [entryAmount, setEntryAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('offline')
  const [isSaving, setIsSaving] = useState(false)
  const [date, setDate] = useState(today)
  const [description, setDescription] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  useEffect(() => {
    // showMessage({
    //   backgroundColor: appColors.appGreen,
    //   message: en.SUCCESS,
    //   description: en.TRANSACTION_SAVED,
    //   hideOnPress: true,
    // })
    // setEntryAmount('')
    // setDescription('')
    // setSelectedCustomer(null)
    // setDate(today)
    // navigation.navigate('Home')
    if (
      !fetchTotalAmountInHandFailed &&
      fetchTotalAmountInHandFailedError == null &&
      fetchTotalAmountInHandSuccess &&
      !fetchTransactionsFailed &&
      !fetchTransactionsFailedError &&
      fetchTransactionsSuccess &&
      !fetchBalanceOfDayFailed &&
      !fetchBalanceOfDayFailedError &&
      fetchBalanceOfDaySuccess
    ) {
      console.log(
        fetchTotalAmountInHandFailed,
        fetchTotalAmountInHandFailedError,
        fetchTotalAmountInHandSuccess,

        fetchTransactionsFailed,
        fetchTransactionsFailedError,
        fetchTransactionsSuccess,

        fetchBalanceOfDayFailed,
        fetchBalanceOfDayFailedError,
        fetchBalanceOfDaySuccess,
      )
    }
  }, [
    totalAmountInHand,
    fetchTotalAmountInHandFailed,
    fetchTotalAmountInHandFailedError,
    fetchTotalAmountInHandSuccess,

    balanceOfDay,
    fetchTransactionsFailed,
    fetchTransactionsFailedError,
    fetchTransactionsSuccess,
    allTransactions,
    fetchBalanceOfDayFailed,
    fetchBalanceOfDayFailedError,
    fetchBalanceOfDaySuccess,
  ])

  const onAmountValueChange = (num) => {
    const newNumber = num.replace(/[^\d.-]/g, '')
    setEntryAmount(newNumber)
  }

  const onOnlinePress = () => {
    setPaymentMethod('online')
  }
  const onOfflinePress = () => {
    setPaymentMethod('offline')
  }
  const handleSaveEntry = () => {
    const d = new Date()
    const time = `${d.getHours()}:${d.getMinutes()}`

    let tempAmount = 0
    if (entryType === 'cashIn') {
      tempAmount = parseFloat(entryAmount)
    } else {
      tempAmount = -Math.abs(parseFloat(entryAmount))
    }
    const finalAmount =
      parseFloat(totalAmountInHand.onlineBalance) +
      parseFloat(totalAmountInHand.offlineBalance) +
      tempAmount

    const entry = {
      paymentMethod,
      amount: entryAmount,
      entryType,
      description,
      date,
      time,
      customer: selectedCustomer,
    }

    if (entry.amount === '') {
      showMessage({
        type: 'danger',
        message: en.ERROR,
        description: en.AMOUNT_CANNOT_BE_EMPTY,
        textStyle: {
          fontSize: 16,
        },
        titleStyle: {
          fontSize: 18,
        },
        style: {
          paddingTop: pHeight(2),
        },
        hideOnPress: true,
      })
      setIsSaving(false)
      return
    }

    dispatch(updateBalanceOfDay(finalAmount))
    dispatch(updateCashInHand({ totalAmountInHand, entry }))
    dispatch(saveTransaction(entry))
    dispatch(fetchTransactions())
  }

  const onDateChange = (d) => {
    setDate(moment(d).format('MM-DD-YYYY'))
  }
  const contactsHandler = (contact) => {
    setSelectedCustomer(contact)
  }

  return (
    <View style={{ flex: 1, backgroundColor: appColors.appDirtyWhite }}>
      <View
        style={{
          marginVertical: pHeight(3),
          alignItems: 'center',
          marginHorizontal: width(3),
          borderWidth: width(0.07),
          borderColor: appColors.appMediumAsh,
          borderRadius: width(0.7),
          paddingVertical: pHeight(0.3),
          backgroundColor: appColors.appWhite,
        }}
      >
        <Input
          value={entryAmount}
          onChangeText={(num) => {
            onAmountValueChange(num)
          }}
          placeholder={en.ENTER_AMOUNT}
          keyboardType="numeric"
          InputLeftElement={
            <Text
              style={{
                ...appStyles.textMaxi,
                color: appColors.appDarkAsh,
                padding: 7,
              }}
            >
              {businessDetails.country.currency[0]} |
            </Text>
          }
          size="xl"
          borderColor={appColors.appMediumAsh}
          variant="unstyled"
        />
      </View>

      <View style={styles.paymentModeContainer}>
        <Text style={styles.label}>{en.PAYMENT_METHOD}</Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: appColors.appMediumAsh,
            borderRadius: width(12),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={
              paymentMethod === 'offline'
                ? styles.paymentMethodActive
                : styles.paymentMethodInActive
            }
            onPress={() => {
              onOfflinePress()
            }}
          >
            <Text style={styles.textActive}>{en.CASH}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              paymentMethod === 'online'
                ? styles.paymentMethodActive
                : styles.paymentMethodInActive
            }
            onPress={() => {
              onOnlinePress()
            }}
          >
            <Text style={styles.textActive}>{en.ONLINE}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ margin: width(3), backgroundColor: appColors.appWhite }}>
        <TextArea
          h={20}
          placeholder={en.ENTER_DESCRIPTION}
          w={{
            base: '100%',
            md: '25%',
          }}
          value={description}
          onChangeText={(text) => setDescription(text)}
          totalLines={3}
          size="2xl"
          borderRadius={width(3)}
          variant="unstyled"
          style={{ borderRadius: width(2) }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: width(4),
          marginTop: 30,
        }}
      >
        <CustomDatePicker onDateChange={onDateChange} />

        <ContactsPicker setSelectedCustomer={contactsHandler} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={{
            backgroundColor:
              entryType === 'cashIn' ? appColors.appGreen : appColors.appRed,
            marginHorizontal: width(3),
            height: pHeight(5.5),
            elevation: 1,
          }}
          onPress={() => {
            setIsSaving(true)
            handleSaveEntry()
          }}
          isLoading={isSaving}
          isLoadingText=" Saving Data"
          size="lg"
        >
          {en.SAVE_ENTRY}
        </Button>
      </View>
    </View>
  )
}
