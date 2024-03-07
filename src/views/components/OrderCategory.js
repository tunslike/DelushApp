import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, TouchableOpacity} from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const OrderCategory = ({active, onPress, label, icon}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
        <View
          style={[styles.container, {backgroundColor: (active) ? COLORS.prinmaryOrange : COLORS.white}]}
        >
          <Image source={icon} 
            style={{
              height: wp(10), width: wp(10), tintColor: (active) ? COLORS.white : COLORS.loginScreenDesc
            }}
          />
        </View>
        <Text style={[styles.textLabel, {color: (active) ? COLORS.prinmaryOrange : COLORS.loginScreenDesc }]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  
  textLabel: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    textAlign: 'center',
    marginTop: wp(3),
    fontSize: wp(3.3)
  },
    container: {
      borderRadius: wp(5),
      paddingHorizontal: wp(4.8),
      paddingVertical: wp(6)

    }
})

export default OrderCategory;