import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         Keyboard,
        TextInput } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const ProfileTextBox = ({ placeholder,maxlength, phone, onFocus, readOnly, onChange, value, icon, setSecureText}) => {
  return (
    <View style={styles.container}>
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
            readOnly={readOnly}
        />
        
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.2),
    width: '100%',
    color: COLORS.loginScreenDesc,
    height: wp(3)

  },
   container : {
    borderRadius: wp(3.5),
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderStyle: 'solid',
    width: '100%',
    height: wp(10),
    borderColor: COLORS.accountFormborder,
    paddingHorizontal: wp(6),
    paddingVertical: Platform.OS === 'ios' ? wp(3.2) : wp(0.2),
   }
})

export default ProfileTextBox;