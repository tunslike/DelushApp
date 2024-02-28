import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
      TouchableOpacity} from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const InnerHeaderTab = ({onPress}) => {
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
  notification: {
    borderColor: COLORS.accountFormborder,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: wp(3.8),
    height: wp(10),
    width: wp(10.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.prinmaryOrange
},
  backBtn: {
    backgroundColor: COLORS.white,
    borderRadius: wp(3.8),
    width: wp(10.4),
    height: wp(10),
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

export default InnerHeaderTab;