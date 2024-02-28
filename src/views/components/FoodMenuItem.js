import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const FoodMenuItem = ({onPress, image , foodName, desc, amount}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <Image source={image} 
        style={{
          height: wp(20), width: wp(20), resizeMode: 'contain', marginRight: wp(3), borderRadius: wp(4)
        }}
      />
        <View style={styles.foodDetails}>
          <Text style={styles.txtMain}>{foodName}</Text>
          <Text style={styles.txtDesc}>{desc}</Text>
          <Text style={styles.textAmount}>₦ {amount.toLocaleString('en-US', {maximumFractionDigits:2})}</Text>
        </View>
        <View style={styles.addBtn}>
            <Image source={icons.add} 
              style={{
                height: wp(3.2), width: wp(3.2), tintColor: COLORS.white, 
              }}
            />
        </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  txtDesc: {
    fontFamily: FONTS.POPPINS_REGULAR,
    paddingRight: wp(4),
    color: COLORS.sliderDescText,
    fontSize: wp(2.7)
  },
  txtMain: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.primaryGreen,
    fontSize: wp(3.5)
  },
  textAmount: {
    color: COLORS.priceColorRed,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4),
    marginTop: wp(1),
    marginBottom:wp(1)
  },
  addBtn: {
    backgroundColor: COLORS.prinmaryOrange,
    borderRadius: wp(2.7),
    height: wp(7),
    width: wp(7),
    alignItems: 'center',
    justifyContent: 'center'
  },
  foodDetails: {
    flex: 1,
  },
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: wp(3.5),
      backgroundColor: COLORS.white,
      padding: wp(2.5),
      borderRadius: wp(5)
    }
})

export default FoodMenuItem;