import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
        TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const ProfileLink = ({icon, label}) => {
  return (
      <TouchableOpacity
        style={styles.container}
      >
        <Image source={icon} 
          style={{
            height: wp(5), width: wp(5), tintColor: COLORS.orderDetailsDesc, resizeMode: 'contain'
          }}
        />
        <Text style={styles.label}>{label}</Text>
        <Image source={icons.profile_arrow} 
          style={{
            height: wp(6.5), width: wp(6.5), tintColor: COLORS.prinmaryOrange, resizeMode: 'contain'
          }}
        />
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  label: {
      fontFamily: FONTS.POPPINS_SEMIBOLD,
      fontSize: wp(3.3),
      color: COLORS.loginScreenDesc,
      flex: 1
  },
  container: {
    columnGap: wp(4),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: wp(4),
    marginBottom: wp(7)
  }
})

export default ProfileLink;