import React, { useContext, useState, useEffect } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, 
  Alert,
  ScrollView,
  Dimensions} from 'react-native';
  import axios from 'axios';
  import moment from 'moment';
  import { COLORS, images, FONTS, APIBaseUrl, icons } from '../../../constants';
  import { AuthContext } from '../../../context/AuthContext';
  import { useSelector } from 'react-redux';
  import { SubPageHeader, HistoryCard, Loader } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import { SafeAreaView } from 'react-native-safe-area-context';
 import { useFocusEffect } from '@react-navigation/native';

const NotificationScreen = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
          <SafeAreaView
              style={{
              flexGrow: 1,
              backgroundColor: COLORS.sliderBackgroundGrey
              }}
          >
              <ScrollView>
              
              <View style={styles.header}>
                  <SubPageHeader onPress={() => navigation.goBack()} label="Notification" />
              </View>
  
              </ScrollView>
          </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: COLORS.white,
        borderRadius: wp(8),
        paddingTop: wp(10),
        paddingBottom: wp(10),
        marginHorizontal: wp(4),
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: wp(4),
        paddingBottom: wp(4),
        backgroundColor: COLORS.white,
        borderRadius: wp(6),
        marginHorizontal: wp(3)
      }
})
export default NotificationScreen;