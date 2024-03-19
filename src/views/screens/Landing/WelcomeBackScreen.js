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
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { AccountTextBox, Loader } from '../../components';
  import { AuthContext } from '../../../context/AuthContext';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const WelcomeBackScreen = ({navigation}) => {

  //context
  const {ValidateCustomerLogin, isLoading} = useContext(AuthContext);
  const [userID, setUserID] = useState(null);

  // FUNCTION TO CHECK LOGGED USER
        const ValidateUserLoggedIn = async () => {
          try {
              
              let userData = await AsyncStorage.getItem('userLogged');
    
              if(userData) {
                console.log('user has logged in before')
                setUserID(userData);
              }else{
                console.log('New User found, coming from router')
              }
              
              
          } catch (e) {
            console.log(`isLogged in error ${e}`);
          }
  }
      // END OF FUNCTION


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
      <Text style={styles.mainTitle}>Welcome Back!</Text>
      <Text style={styles.titleDesc}>You have an active user session, tap below to continue to dashboard</Text>
      </View>
<View>
     


      <View style={{marginTop: wp(10)}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Dashboard", {customerEntryID: userID})}
                  style={styles.createActBtn}
            >
                  <Text style={styles.btnRegister}>Continue to Dashboard</Text>
            </TouchableOpacity>


      </View>
</View>

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
      paddingHorizontal: wp(15),
      paddingVertical: wp(3.5),
      alignSelf: 'center',
      marginTop: wp(2),
      marginHorizontal: wp(3)
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
    marginTop: wp(5),
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.2),
    textAlign: 'center',
    lineHeight: wp(4.5),
    color: COLORS.sliderDescText,
},
  mainTitle: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(5),
    color: COLORS.primaryGreen,
    alignSelf:'center'
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

export default WelcomeBackScreen;
