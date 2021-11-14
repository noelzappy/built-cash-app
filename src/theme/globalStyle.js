import { StyleSheet, Platform, } from 'react-native'
import { width, height, totalSize, } from 'react-native-dimension'
import Constants from 'expo-constants'
import colors from './colors'

export const appColors = {
  appBlue: '#2F5794',
  appWhite: '#fff',
  appGreen: '#0E9873',
  appLightGold: '#F1C944',
  appDarkGold: '#D1AE37',
  appDarkAsh: '#686868',
  appMediumAsh: '#A5A5A5',
  appLightAsh: '#E1DDDD',
  appRed: '#f07167',
  appDirtyWhite: '#F0F3FA',
  appBase: '#2F5794',
  _appBase: '#00BFA6',
  appTBlue: 'rgba(47, 87, 148, 0.4)',
  appTGreen: 'rgba(14, 152, 115, 0.4)',
  appTGold: 'rgba(241, 201, 68, 0.3)',
  appTRed: 'rgba(240, 113, 103, 0.4)',
  appTBase: 'rgba(0, 191, 166, 0.4)',
}

export const fontSizes = {
  huge: Platform.OS === 'ios' ? totalSize(2.8) : totalSize(3),
  big: Platform.OS === 'ios' ? totalSize(2.3) : totalSize(2.5),
  maxi: Platform.OS === 'ios' ? totalSize(1.8) : totalSize(2),
  normal: Platform.OS === 'ios' ? totalSize(1.3) : totalSize(1.5),
  small: Platform.OS === 'ios' ? totalSize(0.8) : totalSize(1),
}

export const appStyles = {
  statusBar: {
    backgroundColor: appColors.appBase,
    height: Constants.statusBarHeight,
  },
  headMaxi: {
    fontSize: fontSizes.maxi,
    fontWeight: 'bold',
    color: appColors.appWhite,
  },
  headBig: {
    fontSize: fontSizes.big,
    fontWeight: 'bold',
    color: appColors.appWhite,
  },
  headHuge: {
    fontSize: fontSizes.huge,
    fontWeight: 'bold',
    color: appColors.appWhite,
  },
  headRegular: {
    fontSize: fontSizes.normal,
    fontWeight: 'bold',
    color: appColors.appWhite,
  },
  textRegular: {
    fontSize: fontSizes.normal,
    color: appColors.appWhite,
  },
  textMaxi: {
    fontSize: fontSizes.maxi,
    color: appColors.appWhite,
  },
  headTwo: {
    fontSize: fontSizes.huge,
  },

  // Form Styles
  textInputField: {
    flexDirection: 'row',
    width: '85%',
    height: height(5),
    marginBottom: height(2),
    borderColor: 'rgb(229,229,229)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: height(5) / 2,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    width: '85%',
    height: height(5),
    paddingLeft: width(12),
    color: 'rgb(150,150,150)',
    fontSize: fontSizes.maxi,
  },
  textInputImage: {
    position: 'absolute',
    bottom: height(1),
    left: width(5),
    width: width(4.1),
    height: height(2.5),
  },
  formBox: {
    alignItems: 'center',
  },

  // Home styles
  homeContainer: {
    backgroundColor: appColors.appDirtyWhite,
  },
  headerStyle: {
    paddingTop: Platform.OS === 'ios' ? height(4) : width(10),
    paddingLeft: 0,
    // paddingLeft: width(5),
    // paddingRight: width(5),
  },
  badgeNumber: {
    position: 'absolute',
    backgroundColor: appColors.appDarkGold,
    padding: 2,
    top: -width(4),
    left: -5,
    borderRadius: 5,
    elevation: 2,
  },
  avatarContainer: {
    width: '100%',
    marginTop: height(3),
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: width(15),
    height: width(15),
    borderWidth: width(1),
    borderColor: appColors.appWhite,
    backgroundColor: appColors.appWhite,
    borderRadius: width(20) / 2,
    // resizeMode: 'contain'
  },
  listAvatarContainer3: {
    width: '100%',
    marginTop: height(1),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  listAvatarContainer: {
    width: '100%',
    marginTop: height(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listAvatarContainer2: {
    flexDirection: 'row',
  },
  listAvatarImage: {
    width: width(15),
    height: width(15),
    // borderWidth: width(1),
    // borderColor: appColors.appWhite,
    backgroundColor: appColors.appWhite,
    borderRadius: width(20) / 2,
  },
  listAvatarContainerImage: {
    width: width(15),
    height: width(15),
    // borderWidth: width(1),
    // borderColor: appColors.appWhite,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.appDarkAsh,
    borderRadius: width(20) / 2,
  },
  mainCard: {
    width: '99%',
    paddingTop: height(1),
    paddingLeft: '5%',
    paddingRight: '5%',
    // height: height(40),
    borderRadius: width(2),
    paddingBottom: height(3),
    marginTop: height(3),
    borderColor: '#fff',
    elevation: 2,

    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3,
  },

  underline: {
    width: '100%',
    marginTop: height(1),
    marginBottom: height(1),
    borderBottomWidth: height(0.07),
    borderBottomColor: appColors.appDarkAsh,
    opacity: 0.2,
  },
}

export const globalStyles = StyleSheet.create({
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
  headingText: {
    fontSize: 22,
    color: colors.darkPurple,
  },
  normalFontSize: {
    fontSize: 18,
  },
})

export default globalStyles
