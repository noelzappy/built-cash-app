import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'native-base'
import DropdownAlert from 'react-native-dropdownalert'
import { TouchableOpacity } from 'react-native-gesture-handler'
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
})

export default function CashOut() {
  const dropDownAlert = useRef()
  const [entryAmount, setEntryAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [isSaving, setIsSaving] = useState(false)

  const onAmountValueChange = (num) => {
    let newNumber = num.replace(/[^\d.-]/g, '')
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
      paymentMethod: paymentMethod,
      amount: entryAmount,
    }
    if (payload.amount === '') {
      dropDownAlert.alertWithType('error', 'Error', 'Amount cannot be empty')
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
            <Text style={{ fontSize: 25, color: colors.gray, padding: 7 }}>
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
      <DropdownAlert ref={dropDownAlert} />
    </View>
  )
}
