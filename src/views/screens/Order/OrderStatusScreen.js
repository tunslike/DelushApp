import React, {useState, useEffect } from 'react'
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
  import { COLORS, images, FONTS, APIBaseUrl, icons } from '../../../constants';
  import { SubPageHeader, HistoryCard, Loader } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 import { SafeAreaView } from 'react-native-safe-area-context';


const OrderStatusScreen = ({navigation, route}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [deliveryDetails, setDeliveryDetails] = useState('');
    const {orderID} = route.params;

// functiont to fetch 
const fetchCustomerOrdersDetails = () => {
    //data
   const data = {
    order_id: orderID
  }

  console.log(data)

  setIsLoading(true);

    axios.post(APIBaseUrl.developmentUrl + 'order/fetchOrderDeliveryDetails',data,{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      setIsLoading(false);

        setDeliveryDetails(response.data)
          
    })
    .catch(error => {
      console.log(error);
    });

  }// end of function

    //USE EFFECT
    useEffect(() => {

        if(orderID) {
            fetchCustomerOrdersDetails();
        }
    
    }, []);

    return (
          <SafeAreaView
              style={{
              flexGrow: 1,
              backgroundColor: COLORS.sliderBackgroundGrey
              }}
          >
          {isLoading &&
            <Loader />
          }
              <ScrollView>
              
              <View style={styles.header}>
                  <SubPageHeader onPress={() => navigation.goBack()} label="Order Confirmation" />
              </View>

              <Text style={styles.orderLabel}>Order delivery information</Text>

              <View style={styles.body}>
              <Text style={styles.orderNo}>Order: {deliveryDetails.order_number}</Text>
                <Image source={images.deliveryman} 
                    style={{
                        height: wp(42), width: wp(42), borderRadius: wp(8),
                        resizeMode: 'contain', alignSelf: 'center'
                    }}
                />
                <Text style={styles.orderStatus}>Your order is on the way!</Text>

                <View style={{marginHorizontal: wp(7), marginTop: wp(8)}}>
                    <Text style={styles.delTxt}>Delivery Additional Comment</Text>
                    <View style={styles.delFiled}>
                    <Text style={styles.delTxt}>{deliveryDetails.order_comments}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View>
                        <Text style={styles.delTxt}>Delivery Contact Name</Text>
                        <View style={styles.delFiled}>
                        <Text style={styles.delTxt}>{deliveryDetails.delivery_contact_name}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.delTxt}>Delivery Phone Number</Text>
                        <View style={styles.delFiled}>
                        <Text style={styles.delTxt}>{deliveryDetails.delivery_contact_phone}</Text>
                        </View>
                    </View>
                </View>

              </View>
  
              </ScrollView>
          </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    delFiled: {
        borderColor: COLORS.accountFormborder,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: wp(3),
        width: '100%',
        padding: wp(3),
        paddingHorizontal: wp(5),
        marginTop: wp(1.5)
    },
    delTxt: {
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.sliderDescText,
        fontSize: wp(3)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: wp(8),
        marginHorizontal: wp(4)
    },
    orderNo: {
        color: COLORS.priceColorRed,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        textAlign: 'center',
        fontSize: wp(4),
        marginBottom: wp(4)
    },
    orderStatus: {
        color: COLORS.prinmaryOrange,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        textAlign: 'center',
        marginTop: wp(3),
        fontSize: wp(4)
    },
    orderLabel: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3),
        color: COLORS.loginScreenDesc,
        marginLeft: wp(10),
        marginTop: wp(10),
        marginBottom: wp(2.5)
      },
    body: {
        backgroundColor: COLORS.white,
        borderRadius: wp(8),
        paddingTop: wp(5),
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
export default OrderStatusScreen;