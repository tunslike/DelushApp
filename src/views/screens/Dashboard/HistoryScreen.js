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
  import { SubPageHeader } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import { SafeAreaView } from 'react-native-safe-area-context';

const HistoryScreen = ({navigation}) => {
  return (
    <SafeAreaView
    style={{
      flexGrow: 1,
      backgroundColor: COLORS.sliderBackgroundGrey
    }}
    >
    <ScrollView>

    <View style={styles.header}>
      <SubPageHeader onPress={() => navigation.goBack()} label="Order History" />
    </View>


    <Text style={styles.orderLabel}>Your order history will show here</Text>
    <View style={styles.body}>
        <Image source={images.notFound} 
          style={{
            height: wp(50), width: wp(50), resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.orderAler}>No order history!</Text>
    </View>

    </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  orderAler: {
    color: COLORS.prinmaryOrange,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    alignSelf: 'center'
  },
  orderLabel: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.loginScreenDesc,
    marginHorizontal: wp(8),
    marginTop: wp(8),
    marginBottom: wp(2)
  },
  textHeader: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4.2),
    color: COLORS.primaryGreen
  },
  notification: {
      borderColor: COLORS.accountFormborder,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: wp(3.8),
      height: wp(10),
      width: wp(10.5),
      alignItems: 'center',
      justifyContent: 'center'
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
export default HistoryScreen