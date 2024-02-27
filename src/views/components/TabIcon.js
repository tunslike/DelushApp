import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Image, 
    Platform} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { COLORS, FONTS } from '../../constants';

const TabIcon = ({focused, icon, title, addStyle}) => {
  if(focused) {
    return (
        <View style={[styles.isFocusedTab,{...addStyle}]}>
            <Image source={icon} 
                style={{
                    height: wp(5.5),
                    width: wp(5.5),
                    resizeMode: 'contain',
                    tintColor: COLORS.primaryGreen
                }}
            />
            <Text
                style={[styles.focusText, {color: COLORS.primaryGreen}]}
            >{title}</Text>
        </View>
    )
  }else {
    return (
        <View style={styles.notFocusedTab}>
            <Image source={icon} 
                style={{
                    height: wp(5.5),
                    width: wp(5.5),
                    resizeMode: 'contain',
                    tintColor: COLORS.tabbedGray
                }}
            />
            <Text
            style={[styles.focusText, {color: COLORS.tabbedGray}]}
        >{title}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    focusText: {
        fontSize: wp(3),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        marginLeft:wp(1),
    },
    notFocusedTab: {
        alignItems: 'center',
        justifyContent: 'center',
        height: wp(10),
        width: wp(15),
        marginTop: Platform.OS === 'ios' ? wp(8) : null
    },
    isFocusedTab: {
        backgroundColor: COLORS.tabColorActive,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(3),
        marginTop: Platform.OS === 'ios' ? wp(5) : null
    }
});

export default TabIcon;