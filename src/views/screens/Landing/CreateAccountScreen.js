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
  Alert, ActivityIndicator,
  Dimensions} from 'react-native';
  import { Formik } from 'formik';
  import axios from 'axios';
  import * as Yup from 'yup'
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { useDispatch } from 'react-redux';
  import { useSelector } from 'react-redux';
  import TextLink from 'react-native-text-link';
  import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
  import { AccountTextBox, Loader } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  const { width, height } = Dimensions.get("window");

  const CreateAccountSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(3, 'Minimum characters is 6!')
        .max(25, 'Maximum characters is 25!').required('Enter first name'),
    lastname: Yup.string()
        .min(3, 'Minimum characters is 6!')
        .max(25, 'Maximum characters is 25!').required('Enter last name'),
    password: Yup.string()
        .min(6, 'Minimum characters is 6!')
        .max(25, 'Maximum characters is 8!').required('Enter password'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Enter your email address'),
    phone: Yup.string()
      .min(11, 'Phone number must be 11 digits')
      .max(11, 'Phone number must be 11 digits')
      .matches(/^[0-9]+$/, 'Enter a valid phone number')
      .required('Enter your phone number')
})


const CreateAccountScreen = ({navigation}) => {

  const [isLoading, setIsLoading] = useState(false)

  // function to create account
  const createNewCustomer = (values) => {
    
    if(!values) {
      Alert.alert("Delush", "All fields are required!")
      return;
    }

     //data
     const data = {
      firstname : values.firstname,
      lastname : values.lastname,
      phoneNumber: values.phone,
      emailAddress: values.email,
      password: values.password
  }

    console.log(data);
    setIsLoading(true)


      axios.post(APIBaseUrl.developmentUrl + 'customer/newCustomer',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8083'
        }
      })
      .then(response => {

        setIsLoading(false)
        
        if(response.data.responseCode == 200) {

          values.firstname = ''
          values.firstname = ''
          values.email = ''
          values.phone = ''
          values.password = ''

            Alert.alert('Delush', 'Account creation was successful! Please check your email!')
  
            // SHOW SUCCESS
            //navigation.navigate("LoanCompleted", {loanAmount:loanAmt, loanTenor:loanSetTenor});
            return
        
        }else{

          Alert.alert('Delush', 'Oops! Unable to process your request, please try again')
          return;
        }

      })
      .catch(error => {
        console.log(error);
      });
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
                height: wp(23), width: wp(23), borderRadius: wp(4), resizeMode: 'contain'
          }} />
    </View>

    <View style={styles.title}>
        <Text style={styles.mainTitle}>Create an Account</Text>
        <Text style={styles.titleDesc}>Please enter the details below to
        create an account</Text>
    </View>

  
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
      }}
      validationSchema={CreateAccountSchema}
      onSubmit={values => createNewCustomer(values)}
    >
    {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
            <View style={styles.formBox}>
                  <View style={styles.rowBox}>
                        <AccountTextBox 
                        icon={icons.user}
                        placeholder="First Name"
                        value={values.firstname}
                        onChange={handleChange('firstname')}
                        maxlength={20}
                        />
                        {errors.firstname && 
                          <Text style={styles.formErrortext}>{errors.firstname}</Text>
                        }
                  </View>
                  <View style={styles.rowBox}>
                        <AccountTextBox 
                        icon={icons.profile}
                        placeholder="Last Name"
                        value={values.lastname}
                        onChange={handleChange('lastname')}
                        maxlength={20}
                        />
                        {errors.lastname && 
                          <Text style={styles.formErrortext}>{errors.lastname}</Text>
                        }
                  </View>
                  <View style={styles.rowBox}>
                        <AccountTextBox 
                        icon={icons.email}
                        placeholder="Email Address"
                        value={values.email}
                        onChange={handleChange('email')}
                        />
                        {errors.email && 
                          <Text style={styles.formErrortext}>{errors.email}</Text>
                        }
                  </View>
                  <View style={styles.rowBox}>
                        <AccountTextBox 
                        icon={icons.phone}
                        placeholder="Phone Number"
                        phone={1}
                        value={values.phone}
                        onChange={handleChange('phone')}
                        maxlength={11}
                        />
                        {errors.phone && 
                          <Text style={styles.formErrortext}>{errors.phone}</Text>
                        }
                  </View>
                  <View style={styles.rowBox}>
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
            onPress={handleSubmit}
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
  )}
    </Formik>

    
    </SafeAreaView>
 </KeyboardAwareScrollView>
  )
}

export default CreateAccountScreen

const styles = StyleSheet.create({
  rowBox: {
    marginBottom: wp(2.2)
  },
  formErrortext: {
    fontFamily: FONTS.POPPINS_LIGHT,
    fontSize: wp(2.8),
    marginTop: wp(1),
    marginLeft: wp(6),
    color: COLORS.priceColorRed,
    fontWeight: '300',
  },
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
        marginTop: wp(7)
    },
    formBox: {
        marginHorizontal: wp(6)
    },
    titleDesc: {
        marginTop: wp(1),
        marginBottom: wp(3),
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