import React, { useRef, useState } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from 'expo-firebase-recaptcha'
import * as firebase from 'firebase'
import { Input, Button } from 'native-base'
import Modal from 'react-native-modal'
import firebaseApp from '../../constants/firebaseConfig'
import { colors } from '../../theme'
import en from '../../languages/english'

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  input: {
    marginBottom: 15,
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 15,
    fontSize: 20,
  },
  heading: {
    marginTop: 20,
    marginBottom: 30,
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
})

const AuthScreen = ({ navigation }) => {
  const recaptchaVerifier = useRef(null)
  const [phoneNumber, setPhoneNumber] = useState()
  const [verificationId, setVerificationId] = useState()
  const [verificationCode, setVerificationCode] = useState()
  const [showModal, setShowModal] = useState(false)

  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : firebaseApp

  const attemptInvisibleVerification = true

  // function phoneChecker(text) {
  //   console.log(+text)
  //   setPhoneNumber(phone)
  // }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Sign In</Text>
      </View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Text style={styles.description}>Enter Your Phone Number</Text>
      <View style={styles.input}>
        <Input
          InputLeftElement={
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18 }}>+233</Text>
            </View>
          }
          placeholder="Phone Number"
          autoFocus
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      <Button
        disabled={!phoneNumber}
        onPress={async () => {
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider()
            const verifyId = await phoneProvider.verifyPhoneNumber(
              `+233${phoneNumber}`,
              recaptchaVerifier.current,
            )
            setVerificationId(verifyId)
            await showMessage({
              message: 'Verification code sent',
              type: 'warning',
              description: 'Verification code successfully sent to your phone',
            })

            setShowModal(true)
          } catch (err) {
            showMessage({
              message: 'Verification Failed',
              description: `Error: ${err.message}`,
              type: 'danger',
            })
          }
        }}
      >
        Verify Phone
      </Button>

      <Modal
        isVisible={showModal}
        avoidKeyboard
        // style={{ backgroundColor: 'black' }}
      >
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
            style={{ marginTop: 10 }}
            disabled={!verificationId}
            onPress={async () => {
              try {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode,
                )
                await firebase.auth().signInWithCredential(credential)
                showMessage({ message: 'Phone authentication successful 👍' })
              } catch (err) {
                showMessage({ message: `Error: ${err.message}`, color: 'red' })
              } finally {
                setShowModal(false)
              }
            }}
          >
            Confirm Code
          </Button>
        </View>
      </Modal>

      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  )
}

export default AuthScreen
