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
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { AuthContext } from '../../../context/AuthContext';
  import { ProfileLink } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = ({navigation}) => {

  const {ExitAuthenticatedUser} = useContext(AuthContext);

    // function to load facilities
    const LogoutAuthenticatedUser = () => {
      Alert.alert("Delush", 'Do you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {
          ExitAuthenticatedUser();
        }},
      ]);
    }
  // end of function

  return (
    <SafeAreaView
    style={{
      flexGrow: 1,
      backgroundColor: COLORS.sliderBackgroundGrey
    }}
    >
      <ScrollView>

      <View style={styles.header}>
              <Image source={icons.user_color_profile} 
              style={{
                height: wp(25), width: wp(25), resizeMode: 'contain'
              }}
            />

            <View style={styles.profile}>
            <Text style={styles.name}>Babatunde Francis</Text>
              <Text style={styles.phone}>0902340922</Text>
              <Text style={styles.email}>tunslike@yahoo.com</Text>
            </View>
      </View>

      <Text style={styles.headerTxt}>Account</Text>
      <View style={styles.body}>
              
              <ProfileLink onPress={() => navigation.navigate("ProfileUpdate")} icon={icons.profile_person} label="Profile Update" />
              <ProfileLink onPress={() => navigation.navigate("Notification")} icon={icons.profile_notification} label="Notification" />
              <ProfileLink onPress={() => navigation.navigate("Privacy")} icon={icons.profile_privacy} label="Privacy" />
              <ProfileLink icon={icons.profile_about} label="About Us" />
      </View>

      <View style={{marginBottom: wp(25)}}>
<TouchableOpacity
onPress={() => LogoutAuthenticatedUser()}
style={styles.createActBtn}
>
  <Text style={styles.btnRegister}>Log out</Text>
</TouchableOpacity>
</View>
          
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  headerTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.primaryGreen,
    fontSize: wp(4),
    marginBottom: wp(1.5),
    marginHorizontal: wp(9),
    marginTop: wp(10)
  },
  email: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.loginScreenDesc,
    fontSize: wp(3),
  },
  phone: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.loginScreenDesc,
    fontSize: wp(3.5),
    
  },
  name: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.prinmaryOrange,
    fontSize: wp(4),
    marginBottom: wp(1.5)
  },
  profile: {
    marginTop: wp(4),
    alignItems: 'center'
  },
  header: {
    backgroundColor: COLORS.white,
    borderRadius: wp(10),
    paddingTop: wp(15),
    paddingBottom: wp(10),
    marginHorizontal: wp(4),
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    backgroundColor: COLORS.white,
    borderRadius: wp(10),
    paddingTop: wp(10),
    paddingBottom: wp(5),
    marginHorizontal: wp(4),
  }
});

export default ProfileScreen;