import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const SubPageHeader = ({ onPress, label }) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity
    onPress={onPress}
    style={styles.backBtn}
     >
    <Image source={icons.back_arrow} 
        style={{
            height: wp(5), width: wp(5), tintColor: COLORS.tabbedGray, resizeMode: 'contain'
        }}
    />
</TouchableOpacity>
<Text style={styles.label}>{label}</Text>
<TouchableOpacity
 style={styles.notification}
>
  <Image source={icons.notification} 
    style={{
      height: wp(5), width: wp(5), resizeMode: 'contain', tintColor: COLORS.white
    }}
  />
</TouchableOpacity>
</View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    flex: 1,
    marginLeft: wp(3),
    fontSize: wp(4),
    color: COLORS.primaryGreen
  },
  notification: {
    borderRadius: wp(3.5),
    height: wp(9),
    width: wp(9.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.prinmaryOrange
},
  backBtn: {
    backgroundColor: COLORS.white,
    borderRadius: wp(3.5),
    width: wp(9.4),
    height: wp(9),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.accountFormborder,
    borderWidth: 1,
    borderStyle: 'solid'
},
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: wp(4)
    }
})

export default SubPageHeader;