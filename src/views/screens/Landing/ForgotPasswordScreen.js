import React, { useContext, useState } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, 
  Alert,
  Dimensions} from 'react-native';
  import { Formik } from 'formik';
  import * as Yup from 'yup'
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { AccountTextBox } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  const CreateAccountSchema = Yup.object().shape({

    username: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter your email address'),
    pinNumber: Yup.string()
      .min(6, 'Invalid PIN number')
      .max(6, 'Invalid PIN number')
      .matches(/^[0-9]+$/, 'Invalid PIN number')
      .required('Please enter your PIN Number')
})

const ForgotPasswordScreen = ({navigation}) => {
  return (
        <KeyboardAwareScrollView 
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        keyboardShouldPersistTaps={"handled"}
        extraScrollHeight={-300}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: COLORS.BackgroundGrey
        }}
    > 
    <SafeAreaView>
    <StatusBar barStyle="dark-content" />

    <View style={styles.headerNav}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
        >
            <Image source={icons.back_arrow} 
                style={{
                    height: wp(5), width: wp(5), tintColor: COLORS.tabbedGray, resizeMode: 'contain'
                }}
            />
        </TouchableOpacity>
    </View>

      <View style={styles.logo}>
          <Image source={images.appLogo} 
          style={{
                height: wp(36), width: wp(36), borderRadius: wp(4), resizeMode: 'contain'
          }} />
      </View>

      <View style={styles.title}>
      <Text style={styles.mainTitle}>Reset your Password</Text>
      <Text style={styles.titleDesc}>Enter your email address below to reset your password</Text>
      </View>

      <View style={styles.formBox}>
            <View>
            <AccountTextBox 
            icon={icons.profile}
            placeholder="Phone Number"
            phone={1}
            maxlength={11}
            />
            </View>
      </View>
      <TouchableOpacity
          style={styles.forgotBtn}
      >
          <Text style={styles.forgotTxt}>Forgot Password?</Text>
      </TouchableOpacity>
        

      <View style={{marginTop: wp(8)}}>
                <TouchableOpacity
                style={styles.createActBtn}
            >
                  <Text style={styles.btnRegister}>Reset Password</Text>
            </TouchableOpacity>

      </View>

    </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    backBtn: {
        backgroundColor: COLORS.white,
        borderRadius: wp(4),
        width: wp(12),
        height: wp(11),
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerNav: {
        marginHorizontal: wp(6),
        marginTop: wp(4)
    },
        btnLogintxt: {
          color: COLORS.primaryGreen,
          fontFamily: FONTS.POPPINS_MEDIUM,
          fontSize:  wp(3.3),
      },
      loginBtn: {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: COLORS.primaryGreen,
          borderRadius: wp(10),
          paddingHorizontal: wp(13.5),
          paddingVertical: wp(3.3),
          alignSelf: 'center',
          marginTop: wp(3)
      },
      btnRegister: {
      color: COLORS.white,
      fontFamily: FONTS.POPPINS_SEMIBOLD,
      fontSize:  wp(3.7),
      },
      createActBtn: {
      backgroundColor: COLORS.prinmaryOrange,
      borderRadius: wp(10),
      paddingHorizontal: wp(25),
      paddingVertical: wp(3.5),
      alignSelf: 'center',
      marginTop: wp(2)
      },
  forgotTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.prinmaryOrange,
    fontSize: wp(3.2)
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginHorizontal: wp(8.5),
    marginTop: wp(2)
  },
  formBox: {
    marginHorizontal: wp(6),
    marginTop: wp(4)
},
  titleDesc: {
    marginTop: wp(1.5),
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.2),
    width: wp(70),
    lineHeight: wp(4.5),
    color: COLORS.sliderDescText,
},
  mainTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(5),
    color: COLORS.primaryGreen,
  },
  title: {
    marginVertical: hp(2),
    marginHorizontal: wp(8),
    marginTop: wp(8)
  },
  logo: {
    marginHorizontal: wp(5),
    marginTop: hp(5),
    alignSelf: 'center'
  }
})

export default ForgotPasswordScreen;
