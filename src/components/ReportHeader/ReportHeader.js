import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import { height, width } from 'react-native-dimension'
import en from '../../languages/english'
import { appColors, appStyles } from '../../theme/globalStyle'

const styles = StyleSheet.create({
  text: {
    ...appStyles.textRegular,
    color: appColors.appBase,
    textAlign: 'center',
  },
  figures: {
    ...appStyles.textMaxi,
    textAlign: 'center',
  },
  signs: {
    ...appStyles.textMaxi,
  },
})

export default function ReportHeader(props) {
  const { totalIn, totalOut, balance } = props
  return (
    <View
      style={{
        ...appStyles.mainCard,
        backgroundColor: appColors.appWhite,
        flexDirection: 'row',
        marginVertical: height(2),
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 1,
        alignItems: 'center',
      }}
    >
      <View style={{ flexGrow: 100 }}>
        <Text style={styles.text}>{en.TOTAL_IN}</Text>
        <Text
          style={{
            ...styles.figures,
            color: appColors.appGreen,
          }}
        >
          {totalIn}
        </Text>
      </View>

      <View style={styles.signs}>
        <FontAwesome5
          name="minus"
          size={width(4)}
          color={appColors.appDarkAsh}
        />
      </View>

      <View style={{ flexGrow: 100 }}>
        <Text style={styles.text}>{en.TOTAL_OUT}</Text>
        <Text
          style={{
            ...styles.figures,
            color: appColors.appRed,
          }}
        >
          {totalOut}
        </Text>
      </View>

      <View style={styles.signs}>
        <FontAwesome5
          name="equals"
          size={width(4)}
          color={appColors.appDarkAsh}
        />
      </View>

      <View style={{ flexGrow: 120 }}>
        <Text style={styles.text}>{en.NET_BALANCE}</Text>
        <Text
          style={{
            ...styles.figures,
            color: balance > 0 ? appColors.appGreen : appColors.appRed,
          }}
        >
          {balance}
        </Text>
      </View>
      <View style={{ width: '5%', maxWidth: '5%' }}>
        <AntDesign
          name="caretdown"
          size={width(5)}
          color={appColors.appBase}
          style={{ marginTop: 5 }}
        />
      </View>
    </View>
  )
}

ReportHeader.propTypes = {
  totalIn: PropTypes.number,
  totalOut: PropTypes.number,
  balance: PropTypes.number,
}

ReportHeader.defaultProps = {
  totalIn: 0,
  totalOut: 0,
  balance: 0,
}
