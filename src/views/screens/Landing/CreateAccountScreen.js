import React, {useState} from 'react'
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
  import { useDispatch } from 'react-redux';
  import { useSelector } from 'react-redux';
  import TextLink from 'react-native-text-link';
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { AccountTextBox } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  const CreateAccountSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(6, 'Minimum characters is 6!')
        .max(25, 'Maximum characters is 25!').required('Please enter your fullname'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter your email address'),
    phone: Yup.string()
      .min(11, 'Phone number must be 11 digits')
      .max(11, 'Phone number must be 11 digits')
      .matches(/^[0-9]+$/, 'Please enter a valid phone number')
      .required('Please enter your phone number')
})


const CreateAccountScreen = ({navigation}) => {
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
    <View style={styles.logo}>
          <Image source={images.appLogo} 
          style={{
                height: wp(23), width: wp(23), borderRadius: wp(4), resizeMode: 'contain'
          }} />
    </View>

    <View style={styles.title}>
        <Text style={styles.mainTitle}>Create an Account</Text>
        <Text style={styles.titleDesc}>Please enter the details below to
        create an account</Text>
    </View>



    <View style={styles.formBox}>
          <View>
                <AccountTextBox 
                icon={icons.user}
                placeholder="First Name"
                phone={1}
                maxlength={11}
                />
          </View>
          <View>
                <AccountTextBox 
                icon={icons.profile}
                placeholder="Last Name"
                phone={1}
                maxlength={11}
                />
          </View>
          <View>
                <AccountTextBox 
                icon={icons.email}
                placeholder="Email Address"
                phone={1}
                maxlength={11}
                />
          </View>
          <View>
                <AccountTextBox 
                icon={icons.phone}
                placeholder="Phone Number"
                phone={1}
                maxlength={11}
                />
          </View>

          <View>
          <AccountTextBox 
          icon={icons.password}
          placeholder="Password"
          phone={1}
          maxlength={11}
          />
    </View>

    <View>
    <TextLink 
    textStyle={styles.textLinkStyle}
    textLinkStyle={{color: COLORS.prinmaryOrange}}
    links={[
      {
        text: 'Terms & Conditions',
        onPress: () =>  console.log('link to terms'),
      },
      {
        text: 'Privacy Policy',
        onPress: () =>  console.log('link to privacy'),
      },
    ]}>
    By continuing, you agree to our Terms & Conditions and Privacy Policy.
    </TextLink>
    </View>
    
    
    <TouchableOpacity
        style={styles.createActBtn}
    >
          <Text style={styles.btnRegister}>Register</Text>
    </TouchableOpacity>

    <TouchableOpacity
    onPress={() => navigation.navigate("Login")}
    style={styles.loginBtn}
>
      <Text style={styles.btnLogintxt}>Already have an account? Login</Text>
</TouchableOpacity>

    </View>


    
    </SafeAreaView>
 </KeyboardAwareScrollView>
  )
}

export default CreateAccountScreen

const styles = StyleSheet.create({
      textLinkStyle: {
            fontFamily: FONTS.POPPINS_REGULAR,
            fontSize: wp(3),
            color: COLORS.sliderDescText,
            lineHeight: wp(4.4),
            marginHorizontal: wp(3),
            marginTop: wp(2)
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
            paddingHorizontal: wp(5.3),
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
        marginTop: wp(5)
    },
    formBox: {
        marginHorizontal: wp(6)
    },
    titleDesc: {
        marginTop: wp(3),
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.2),
        width: wp(70),
        lineHeight: wp(4.5),
        color: COLORS.sliderDescText,
    },
      mainTitle: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(6),
        color: COLORS.primaryGreen,
      },
      title: {
        marginVertical: hp(2),
        marginHorizontal: wp(8),
        marginTop: wp(6)
      },
    logo: {
        marginHorizontal: wp(7),
        marginTop: hp(3)
      }
})