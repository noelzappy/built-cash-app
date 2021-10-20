import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-native-datepicker'
import { Input, Button, TextArea } from 'native-base'
import { colors } from '../../theme'
import en from '../../languages/english'
import {
  saveTransaction,
  fetchTransactions,
  updateCashInHand,
  updateBalanceOfDay,
} from '../../utils/actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Input: {
    marginVertical: 15,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  paymentModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    alignItems: 'center',
    paddingStart: 5,
    marginVertical: 7,
  },
  paymentModTabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 50,
  },
  paymentMethodActive: {
    backgroundColor: colors.darkPurple,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  paymentMethodInActive: {
    paddingVertical: 8,
    paddingEnd: 15,
    paddingStart: 5,
    borderRadius: 30,
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
  button: {
    backgroundColor: colors.green,
    marginHorizontal: 20,
  },
  button_out: {
    backgroundColor: colors.red,
    marginHorizontal: 20,
  },
  extraContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  desContainer: {
    margin: 20,
  },
})

// const uid = 'nZGfyZrDy6XmTGZhXNvoWXcxZv53'

export default function EntryScreen({ route, navigation }) {
  const { entryType } = route.params

  const nowDate = new Date()
  const today = `${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`.toString()

  const { totalAmountInHand } = useSelector((state) => state.mainReducer)
  const dispatch = useDispatch()
  const [entryAmount, setEntryAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [isSaving, setIsSaving] = useState(false)
  const [date, setDate] = useState(today)
  const [description, setDescription] = useState('')

  const onAmountValueChange = (num) => {
    const newNumber = num.replace(/[^\d.-]/g, '')
    setEntryAmount(newNumber)
  }

  const onOnlinePress = () => {
    setPaymentMethod('online')
  }
  const onOfflinePress = () => {
    setPaymentMethod('cash')
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
    const finalAmount = parseFloat(totalAmountInHand) + tempAmount

    const entry = {
      paymentMethod,
      amount: entryAmount,
      entryType,
      description,
      date,
      time,
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
          paddingTop: 40,
        },
      })

      return
    }

    dispatch(updateBalanceOfDay(finalAmount))
    dispatch(saveTransaction(entry))
    dispatch(updateCashInHand({ totalAmountInHand, entry }))

    showMessage({
      type: 'success',
      message: en.SUCCESS,
      description: en.TRANSACTION_SAVED,
      hideOnPress: true,
    })
    setEntryAmount('')
    setDescription('')
    setDate(today)
    setIsSaving(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.Input}>
        <Input
          width="100%"
          value={entryAmount}
          onChangeText={(num) => {
            onAmountValueChange(num)
          }}
          placeholder={en.ENTER_AMOUNT}
          keyboardType="numeric"
          InputLeftElement={
            <Text
              style={{
                fontSize: 25,
                color: colors.gray,
                padding: 7,
              }}
            >
              GHS |
            </Text>
          }
          fontSize={20}
          borderColor={colors.lightPurple}
        />
      </View>

      <View style={styles.paymentModeContainer}>
        <Text style={styles.label}>{en.PAYMENT_METHOD}</Text>

        <View style={styles.paymentModTabContainer}>
          <TouchableOpacity
            style={
              paymentMethod === 'cash'
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
      <View style={styles.desContainer}>
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
        />
      </View>
      <View style={styles.extraContainer}>
        <View>
          <DatePicker
            format="DD-MM-YYYY"
            showIcon={false}
            placeholder={date}
            date={date}
            onDateChange={(d) => {
              setDate(d)
            }}
            onCloseModal={() => {}}
          />
        </View>

        {/* <View>
          <Text>Add Attachment</Text>
        </View> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={entryType === 'cashIn' ? styles.button : styles.button_out}
          onPress={() => {
            setIsSaving(true)
            handleSaveEntry()
            dispatch(fetchTransactions())
          }}
          isLoading={isSaving}
          isLoadingText=" Saving Data"
        >
          Save
        </Button>
      </View>
    </View>
  )
}
