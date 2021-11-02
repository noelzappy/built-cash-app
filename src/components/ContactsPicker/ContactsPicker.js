import React, { useState } from 'react'
import { View, Text, Modal, FlatList, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as Contacts from 'expo-contacts'
import { width, height } from 'react-native-dimension'
import _ from 'lodash'
import { appColors, appStyles } from '../../theme/globalStyle'
import en from '../../languages/english'

export default function ContactsPicker(props) {
  const { setSelectedCustomer } = props
  const [showContactsModal, setShowContactsModal] = useState(false)
  const [allContact, setAllContact] = useState(null)
  const [tempContact, setTempContact] = useState(null)

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
    // console.log(item)
    return (
      <View
        style={{
          borderBottomColor: appColors.appLightAsh,
          borderBottomWidth: width(0.08),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedCustomer(item)
            setTempContact(item)
            setShowContactsModal(false)
          }}
          style={{
            paddingVertical: height(1.6),
            paddingStart: width(4),
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: appColors.appBase, //`#${Math.floor(Math.random() * 16777215).toString(16)}`,
              padding: width(2),
              borderRadius: width(50),
              justifyContent: 'flex-start',
              marginRight: width(5),
              alignItems: 'center',
              alignContent: 'center',
              width: width(12),
            }}
          >
            <Text style={{ ...appStyles.headHuge, textAlign: 'center' }}>
              {item.name.charAt(0)}
            </Text>
          </View>
          <View>
            <Text
              style={{
                ...appStyles.textMaxi,
                justifyContent: 'flex-start',
                color: appColors.appDarkAsh,
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                ...appStyles.textRegular,
                justifyContent: 'flex-start',
                color: appColors.appDarkAsh,
              }}
            >
              {item.phoneNumbers ? item.phoneNumbers[0].number : null}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          selectCustomer()
          setShowContactsModal(true)
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: appColors.appWhite,
          padding: width(4),
          borderRadius: width(2),
          elevation: 1,
        }}
      >
        <AntDesign name="contacts" size={width(5)} color={appColors.appBlue} />
        {tempContact ? (
          <Text
            style={{
              ...appStyles.textMaxi,
              color: appColors.appDarkAsh,
              paddingLeft: width(1.5),
            }}
          >
            {tempContact.name}
          </Text>
        ) : (
          <Text
            style={{
              ...appStyles.textMaxi,
              color: appColors.appDarkAsh,
              paddingLeft: width(1.5),
            }}
          >
            Add A Customer
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={showContactsModal}
        animationType="slide"
        style={{ backgroundColor: appColors.appDirtyWhite }}
      >
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: appColors.appDirtyWhite,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowContactsModal(false)}
            style={{
              alignItems: 'flex-start',
              paddingVertical: height(1.5),
              justifyContent: 'center',
              paddingLeft: width(3),
            }}
          >
            <AntDesign
              name="close"
              size={width(7)}
              color={appColors.appDarkAsh}
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Text
              style={{
                ...appStyles.headBig,
                textAlign: 'center',
                color: appColors.appDarkAsh,
              }}
            >
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
