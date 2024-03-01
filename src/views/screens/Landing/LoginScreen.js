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
  import { AccountTextBox, Loader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  const loginSchema = Yup.object().shape({

    phone: Yup.string()
      .min(11, 'Phone number must be 11 digits')
      .max(11, 'Phone number must be 11 digits')
      .matches(/^[0-9]+$/, 'Enter a valid phone number')
      .required('Enter phone number'),
    password: Yup.string()
      .min(6, 'Invalid password')
      .max(8, 'Invalid password')
      .matches(/^[0-9]+$/, 'Invalid password')
      .required('Enter password')
})

const LoginScreen = ({navigation}) => {

  //context
  const {ValidateCustomerLogin, isLoading} = useContext(AuthContext);

  //states
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');

  //Function to login
  const AuthenticateUser = async (values) => {
      ValidateCustomerLogin(values.phone, values.password);
  }
  // end of function

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

    {(isLoading) &&
      <Loader />
    }

      <View style={styles.logo}>
          <Image source={images.appLogo} 
          style={{
                height: wp(36), width: wp(36), borderRadius: wp(4), resizeMode: 'contain'
          }} />
      </View>

      <View style={styles.title}>
      <Text style={styles.mainTitle}>Welcome, Please Sign In</Text>
      <Text style={styles.titleDesc}>Enter your login details to sign in</Text>
      </View>


      <Formik
        initialValues={{
          phone: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={values => AuthenticateUser(values)}
      >

      {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
<View>
      <View style={styles.formBox}>
            <View style={styles.rowBox}>
            <AccountTextBox 
            icon={icons.profile}
            placeholder="Phone Number"
            phone={1}
            maxlength={11}
            value={values.phone}
            onChange={handleChange('phone')}
            />
            {errors.phone && 
              <Text style={styles.formErrortext}>{errors.phone}</Text>
            }
            </View>

            <View>
            <AccountTextBox 
            icon={icons.password}
            placeholder="Password"
            value={values.password}
            onChange={handleChange('password')}
            maxlength={8}
            setSecureText={true}
            />
            {errors.password && 
              <Text style={styles.formErrortext}>{errors.password}</Text>
            }
            </View>
      </View>
      <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.forgotBtn}
      >
          <Text style={styles.forgotTxt}>Forgot Password?</Text>
      </TouchableOpacity>
        

      <View style={{marginTop: wp(10)}}>
                <TouchableOpacity
                onPress={handleSubmit}
                style={styles.createActBtn}
            >
                  <Text style={styles.btnRegister}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccount")}
            style={styles.loginBtn}
          >
              <Text style={styles.btnLogintxt}>Create an Account</Text>
          </TouchableOpacity>
      </View>
</View>
      )}
  </Formik>

    </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  formErrortext: {
    fontFamily: FONTS.POPPINS_LIGHT,
    fontSize: wp(2.8),
    marginTop: wp(1),
    marginLeft: wp(6),
    color: COLORS.priceColorRed,
    fontWeight: '300',
  },
  rowBox: {
    marginBottom: wp(3)
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
    marginTop: wp(4)
  },
  formBox: {
    marginHorizontal: wp(6),
    marginTop: wp(6)
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
    marginTop: hp(10),
    alignSelf: 'center'
  }
})

export default LoginScreen;
