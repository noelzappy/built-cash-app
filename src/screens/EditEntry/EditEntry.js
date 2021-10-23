import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-native-datepicker'
import { Input, Button, TextArea } from 'native-base'
import * as Contacts from 'expo-contacts'
import { AntDesign } from '@expo/vector-icons'
import { colors, globalStyles } from '../../theme'
import en from '../../languages/english'
import { updateEntry, updateCashInHand } from '../../utils/actions'

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
const { height, width } = Dimensions.get('window')

export default function EditEntry({ route, navigation }) {
  const { itemId, entryItem, itemDate } = route.params

  const nowDate = new Date()
  const today =
    `${nowDate.getDate()}-${nowDate.getMonth()}-${nowDate.getFullYear()}`.toString()

  const { totalAmountInHand } = useSelector((state) => state.mainReducer)
  const dispatch = useDispatch()
  const [entryAmount, setEntryAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [isSaving, setIsSaving] = useState(false)
  const [date, setDate] = useState(today)
  const [description, setDescription] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [showContactsModal, setShowContactsModal] = useState(false)
  const [allContact, setAllContact] = useState(null)
  const [initialTime, setInitialTime] = useState(null)

  useEffect(() => {
    setPaymentMethod(entryItem.paymentMethod)
    setEntryAmount(entryItem.amount)
    setDescription(entryItem.description)
    setInitialTime(entryItem.time)
    setDate(entryItem.date)
    if (entryItem.customer) {
      setSelectedCustomer(entryItem.customer)
    }
  }, [])

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

    const entry = {
      paymentMethod,
      amount: entryAmount,
      entryType: entryItem.entryType,
      description,
      date,
      time: initialTime,
      customer: selectedCustomer,
      editedTime: time,
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
      setIsSaving(false)
      return
    }

    // let tempAmount = 0
    // if (entryItem.entryType === 'cashIn') {
    //   tempAmount = parseFloat(entryAmount)
    // } else {
    //   tempAmount = -Math.abs(parseFloat(entryAmount))
    // }
    // const finalAmount =
    //   parseFloat(totalAmountInHand - entryItem.amount) + tempAmount

    // // console.log(finalAmount)
    dispatch(updateEntry({ itemId, itemDate, entry }))
    const tempCashInHand = parseFloat(totalAmountInHand - entryItem.amount)

    dispatch(updateCashInHand({ totalAmountInHand: tempCashInHand, entry }))

    showMessage({
      type: 'success',
      message: en.SUCCESS,
      description: en.TRANSACTION_SAVED,
      hideOnPress: true,
    })
    setEntryAmount('')
    setDescription('')
    setSelectedCustomer(null)
    setDate(today)
    setIsSaving(false)

    navigation.navigate('Home')
  }

  const selectCustomer = async () => {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync()

      if (data.length > 0) {
        setAllContact(data)
      }
      setShowContactsModal(true)
    }
  }

  const renderContactList = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          paddingVertical: height - (height - 15),
          backgroundColor: colors.lightGrayPurple,
          margin: height - (height - 3),
          paddingHorizontal: height - (height - 10),
        }}
        onPress={() => {
          setSelectedCustomer(item)
          setShowContactsModal(false)
        }}
      >
        <Text
          style={{
            ...globalStyles.normalFontSize,
            justifyContent: 'flex-start',
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    )
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

        <TouchableOpacity
          onPress={() => {
            selectCustomer()
          }}
          style={{
            backgroundColor: colors.lightPurple,
            padding: 5,
          }}
        >
          <Text>{en.ADD_CUSTOMER}</Text>
          {selectedCustomer ? <Text>{selectedCustomer.name}</Text> : null}
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={() => {
            setIsSaving(true)
            handleSaveEntry()
          }}
          isLoading={isSaving}
          isLoadingText="Updating Data"
        >
          {en.UPDATE_ENTRY}
        </Button>
      </View>

      <Modal visible={showContactsModal} animationType="slide">
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity
            onPress={() => setShowContactsModal(false)}
            style={{
              alignItems: 'flex-start',
              padding: 15,
              justifyContent: 'center',
            }}
          >
            <AntDesign name="close" size={26} color="black" />
          </TouchableOpacity>
          <View
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          >
            <Text style={{ ...globalStyles.headingText, textAlign: 'center' }}>
              {en.CHOOSE_A_CUSTOMER}
            </Text>
          </View>
        </View>

        <View>
          {allContact ? (
            <FlatList
              data={allContact}
              renderItem={renderContactList}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <View>
              <Text>{en.CONTACT_PERMISSION_FAIL}</Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  )
}
