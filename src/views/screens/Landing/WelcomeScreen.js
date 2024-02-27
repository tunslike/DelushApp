import React from 'react'
import { 
    Image,
    ImageBackground,
    StatusBar,
    TouchableOpacity,
    Platform,
    StyleSheet, 
    Text, 
    View } from 'react-native';
    import { COLORS, images, icons, FONTS } from '../../../constants';
    import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'


const WelcomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
            resizeMethod="auto"
            style={styles.welcomebg}
            source={images.welcomeBG}
          >
          <View style={styles.logo}>
                <Image source={images.appLogo} 
                style={{
                        height: wp(35), width: wp(35), borderRadius: wp(6), resizeMode: 'contain'
                }}
                />
          </View>
          <View style={styles.descArea}>
          <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-start', alignItems: 'center', columnGap: wp(1)}}>
                <Text style={styles.busName}>Delush</Text><Text style={styles.bus_name}>Restaurant</Text>
          </View>
                
                <Text style={styles.descText}>Unbeatable Experience in Foods, Snacks and Juices</Text>
          </View>

          <TouchableOpacity
          onPress={() => navigation.navigate("Slider")}
                style={styles.getStartedBtn}
          >
                <Text style={styles.btnText}>Get Started</Text>
                <Image source={icons.arrow_thick} 
                    style={{
                        height: wp(5), width:wp(5), tintColor: COLORS.white, resizeMode: 'contain'
                    }}
                />
          </TouchableOpacity>
          </ImageBackground>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({

    btnText: {
        color: COLORS.white,
        fontFamily: FONTS.POPPINS_BOLD,
        fontSize: wp(4)
    },
    getStartedBtn: {
        backgroundColor: COLORS.prinmaryOrange,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: wp(3),
        borderRadius: wp(10),
        paddingHorizontal: wp(10),
        paddingVertical: wp(4),
        marginTop: wp(8)
    },
    descText: {
        color: COLORS.busNameGreen,
        fontFamily: FONTS.POPPINS_REGULAR,
         marginTop: wp(3),
         fontSize: wp(3.5),
         width: wp(60),
         textAlign: 'center',
         alignSelf: 'center'
    },
    bus_name: {
        color: COLORS.sliderDarkGray,
        fontFamily: FONTS.POPPINS_BOLD,
        fontSize:wp(5.5)
    },
    busName: {
        fontFamily: FONTS.POPPINS_BOLD,
        color: COLORS.white,
        fontSize: wp(5.5)
    },
    descArea: {
        marginTop: hp(4),
    },
    logo: {
        alignItems: 'center',
        marginTop: hp(30)
    },
    welcomebg: {
        flex: 1,
        resizeMode: 'contain',
        alignItems: 'center',
    }
})