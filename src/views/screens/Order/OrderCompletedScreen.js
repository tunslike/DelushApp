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

const OrderCompletedScreen = ({navigation, route}) => {

  const {orderNumber} = route.params;

  return (
    <SafeAreaView
    style={{
      flexGrow: 1,
      justifyContent: 'center',
      backgroundColor: COLORS.sliderBackgroundGrey
    }}
    >
        <ScrollView>
        <View style={styles.header}>
            <Image source={icons.success_icons} 
                style={{
                    resizeMode: 'contain'
                }}
            />
            <Text style={styles.textSuccess}>Your order was submitted succesfully! </Text>
        </View>

        <View style={styles.statusBox}>
            <Text style={styles.statusMgs}>Your order has been received and is currently being processed. Please see your order number below</Text>
            <Text style={styles.orderTxt}>{orderNumber}</Text>
        </View>

        <View style={{marginTop: wp(10)}}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.createActBtn}
        >
          <Text style={styles.btnRegister}>Back to Home</Text>
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
        backgroundColor: COLORS.primaryGreen,
        borderRadius: wp(10),
        paddingHorizontal: wp(25),
        paddingVertical: wp(3.5),
        alignSelf: 'center',
        marginTop: wp(5)
        },
    orderTxt: {
        alignSelf: 'center',
        marginTop: wp(5),
        fontFamily: FONTS.POPPINS_BOLD,
        color: COLORS.prinmaryOrange,
        fontSize: wp(7)
    },
    statusMgs: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3.3),
        color: COLORS.tabbedGray,
        textAlign: 'center',
        lineHeight: wp(5),
    },
    statusBox: {
        marginHorizontal: wp(13),
        marginTop: wp(15)
    },

    textSuccess: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.prinmaryOrange,
        fontSize: wp(4),
        alignSelf: 'center',
        marginTop: wp(10),
        width: '80%',
        textAlign: 'center'
    },
    header: {
        backgroundColor: COLORS.white,
        borderRadius: wp(10),
        paddingTop: wp(15),
        paddingBottom: wp(10),
        marginHorizontal: wp(4),
        marginTop: wp(5),
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
})

export default OrderCompletedScreen;