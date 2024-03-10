import React, { useContext, useState, useEffect } from 'react'
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
  ScrollView,
  Dimensions} from 'react-native';
  import axios from 'axios';
  import { COLORS, images, FONTS, APIBaseUrl, icons } from '../../../constants';
  import { AuthContext } from '../../../context/AuthContext';
  import { useSelector } from 'react-redux';
  import { SubPageHeader, ProfileTextBox, Loader } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import * as Yup from 'yup'

const UpdateProfileScheme = Yup.object().shape({
  emailAddress: Yup.string()
    .email('Enter a valid email')
    .required('Enter your email address'),
  phoneNumber: Yup.string()
    .min(11, 'Phone number must be 11 digits')
    .max(11, 'Phone number must be 11 digits')
    .matches(/^[0-9]+$/, 'Enter a valid phone number')
    .required('Enter your phone number')
})

const ProfileUpdateScreen = ({navigation}) => {

    const customerData = useSelector((state) => state.customer.customerData);

    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState('')

    // function to create account
  const loadFetchCustomerProfile = () => {

     //data
     const data = {
      customer_id : customerData.customer_ENTRY_ID,
     }

    setIsLoading(true)

      axios.post(APIBaseUrl.developmentUrl + 'customer/fetchCustomerProfile',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8083'
        }
      })
      .then(response => {

          setIsLoading(false)
          setProfile(response.data);

      })
      .catch(error => {
        console.log(error);
      });
  }
  // end of function

  //function to update profile
const validateUpdateProfile = (values) => {

  if(values.phoneNumber != profile.phone_NUMBER) {
    Alert.alert("Delush", "Your new phone number will be your username!")
  }

  Alert.alert('Delush','Do you want to update your profile?', [
    {
      text: 'No',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Yes', onPress: () => updateCustomerProfile(values)},
  ]);

}//end of function


  const updateCustomerProfile = (values) => {

     //data
     const data = {
        customer_id : customerData.customer_ENTRY_ID,
        phone: values.phoneNumber,
        email: values.emailAddress
     }

     console.log(data)

    setIsLoading(true)

      axios.post(APIBaseUrl.developmentUrl + 'customer/updateCustomerProfile',data,{
        headers: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8083'
        }
      })
      .then(response => {

          setIsLoading(false)
          
          if(response.data.responseCode == 200) {

            Alert.alert("Delush", "Your profile was updated successfully!")
            return;

          }else{

            Alert.alert('Delush', 'Oops! Unable to process your request, please try again')
            return;
            
          }

      })
      .catch(error => {
        console.log(error);
      });

  }

  //USE EFFECT
  useEffect(() => {

    loadFetchCustomerProfile();
    
  }, []);


  return (
        <SafeAreaView
            style={{
            flexGrow: 1,
            backgroundColor: COLORS.sliderBackgroundGrey
            }}
        >

            {isLoading &&
              <Loader />
            }
            <ScrollView>
            
            <View style={styles.header}>
                <SubPageHeader onPress={() => navigation.goBack()} label="Profile Update" />
            </View>

            <Formik
                initialValues={{
                  phoneNumber: '',
                  emailAddress: ''
                }}
                validationSchema={UpdateProfileScheme}
                onSubmit={values => validateUpdateProfile(values)}
            >

            {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (

              <View>
            <Text style={styles.orderLabel}>Update your profile below</Text>
            <View style={styles.body}>

            <View style={styles.row}>
                    <Text style={styles.label}>First Name</Text>
                    <ProfileTextBox 
                    value={profile.first_NAME}
                    readOnly={true}
                    />
            </View>
            <View style={styles.row}>
            <Text style={styles.label}>Last Name</Text>
            <ProfileTextBox 
            value={profile.last_NAME}
            readOnly={true}
            />
            </View>
            <View style={styles.row}>
            <View
            style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}
          ><Text style={styles.label}>Mobile Phone</Text>
          <Text style={styles.updTxt}>Update here</Text></View>
            <ProfileTextBox 
              phone={1}
              value={values.phoneNumber}
              onChange={handleChange('phoneNumber')}
              maxlength={11}
            />
            {errors.phoneNumber && 
              <Text style={styles.formErrortext}>{errors.phoneNumber}</Text>
            }
            </View>
            <View style={styles.row}>
            <View
              style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}
            ><Text style={styles.label}>Email Address</Text>
            <Text style={styles.updTxt}>Update here</Text></View>
            <ProfileTextBox 
              value={values.emailAddress}
              onChange={handleChange('emailAddress')}
            />
            {errors.emailAddress && 
              <Text style={styles.formErrortext}>{errors.emailAddress}</Text>
            }
            </View>
                        </View>

            <View style={{marginBottom: wp(25)}}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.createActBtn}
            >
              <Text style={styles.btnRegister}>Update Profile</Text>
            </TouchableOpacity>
            </View>

            </View>

            )}

            </Formik>

            </ScrollView>
        </SafeAreaView>
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
  updTxt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.primaryGreen, 
    fontSize: wp(2.7),
    marginRight: wp(3)
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
    marginTop: wp(6)
    },
    label: {
        fontSize: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.5),
        color: COLORS.formTextGrey,
        marginBottom: wp(1.5),
        marginLeft: wp(2)
    },
    row: {
        marginHorizontal: wp(5),
        marginBottom: wp(4)
    },
    orderLabel: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3),
        color: COLORS.loginScreenDesc,
        marginLeft: wp(10),
        marginTop: wp(10),
        marginBottom: wp(2.5)
      },
    body: {
        backgroundColor: COLORS.white,
        borderRadius: wp(8),
        paddingTop: wp(10),
        paddingBottom: wp(10),
        marginHorizontal: wp(4),
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: wp(4),
        paddingBottom: wp(4),
        backgroundColor: COLORS.white,
        borderRadius: wp(6),
        marginHorizontal: wp(3)
      }
})
export default ProfileUpdateScreen