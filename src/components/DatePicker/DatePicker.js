import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import DatePicker from 'react-native-modern-datepicker'
import moment from 'moment'
import { width, height } from 'react-native-dimension'
import { MaterialIcons } from '@expo/vector-icons'
import { appColors, appStyles } from '../../theme/globalStyle'

export default function CustomDatePicker(props) {
  const { onDateChange } = props
  const [selectedDate, setSelectedDate] = useState(
    moment().format('MM-DD-YYYY'),
  )
  const [showModal, setShowModal] = useState(false)

  return (
    <View>
      <TouchableOpacity
        style={{
          borderWidth: width(0.08),
          borderColor: appColors.appMediumAsh,
          padding: width(3),
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: width(1),
          backgroundColor: appColors.appWhite,
          flexDirection: 'row',
        }}
        onPress={() => setShowModal(true)}
      >
        <MaterialIcons
          name="date-range"
          size={width(7)}
          color={appColors.appBase}
        />
        <Text
          style={{
            ...appStyles.textMaxi,
            color: appColors.appDarkAsh,
            paddingLeft: width(0.5),
          }}
        >
          {selectedDate}
        </Text>
      </TouchableOpacity>
      <Modal isVisible={showModal} transparent animationIn="fadeIn">
        <DatePicker
          onSelectedChange={(d) => {
            setSelectedDate(moment(d).format('MM-DD-YYYY'))
            onDateChange(d)
            setShowModal(false)
          }}
          mode="date"
          current={moment().format('YYYY/MM/DD')}
          maximumDate={moment().format('YYYY/MM/DD')}
          style={{ borderRadius: width(3) }}
        />
      </Modal>
    </View>
  )
}
