import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import en from '../../languages/english'
import { colors, globalStyles } from '../../theme'

const styles = StyleSheet.create({
  text: {
    color: colors.darkPurple,
    textAlign: 'center',
    fontSize: 16,
  },
  figures_in: {
    textAlign: 'center',
    fontSize: 24,
    color: colors.green,
    fontWeight: 'bold',
  },
  figures_out: {
    textAlign: 'center',
    fontSize: 24,
    color: colors.red,
    fontWeight: 'bold',
  },
  figures_bal: {
    textAlign: 'center',
    fontSize: 24,
    color: colors.green,
    fontWeight: 'bold',
  },
  signs: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexGrow: 70,
  },
})

export default function ReportHeader(props) {
  const { totalIn, totalOut, balance } = props
  return (
    <View style={globalStyles.allCardContainer}>
      <View style={{ flexGrow: 100 }}>
        <Text style={styles.text}>{en.TOTAL_IN}</Text>
        <Text style={styles.figures_in}>{totalIn}</Text>
      </View>

      <View style={styles.signs}>
        <Text />
        <FontAwesome5 name="minus" size={18} color={colors.darkPurple} />
      </View>

      <View style={{ flexGrow: 100 }}>
        <Text style={styles.text}>{en.TOTAL_OUT}</Text>
        <Text style={styles.figures_out}>{totalOut}</Text>
      </View>

      <View style={styles.signs}>
        <Text />
        <FontAwesome5 name="equals" size={18} color={colors.darkPurple} />
      </View>

      <View style={{ flexGrow: 120 }}>
        <Text style={styles.text}>{en.NET_BALANCE}</Text>
        <Text style={styles.figures_bal}>{balance}</Text>
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
