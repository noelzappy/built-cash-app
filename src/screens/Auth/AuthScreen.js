import React, { useRef, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from 'expo-firebase-recaptcha'
import { width, height } from 'react-native-dimension'
import CountryPicker from 'react-native-country-picker-modal'
import * as firebase from 'firebase'
import { Input, Button } from 'native-base'
import Modal from 'react-native-modal'
import PhoneInput from 'react-native-phone-number-input'
import firebaseApp from '../../constants/firebaseConfig'
import { colors, globalStyles } from '../../theme'
import { appColors, fontSizes, appStyles } from '../../theme/globalStyle'
import en from '../../languages/english'
import {
  fetchBusinessDetails,
  fetchTransactions,
  loginUser,
  logoutUser,
  setBusinessDetails,
} from '../../utils/actions'
import LoginImg from '../../../assets/images/LoginImg.svg'

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  input: {
    marginBottom: 15,
    alignItems: 'center',
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 15,
    fontSize: 20,
  },
  heading: {
    marginTop: height(10),
    marginBottom: height(10),
  },
  headingText: {
    fontSize: 30,
    color: colors.darkPurple,
    textAlign: 'center',
  },
  modalInner: {
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  businessModal: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    borderRadius: 10,
    padding: 25,
  },
  businessInput: {
    marginVertical: 25,
  },
  businessModalHeader: {
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 24,
  },
})

const AuthScreen = ({ navigation }) => {
  const db = firebase.database()
  const recaptchaVerifier = useRef(null)
  const phoneInput = useRef(null)
  const [phoneNumber, setPhoneNumber] = useState()
  const [verificationId, setVerificationId] = useState()
  const [verificationCode, setVerificationCode] = useState()
  const [showModal, setShowModal] = useState(false)
  const [businessModal, setBusinessModal] = useState(false)
  const [businessName, setBusinessName] = useState()
  const [amountInHand, setAmountInHand] = useState('0')
  const [errorText, setErrorText] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formattedPhoneNumber, setformattedPhoneNumber] = useState('')
  const [verifyingCode, setVerifyingCode] = useState(false)
  const [countryCode, setCountryCode] = useState('GH')
  const [country, setCountry] = useState({
    callingCode: ['233'],
    cca2: 'GH',
    currency: ['GHS'],
    flag: 'flag-gh',
    name: 'Ghana',
    region: 'Africa',
    subregion: 'Western Africa',
  })
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const [businessAddress, setBusinessAddress] = useState('')
  const [savingBusiness, setSavingBusiness] = useState(false)

  const dispatch = useDispatch()

  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : firebaseApp

  const attemptInvisibleVerification = true

  function businessSetupHandler() {
    if (businessName === '' && businessAddress === '') {
      setErrorText(en.BUSINESS_SETUP_ERROR)
      return
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref(user.uid)
          .on('value', (snapshot) => {
            if (snapshot.exists()) {
              dispatch(fetchBusinessDetails())
              dispatch(fetchTransactions())
            } else {
              firebase
                .database()
                .ref(`${user.uid}/businessDetails`)
                .set({
                  businessName,
                  country,
                  phoneNumber: formattedPhoneNumber,
                })
                .catch((err) => {
                  console.log(err)
                })
              db.ref(`${user.uid}/transactions/totalAmount`).set({
                offlineBalance: amountInHand,
                onlineBalance: 0,
              })
            }
          })

        // console.log(user)
        dispatch(fetchBusinessDetails())
        dispatch(fetchTransactions())
        dispatch(loginUser(user))
        // dispatch(logoutUser())
      }
    })
  }

  async function verificationHandler() {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode,
      )
      await firebase.auth().signInWithCredential(credential)

      showMessage({
        message: 'Authentication Successful',
        description: 'You have successfully authenticated',
        type: 'success',
      })

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .database()
            .ref(user.uid)
            .on('value', (snapshot) => {
              if (snapshot.exists()) {
                dispatch(fetchBusinessDetails())
                dispatch(fetchTransactions())
                dispatch(loginUser(user))
              } else {
                setBusinessModal(true)
              }
            })
        }
      })
    } catch (err) {
      showMessage({
        message: 'Verification Error',
        description: `Error: ${err.message}`,
        type: 'danger',
      })
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: appColors.appDirtyWhite }}
      keyboardShouldPersistTaps
    >
      <View
        style={{
          ...appStyles.mainCard,
          ...styles.container,
          marginTop: height(20),
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: appColors.appWhite,
        }}
      >
        <View
          style={{
            marginTop: height(5),
            marginBottom: height(7),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoginImg width={width(50)} height={height(20)} />
        </View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={attemptInvisibleVerification}
        />

        <View style={styles.input}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="GH"
            layout="first"
            onChangeText={(text) => {
              setPhoneNumber(text)
            }}
            onChangeFormattedText={(text) => {
              setformattedPhoneNumber(text)
            }}
            withDarkTheme={false}
            withShadow
            autoFocus
          />
        </View>

        <Button
          disabled={!phoneNumber}
          onPress={async () => {
            setIsLoading(true)
            if (phoneInput.current?.isValidNumber(phoneNumber)) {
              try {
                const phoneProvider = new firebase.auth.PhoneAuthProvider()
                const verifyId = await phoneProvider.verifyPhoneNumber(
                  formattedPhoneNumber,
                  recaptchaVerifier.current,
                )
                setVerificationId(verifyId)
                showMessage({
                  message: 'Verification code sent',
                  type: 'warning',
                  description:
                    'Verification code successfully sent to your phone',
                })
                setShowModal(true)
              } catch (err) {
                showMessage({
                  message: 'Verification Failed',
                  description: `Error: ${err.message}`,
                  type: 'danger',
                })
                setIsLoading(true)
              } finally {
                setIsLoading(true)
              }
            } else {
              showMessage({
                message: 'Invalid Phone Number',
                type: 'danger',
                description:
                  'The provided phone number is invalid. Please try again',
              })
              setIsLoading(false)
            }
          }}
          isLoading={isLoading}
          size="lg"
          style={{
            backgroundColor: colors.appBase,
            marginVertical: height(2),
          }}
          height={height(5)}
        >
          Verify Phone
        </Button>

        <Modal isVisible={showModal} avoidKeyboard>
          <View style={styles.modalInner}>
            <Text style={{ marginTop: 20, fontSize: 18, paddingBottom: 10 }}>
              {en.ENTER_VERIFICATION_CODE}
            </Text>

            <Input
              style={{
                marginVertical: 10,
                fontSize: 17,
                padding: 5,
                width: '50%',
              }}
              editable={!!verificationId}
              placeholder="123456"
              onChangeText={setVerificationCode}
            />

            <Button
              disabled={!verificationId}
              onPress={() => {
                setVerifyingCode(true)
                verificationHandler()
              }}
              size="lg"
              style={{
                backgroundColor: colors.appBase,
                marginVertical: height(2),
              }}
              isLoading={verifyingCode}
              height={height(5)}
            >
              Confirm Code
            </Button>
          </View>
        </Modal>

        <Modal
          isVisible={businessModal}
          coverScreen
          hasBackdrop={false}
          avoidKeyboard={false}
        >
          <ScrollView
            style={{
              backgroundColor: appColors.appWhite,
              borderRadius: 10,
              padding: width(5),
            }}
          >
            <View>
              <Text style={styles.businessModalHeader}>
                {en.BUSINESS_SETUP}
              </Text>
            </View>

            <View>
              <View style={styles.businessInput}>
                {errorText ? (
                  <Text style={{ color: 'red', textAlign: 'center' }}>
                    {errorText}
                  </Text>
                ) : null}
                <Text
                  style={{
                    ...appStyles.textMaxi,
                    paddingVertical: width(2),
                    color: appColors.appDarkAsh,
                  }}
                >
                  {en.ENTER_BUSINESS_NAME}
                </Text>
                <Input
                  placeholder={en.ENTER_BUSINESS_NAME}
                  onChangeText={(text) => setBusinessName(text)}
                  value={businessName}
                  size="2xl"
                  onFocus={() => setErrorText(null)}
                />
              </View>
              <View style={styles.businessInput}>
                <Text
                  style={{
                    ...appStyles.textMaxi,
                    paddingVertical: width(2),
                    color: appColors.appDarkAsh,
                  }}
                >
                  {en.AMOUNT_IN_HAND}
                </Text>
                <Input
                  placeholder={en.AMOUNT_IN_HAND}
                  onChangeText={(text) => setAmountInHand(parseFloat(text))}
                  value={amountInHand}
                  keyboardType="numeric"
                  size="2xl"
                />
              </View>

              <View style={styles.businessInput}>
                <Text
                  style={{
                    ...appStyles.textMaxi,
                    paddingVertical: width(2),
                    color: appColors.appDarkAsh,
                  }}
                >
                  {en.BUSINESS_ADDRESS}
                </Text>
                <Input
                  placeholder={en.BUSINESS_ADDRESS}
                  onChangeText={(text) => setBusinessAddress(text)}
                  value={businessAddress}
                  size="2xl"
                  onFocus={() => setErrorText(null)}
                />
              </View>

              <View style={styles.businessInput}>
                <Text
                  style={{
                    ...appStyles.textMaxi,
                    paddingVertical: width(2),
                    color: appColors.appDarkAsh,
                  }}
                >
                  {en.CHOOSE_COUNTRY}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowCountrySelector(true)}
                  style={{
                    flexDirection: 'row',
                    borderWidth: 0.3,
                    borderColor: appColors.appDarkAsh,
                    paddingVertical: height(1),
                    paddingLeft: width(2),
                    borderRadius: 3,
                  }}
                >
                  <CountryPicker
                    {...{
                      countryCode,
                    }}
                    visible={showCountrySelector}
                    onSelect={(c) => {
                      setCountry(c)
                      setCountryCode(c.cca2)
                      setShowCountrySelector(false)
                      // console.log(c)
                    }}
                    onClose={() => setShowCountrySelector(false)}
                  />
                  <View
                    style={{
                      borderLeftWidth: 1,
                      borderLeftColor: appColors.appDarkAsh,
                      paddingLeft: width(2),
                    }}
                  >
                    <Text
                      style={{
                        ...appStyles.textMaxi,
                        color: appColors.appDarkAsh,
                      }}
                    >
                      {country.name ? country.name : 'Ghana'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ marginVertical: height(2), marginBottom: height(10) }}
            >
              <Button
                onPress={() => {
                  setSavingBusiness(true)
                  businessSetupHandler()
                }}
                size="lg"
                style={{
                  backgroundColor: colors.appBase,
                  padding: height(2),
                }}
                height={height(5)}
                isLoading={savingBusiness}
              >
                Submit
              </Button>
            </View>
          </ScrollView>
        </Modal>

        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </View>
    </ScrollView>
  )
}

export default AuthScreen
