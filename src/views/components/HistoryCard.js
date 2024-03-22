import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         TouchableOpacity} from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'

const HistoryCard = ({orderNo, onPress, amount, date, completed}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={images.blank_food} 
          style={{
            height: wp(15), width: wp(15), resizeMode: 'contain', borderRadius: wp(4)
          }}
      />
      <View style={{flex: 1}}>
          <View style={styles.orderBox}>
            <Image source={icons.orderNo} 
              style={{
                height: wp(3), width: wp(3), tintColor: COLORS.prinmaryOrange, resizeMode: 'contain'
              }}
            />
            <Text style={styles.txtrderName}>Order: {orderNo}</Text>
          </View>
          <Text style={styles.orderAmt}>₦ {amount.toLocaleString('en-US', {maximumFractionDigits:2})}</Text>
      </View>
      <View>
            
            <Image source={(completed) ? icons.orderSuccess : icons.orderTime} 
              style={{
                height: wp(5.5), width: wp(5.5), marginRight: wp(1), alignSelf: 'flex-end', marginBottom: wp(1), tintColor: (completed) ? COLORS.primaryGreen : COLORS.prinmaryOrange, resizeMode: 'contain'
              }}
            />
            <Text style={styles.orderDate}>{date}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  orderDate: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.tabbedGray,
    marginRight: wp(1)
  },
  orderAmt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.priceColorRed,
    fontSize: wp(3.5),
  },
  orderBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(1),
    marginBottom: wp(0.8),
  },
  txtrderName: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.prinmaryOrange,
    fontSize: wp(3.5),
  },
   container : {
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    paddingHorizontal: wp(2),
    paddingVertical: wp(2),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(3),
    marginBottom: wp(4)
   }
})

export default HistoryCard;