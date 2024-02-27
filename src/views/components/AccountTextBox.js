import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         Keyboard,
        TextInput } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const AccountTextBox = ({ placeholder,maxlength, phone, onFocus, onChange, value, icon, setSecureText}) => {
  return (
    <View style={styles.container}>

        <Image source={icon} 
            style={{
                width: wp(4), height: wp(4), 
                resizeMode: 'contain', tintColor: COLORS.loginScreenDesc,
                marginRight: wp(3)
            }}
        />

        <TextInput
            value={value}
            onChangeText={onChange}
            style={styles.inputStyle}
            placeholder={placeholder}
            placeholderTextColor={COLORS.darkGray}
            keyboardType={(phone == 1) ? "phone-pad" : "default"}
            autoCapitalize='none'
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={setSecureText}
            returnKeyType='next'
            maxLength={maxlength}
            onFocus={onFocus}
        />
        
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.5),
    width: '100%',
    color: COLORS.formTextGrey,

  },
   container : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: wp(5),
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderStyle: 'solid',
    borderColor: COLORS.accountFormborder,
    paddingHorizontal: wp(4),
    paddingVertical: Platform.OS === 'ios' ? wp(4) : wp(0.2),
    marginHorizontal: wp(1),
    marginBottom: wp(2.2)
   }
})

export default AccountTextBox;