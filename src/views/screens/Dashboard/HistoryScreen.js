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

const HistoryScreen = ({navigation}) => {

  const customerData = useSelector((state) => state.customer.customerData);

  const [historyData, setHistoryData] = useState('data');
  const [toggle, setToggle] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [customerOrder, setCustomerOrder] = useState([]);

  const toggleButton = (value) => {
    setToggle(value)
  }

  const switchToggleAndFetch = (status) => {
    fetchCustomerOrders(status);
    toggleButton(status);
  }

  // functiont to fetch 
  const fetchCustomerOrders = (status) => {
    //data
   const data = {
    customer_id: customerData.customer_ENTRY_ID
  }

  console.log(data)

  setIsLoading(true);

    axios.post(APIBaseUrl.developmentUrl + 'order/fetchCustomerOrder',data,{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      setIsLoading(false);

      let filteredData = [];

      if(status == 1) {
        for (let i=0; i < response.data.length; i++) {
            if(response.data[i].order_STATUS == 0) {
              filteredData = [...filteredData, response.data[i]];
            }
        }
      }else if(status == 0) {

        for (let i=0; i < response.data.length; i++) {
          if(response.data[i].order_STATUS == 1) {
            filteredData = [...filteredData, response.data[i]];
          }
      }
      } 
      setCustomerOrder(filteredData);
          
    })
    .catch(error => {
      console.log(error);
    });

  }// end of function

    //USE EFFECT
    useEffect(() => {

      fetchCustomerOrders(1);
    
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
      <SubPageHeader onPress={() => navigation.goBack()} label="Order History" />
    </View>

    <View style={styles.toggleBox}>
      <TouchableOpacity onPress={() => switchToggleAndFetch(1)} style={(toggle == 1) ? styles.toggleBtn_active : styles.toggleBtn}>
          <Text style={(toggle == 1) ? styles.toggleTxt_active : styles.toggleTxt}>Pending</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  switchToggleAndFetch(0)} style={(toggle == 0) ? styles.toggleBtn_active : styles.toggleBtn}>
          <Text style={(toggle == 0) ? styles.toggleTxt_active : styles.toggleTxt}>Completed</Text>
      </TouchableOpacity>
    </View>

    {(historyData != '') &&
        <View style={styles.dataBody}>
           
        {(toggle == 0) && 
            <View>
                {
                  customerOrder.map((order) => {
                    return (
                      <HistoryCard key={order.order_ID}
                        orderNo={order.order_NUMBER}
                        amount={Intl.NumberFormat('en-US').format(order.amount)}
                        date={moment(order.date_CREATED).format("DD/MM/YYYY")}
                        completed={(order.order_STATUS == 1) ? true : null}
                      />
                    )
                  })
                }
            </View>
        }

        {customerOrder.length == 0 &&
          <View>
            <Text style={{
              fontFamily: FONTS.POPPINS_REGULAR,
              fontSize: wp(3),
              marginLeft: wp(2),
              color: COLORS.formTextGrey,
              textAlign: 'center'
            }}>No record available, please check back!</Text>
            <Image source={images.notFound} 
            style={{
              height: wp(40), width: wp(40), resizeMode: 'contain', marginTop: wp(5),
              alignSelf: 'center', borderRadius: wp(5)
            }}
          />
          </View>
        }
        
        {(toggle == 1) &&
          <View>
                {
                  customerOrder.map((order) => {
                    return (
                      <HistoryCard key={order.order_ID}
                        orderNo={order.order_NUMBER}
                        amount={Intl.NumberFormat('en-US').format(order.amount)}
                        date={moment(order.date_CREATED).format("DD/MM/YYYY")}
                      />
                    )
                  })
                }
          </View>
        }

        </View>
    }

    {(historyData == '') &&
    <View>
      <Text style={styles.orderLabel}>Your order history will show here</Text>
      <View style={styles.body}>
          <Image source={images.notFound} 
            style={{
              height: wp(50), width: wp(50), resizeMode: 'contain',
              alignSelf: 'center'
            }}
          />
          <Text style={styles.orderAler}>No order history!</Text>
      </View>
    </View>
  }

   

    </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  toggleTxt_active: {
    color: COLORS.white,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3)
  },

  toggleTxt: {
    color: COLORS.prinmaryOrange,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3)
  },
  toggleBtn_active: {
      paddingVertical: wp(2.8),
      width: wp(40),
      borderRadius: wp(2),
      backgroundColor: COLORS.prinmaryOrange,
      alignItems: 'center'
  },
  toggleBtn: {
    paddingVertical: wp(2.5),
    width: wp(40),
    borderRadius: wp(2),
    borderColor: COLORS.prinmaryOrange,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center'
},
  dataBody: {
    marginHorizontal: wp(8),
    marginTop: wp(7)
  },
  toggleBox: {
    marginHorizontal: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: wp(8)
  },
  orderAler: {
    color: COLORS.prinmaryOrange,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    alignSelf: 'center'
  },
  orderLabel: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.loginScreenDesc,
    marginHorizontal: wp(8),
    marginTop: wp(8),
    marginBottom: wp(2)
  },
  textHeader: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4.2),
    color: COLORS.primaryGreen
  },
  notification: {
      borderColor: COLORS.accountFormborder,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: wp(3.8),
      height: wp(10),
      width: wp(10.5),
      alignItems: 'center',
      justifyContent: 'center'
  },
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
export default HistoryScreen