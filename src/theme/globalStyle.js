import { StyleSheet } from 'react-native'
import colors from './colors'

const globalStyles = StyleSheet.create({
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    borderRadius: 2,
  },
  allCardContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 20,
    backgroundColor: 'rgba(35, 29, 84, 0.21)',
    borderRadius: 5,
  },
  cardTime: {
    margin: 4,
  },
  cardContainerInner: {
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTimeText: {
    color: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    fontSize: 14,
    margin: 4,
  },
  cardCashIn: {
    margin: 4,
    padding: 10,
  },
  cardCashInText: {
    color: 'rgba(0,128,0, 0.8)',
    fontSize: 20,
  },
  cardCashOutText: {
    color: 'rgba(255,0,0, 0.8)',
    fontSize: 20,
  },
  cardCashOut: {
    margin: 4,
    padding: 10,
  },
  allCardCash: {
    color: 'rgb(0,128,0)',
    fontSize: 22,
  },
  allCardCashText: {
    color: colors.darkPurple,
  },
  allCardBalance: {
    color: 'rgb(0,128,0)',
    fontSize: 22,
  },
  allCardBalanceText: {
    color: colors.darkPurple,
  },
})

export default globalStyles
