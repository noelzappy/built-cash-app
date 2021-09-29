import React, { useRef, useState } from 'react'
import {
  Text,
  View,
  TextInput,
  Button,
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
import { Input } from 'native-base'
import firebaseApp from '../../constants/firebaseConfig'
import { colors } from '../../theme'

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
})

const AuthScreen = ({ navigation }) => {
  const recaptchaVerifier = useRef(null)
  const [phoneNumber, setPhoneNumber] = useState()
  const [verificationId, setVerificationId] = useState()
  const [verificationCode, setVerificationCode] = useState()

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
        title="Verify"
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
          } catch (err) {
            showMessage({
              message: 'Verification Failed',
              description: `Error: ${err.message}`,
              type: 'danger',
            })
          }
        }}
      />

      <View>
        <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
        <TextInput
          style={{ marginVertical: 10, fontSize: 17 }}
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={setVerificationCode}
        />
        <Button
          title="Confirm Verification Code"
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
            }
          }}
        />
      </View>

      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  )
}

export default AuthScreen
