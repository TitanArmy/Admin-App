import React, {useState} from 'react';
import {
  Button,
  TextInput,
  View,
  Alert,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  phone,
  Image,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import COLORS from '../Constant/color';
import STYLES from '../Constant/color';
import PhoneInput from 'react-native-phone-number-input';

export default function LoginScreen({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState('');

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(
      '+91' + phoneNumber,
    );
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      navigation.navigate('BottomNavigation');
    } catch (error) {
      Alert.alert('Invalid code.', error.message);
    }
  }

  if (!confirm) {
    // const onChangeNumber = ()=>{
    //   setPhoneNumber()
    // }
    return (
      <>
        <SafeAreaView style={styles.back}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View style={styles.text}>
              <Text style={styles.vin}>VIN</Text>
              <Text style={styles.ove}>OVE</Text>
            </View>
            <Image
              source={require('../assets/Img/phone.png')}
              style={{
                height: 10,
                width: 10,
                padding: 70,
                marginTop: 29,
                marginLeft: 110,
              }}
            />
            <View style={styles.second}>
              <Text style={styles.Enter}>Enter</Text>
              <Text style={styles.your}>Your</Text>
              <Text style={styles.phone}>Phone,</Text>
            </View>

            <Text style={styles.receive}>
              You Will Receive a 6 digit code for phone number verification
            </Text>
          {/* </ScrollView> */}
        </SafeAreaView>

        <View style={styles.third}>
          <PhoneInput
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            withShadow
            autoFocus
          />
          <TouchableHighlight
            style={styles.Number}
            onPress={() => signInWithPhoneNumber(phoneNumber)}
            underlayColor="#226557">
            <Text style={styles.continue}>Continue </Text>
          </TouchableHighlight>
          <Text style={styles.valid}>Don`t have an Valid Number ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signup}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <View style={styles.otp}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.verify}>Verify</Text>
        <Text style={styles.phone}>Phone</Text>
      </View>
      <Image
        source={require('../assets/Img/otpp.png')}
        style={{
          height: 50,
          width: 40,
          padding: 65,
          marginTop: 25,
          marginLeft: 48,
        }}
      />
      <Text style={styles.output}>Code is Send To Given Number</Text>
      <TextInput
        style={styles.confirmed}
        value={code}
        onChangeText={text => setCode(text)}
        keyboardType="phone-pad"
      />
      <Button title="Enter OTP" onPress={() => confirmCode()} color="#64beff" />
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    flex:1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  text: {
    flexDirection: 'row',
    marginTop: 40,
  },
  vin: {
    fontWeight: 'bold',
    fontSize: 35,
    color: COLORS.dark,
    marginTop:35
  },
  ove: {
    fontWeight: 'bold',
    fontSize: 35,
    color: COLORS.secondary,
    marginTop:35
  },
  second: {
    flexDirection: 'row',
    marginTop: 100,
  },
  Enter: {
    fontSize: 42,
    padding: 4,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  verify: {
    margin: 4,
    fontWeight: 'bold',
    fontSize: 37,
    color: COLORS.secondary,
  },
  phone: {
    margin: 4,
    fontWeight: 'bold',
    fontSize: 37,
    color: COLORS.dark,
  },
  your: {
    fontSize: 42,
    padding: 4,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  phone: {
    fontSize: 42,
    padding: 4,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  receive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.light,
  },
  third: {
   
    padding: 85,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  Number: {
    marginRight: 40,
    marginLeft: 50,
    marginTop: 12,
    paddingTop: 15,
    paddingBottom: 12,
    textAlign: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 19,
    borderWidth: 0.8,
    borderColor: 'black',
  },
  continue: {
    color: 'black',
    textAlign: 'center',
    marginRight: 10,
    marginLeft: 16,
  },
  valid: {
    color: COLORS.light,
    fontWeight: 'bold',
    padding: 13,
  },
  signup: {
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  otp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
  },
  output: {
    margin: 60,
    fontSize: 16,
    color: COLORS.light,
  },
  confirmed: {
    color: 'black',
    borderWidth: 1,
    width: 150,
    marginBottom: 20,
    borderRadius: 19,
  },
});
