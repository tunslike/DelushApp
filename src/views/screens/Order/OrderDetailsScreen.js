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
  import { InnerHeaderTab } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get("window");

const OrderDetailsScreen = ({navigation, route}) => {

    //route values
    const {foodImage, foodName, foodDesc, foodAmount} = route.params;

  return (
    <SafeAreaView
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.sliderBackgroundGrey
      }}
    >
        <ScrollView>
            <ImageBackground
                source={foodImage}
                style={styles.headerBg}
            >

                <InnerHeaderTab 
                    onPress={() => navigation.goBack()}
                />
            </ImageBackground>

            <View
                style={styles.foodDetails}   
            >
                <View style={styles.titleArea}>
                    <Text style={styles.foodTitle}>{foodName}</Text>
                    <TouchableOpacity>
                        <Image source={icons.like} 
                            style={{
                                height: wp(5), width: wp(5), resizeMode: 'contain', tintColor: COLORS.prinmaryOrange
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.descTitle}>What's Included</Text>
                <Text style={styles.foodDesc}>{foodDesc}</Text>

                <Text style={styles.foodPrice}>₦ {foodAmount.toLocaleString('en-US', {maximumFractionDigits:2})}</Text>
                <Text style={[styles.foodDesc, {marginTop: wp(-0.2)}]}>Sub-Total</Text>


                <View style={styles.quantityBox}>
                        
                    <TouchableOpacity
                            style={styles.removeQuant}
                    >
                            <Image source={icons.minus} 
                                style={{
                                    height: wp(4), width: wp(4), tintColor: COLORS.loginScreenDesc,
                                    resizeMode: 'contain'
                                }}
                            />
                    </TouchableOpacity>
                    <Text style={styles.counter}>1</Text>
                    <TouchableOpacity
                       style={styles.addQuant}
                    >
                            <Image source={icons.add} 
                            style={{
                                height: wp(4), width: wp(4), tintColor: COLORS.white,
                                resizeMode: 'contain'
                            }}
                            />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity
                    style={styles.createActBtn}
                 >
                  <Text style={styles.btnRegister}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.viewCartBtn}
         >
          <Text style={styles.viewCartTxt}>View Cart</Text>
    </TouchableOpacity>
    
        

            </View>

        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    viewCartTxt: {
        color: COLORS.prinmaryOrange,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize:  wp(3.7),
    },
    btnRegister: {
        color: COLORS.white,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize:  wp(3.7),
    },
    createActBtn: {
        backgroundColor: COLORS.primaryGreen,
        borderRadius: wp(10),
        paddingHorizontal: wp(25),
        paddingVertical: wp(3.7),
        alignSelf: 'center',
        marginTop: wp(10)
    },
    viewCartBtn: {
        borderColor: COLORS.prinmaryOrange,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: wp(10),
        paddingHorizontal: wp(23),
        paddingVertical: wp(3.2),
        alignSelf: 'center',
        marginTop: wp(3)
    },
    
    counter: {
        fontFamily: FONTS.POPPINS_BOLD,
        fontSize: wp(8),
        color: COLORS.loginScreenDesc
    },
    addQuant: {
        backgroundColor: COLORS.prinmaryOrange,
        height: wp(9),
        borderRadius: wp(9),
        width: wp(9),
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeQuant: {
        borderColor: COLORS.orderDetailsDesc,
        borderWidth: 1,
        borderStyle: 'solid',
        height: wp(9),
        borderRadius: wp(9),
        width: wp(9),
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityBox: {
        marginHorizontal: wp(6),
        marginTop: wp(7),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: wp(35)
    },
    foodPrice: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.priceColorRed,
        fontSize: wp(7),
        marginHorizontal: wp(7.5),
        marginTop: wp(6)
    },
    foodDesc: {
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.orderDetailsDesc,
        fontSize: wp(3),
        marginHorizontal: wp(7.5),
        marginTop: wp(2)
    },
    descTitle: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        color: COLORS.prinmaryOrange,
        fontSize: wp(3),
        marginHorizontal: wp(7.5),
        marginTop: wp(6)
    },
    foodTitle: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(5),
        color: COLORS.primaryGreen
    },
    titleArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp(7)
    },
    foodDetails: {
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        paddingBottom: wp(20),
        marginTop: wp(-10),
        paddingTop: wp(10),
        backgroundColor: COLORS.white  
    },
    headerBg: {
        paddingTop: wp(4),
        height:350,
        width
      },
})
export default OrderDetailsScreen
