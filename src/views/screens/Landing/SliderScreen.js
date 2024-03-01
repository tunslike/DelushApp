import React, {useState, useRef} from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, 
  Dimensions} from 'react-native';
  import Carousel, {Pagination} from 'react-native-snap-carousel'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SliderScreen = ({navigation}) => {

    const [activateDotIndex, setActiveDotIndex] = useState(0);
  const _carouselRef = useRef();

  const data = [
    {
        id: '1',
        image: images.slider1,
        title: 'Delicious Food',
        description: 'Enjoy good and delicious meal with awesome experience'
    },
    {
        id: '2',
        image: images.slider2,
        title: 'Quick Food Delivery',
        description: 'Experience fast and quick food delivery at your door steps'
    },
    {
        id: '3',
        image: images.slider3,
        title: 'Affordable Prices',
        description: 'Enjoy massive discounts and eat at affordable prices'
    },
  ]

  const _renderItem = ({item, index}) => {
    return (
        <View style={styles.sliderBody}>
          <Image source={item.image} 
            style={{
              height: wp(63), width: wp(63), 
              resizeMode: 'contain', borderRadius: wp(5)
            }}
          />
          <Text style={styles.sliderTitle}>{item.title}</Text>
          <Text style={styles.sliderDesc}>{item.description}</Text>
        </View>
    )
}

  return (
    <SafeAreaView style={{backgroundColor: COLORS.sliderBackgroundGrey, flex: 1}}>
    <StatusBar barStyle="dark-content" />
    <View style={styles.logo}>
          <Image source={images.appLogo} 
          style={{
                height: wp(27), width: wp(27), borderRadius: wp(6), resizeMode: 'contain'
          }} />
    </View>
    <Carousel 
        ref={_carouselRef}
        data={data}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        onSnapToItem={index => setActiveDotIndex(index)}
    />
    <Pagination 
    carouselRef={_carouselRef} 
    activeDotIndex={activateDotIndex} 
    dotsLength={3}  
    dotStyle={{
      width: wp(4), height: wp(1), backgroundColor: COLORS.prinmaryOrange
    }}
    inactiveDotStyle={{
      width: wp(2.3), height: wp(2.3), backgroundColor: COLORS.primaryGreen
    }}
    />

    {(activateDotIndex == 2) &&
      <View style={styles.slideBtns}>
      <TouchableOpacity
        style={styles.btnCreate}
        onPress={() => navigation.navigate("CreateAccount")}
      >
      <Text style={styles.createTxt}>Create an Account</Text>
        <Image source={icons.arrow_thick} 
            style={{
                height: wp(3.4), width: wp(3.4), tintColor: COLORS.white, resizeMode: 'contain'
            }}
        />
      </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Login")}
        style={styles.loginBtn}>
          <Text style={styles.loginTxt}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    }

    {(activateDotIndex < 2) &&
      <View style={styles.slideBtns}>
      <TouchableOpacity
        onPress={() => {
            _carouselRef.current.snapToItem(activateDotIndex + 1)
            }}
            style={styles.nextBtn}
      >
            <Image source={icons.arrow_thick} 
                style={{
                    height:wp(6.7), width: wp(6.7), tintColor: COLORS.white, resizeMode: 'contain'
                }}
            />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSkip}
      >
            <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
        
      </View>
    }

 </SafeAreaView>
  )
}

export default SliderScreen

const styles = StyleSheet.create({

    btnCreate: {
        backgroundColor: COLORS.prinmaryOrange,
        borderRadius: wp(10),
        paddingHorizontal: wp(10),
        paddingVertical: wp(3.5),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: wp(2),
        alignSelf: 'center',
    },
    createTxt: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize:  wp(3.5),
        color: COLORS.white,
    },
    btnSkip: {
        alignSelf: 'center',
        marginTop: wp(6)
    },
    skipText: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.sliderDarkGray,
        fontSize: wp(4),
    },
    loginTxt: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize:  wp(3.5),
        color: COLORS.primaryGreen,
        marginRight: wp(1.5),
      },
      loginBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: wp(3),
        borderRadius: wp(3.5),
        paddingHorizontal: wp(7),
        paddingVertical: Platform.OS === 'ios' ? wp(3) :  wp(2.8),
      },
      slideBtns: {
        marginBottom: wp(23)
      },
      nextBtn: {
        backgroundColor: COLORS.prinmaryOrange,
        borderRadius: wp(15),
        paddingHorizontal: wp(5.3),
        paddingVertical: wp(5),
        alignSelf: 'center'
      },
      sliderTitle: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(4.8),
        width: wp(50),
        textAlign: 'center',
        color: COLORS.primaryGreen,
        marginTop: wp(3)
      },
      sliderDesc: {
          marginTop: wp(3),
          fontFamily: FONTS.POPPINS_MEDIUM,
          fontSize: wp(3.5),
          width: wp(70),
          textAlign: 'center',
          lineHeight: wp(5),
          color: COLORS.sliderDescText,
      },
      sliderBody: {
        alignItems: 'center',
        marginTop: wp(5)
      },
      logo: {
        alignItems: 'center',
        marginTop: wp(10)
    },
})