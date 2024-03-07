import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         TouchableOpacity,
        TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'

const CartOrderItem = ({ foodName,amount, bulkStatus, itemQuantity}) => {
  return (
    <View style={styles.container}>
        <Image source={images.blank_food} 
          style={{
            height: wp(17), width: wp(17), resizeMode: 'contain', borderRadius: wp(3)
          }}
        />
        <View style={{flex: 1}}>
            <Text style={styles.foodtxt}>{foodName}</Text>
            <Text style={styles.textAmount}>₦ {amount.toLocaleString('en-US', {maximumFractionDigits:2})}</Text>
            {bulkStatus && 
              <Text style={styles.bulkText}>Bulk Order</Text>
            }
        </View>
        <View>
       <View style={styles.quanBox}>
          <TouchableOpacity
          style={styles.removeQuant}
          >
                <Image source={icons.minus} 
                  style={{
                    height: wp(3), width: wp(3), resizeMode: 'contain', tintColor: COLORS.prinmaryOrange
                  }}
                />
          </TouchableOpacity>
          <Text style={styles.counter}>{itemQuantity}</Text>
          <TouchableOpacity
            style={styles.addQuant}
          >
                <Image source={icons.add} 
                style={{
                  height: wp(3), width: wp(3), resizeMode: 'contain', tintColor: COLORS.white
                }}
                />
          </TouchableOpacity>
       </View>
       <TouchableOpacity style={{alignSelf: 'center', marginTop: wp(2)}}><Text style={styles.removeTxt}>Remove</Text></TouchableOpacity>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bulkText: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.loginScreenDesc,
    fontSize: wp(2.8)
  },
  removeTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.prinmaryOrange,
    fontSize: wp(2.8)
  },
  counter: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(4),
    color: COLORS.loginScreenDesc
},
addQuant: {
    backgroundColor: COLORS.prinmaryOrange,
    height: wp(5),
    borderRadius: wp(5),
    width: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
},
removeQuant: {
    borderColor: COLORS.orderDetailsDesc,
    borderWidth: 1,
    borderStyle: 'solid',
    height: wp(5),
    borderRadius: wp(5),
    width: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
},
  quanBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: wp(3.5)
  },
  textAmount: {
    color: COLORS.priceColorRed,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4),
    marginTop: wp(1),
    marginBottom:wp(1)
  },
  foodtxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.primaryGreen,
    fontSize: wp(3.5)
  },
  container: {
    borderRadius: wp(3),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: wp(4),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: wp(5),
    paddingHorizontal: wp(2),
    paddingVertical: wp(1.5),
    marginBottom: wp(3)
  }
})

export default CartOrderItem;