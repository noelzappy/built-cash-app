import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button, TextArea } from 'native-base'
import { showMessage } from 'react-native-flash-message'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase'
import { colors } from '../../theme'
import en from '../../languages/english'

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

export default function CashOut() {
  const [entryAmount, setEntryAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [isSaving, setIsSaving] = useState(false)
  const [date, setDate] = useState(new Date(1598051730000))
  const [showDateSelector, setShowDateSelector] = useState(false)
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
    setIsSaving(true)
    const payload = {
      paymentMethod,
      amount: entryAmount,
      entryType: 'cash in',
      description,
      // date,
    }
    if (payload.amount === '') {
      showMessage({
        type: 'danger',
        message: 'Entry Error',
        description: 'Amount cannot be empty',
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
      setIsSaving(false)
      return
    }

    console.log(payload)
    setIsSaving(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.Input}>
        <Input
          width="100%" // mx={3}
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
          placeholder="Enter Description"
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
          {showDateSelector ? (
            <DateTimePicker
              value={date}
              placeholder="Select Date"
              format="YYYY-MM-DD"
              mode="date"
              onChange={(e, d) => {
                onDateChange(d)
              }}
              display="default"
            />
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setShowDateSelector(true)
                }}
              >
                <Text> Change Date</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <Text>Add Attachment</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={() => {
            handleSaveEntry()
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
