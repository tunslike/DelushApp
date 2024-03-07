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
  import { useFocusEffect } from '@react-navigation/native';
  import axios from 'axios';
  import { COLORS, images, FONTS, APIBaseUrl, icons } from '../../../constants';
  import { AuthContext } from '../../../context/AuthContext';
  import { SubPageHeader, CartOrderItem, Loader } from '../../components';
  import { useDispatch, useSelector } from 'react-redux';
  import { addToOrderCart , removeFromOrderCart, clearOrderCart} from '../../../store/customerSlice';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = ({navigation}) => {

    const orderCart = useSelector((state) => state.customer.cart);
    const customerData = useSelector((state) => state.customer.customerData);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [subtotal, setSubTotal] = useState(15000);
    const [deliveryFee, setDeliveryFee] = useState(500);
    const [packAmount, setPackAmout] = useState(250)
    const [totalOrderPrice, setTotalOrderPrice] = useState(0.00)


    const submitCustomerOrder = () => {
      Alert.alert('Delush','Do you want submit your order?', [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => submitCustomerOrderRequest()},
      ]);
    }

    const submitCustomerOrderRequest = () => {

      const data = {
        customerID: customerData.customer_ENTRY_ID,
        order: orderCart
      }
    
      console.log(data)

      setIsLoading(true);
    
        axios.post(APIBaseUrl.developmentUrl + 'order/submitCustomerOrder',data,{
          headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8082'
          }
        })
        .then(response => {
    
          setIsLoading(false);

          if(response.data.response.responseCode == 200) {

                // push cart to store
                dispatch(clearOrderCart())
                setTotalOrderPrice(0.00)
                setSubTotal(0.0)

                navigation.navigate("OrderCompleted",{orderNumber:response.data.orderNumber})

                return;

          }else {
            console.log(response.data)
            Alert.alert("Delush", "Sorry, we are unable to process your request! Please try again")
            return;
          }
        
    
        
        })
        .catch(error => {
          console.log(error);
        });
    
    }

    const clearOrderCartItems = () => {
      
      Alert.alert('Delush','Do you want clear Order?', [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => executeClearCartItems()},
      ]);
    }

    const executeClearCartItems = () => {

      // push cart to store
      dispatch(clearOrderCart())
      setTotalOrderPrice(0.00)
      setSubTotal(0.0)
     
      Alert.alert('Delush', 'Your orders have been cleared!')
 }

 const calculateTotalOrder = () => {

  let totalPrice = 0;

  orderCart.forEach(function (item) {
    totalPrice = totalPrice + (item.foodAmount * item.quantity)
  })
  setSubTotal(totalPrice)

  let totalOderPrice = totalPrice + deliveryFee + packAmount;

  setTotalOrderPrice(totalOderPrice)
}

useFocusEffect(
  React.useCallback(() => {
    calculateTotalOrder();
  })
)
 
    //USE EFFECT
    useEffect(() => {

      //fetch providers
      console.log("Number of items in cart: " + orderCart.length)
      console.log(orderCart)

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
      <SubPageHeader onPress={() => navigation.goBack()} label="Your Orders" />
    </View>

{(orderCart.length) == 0 &&
  <View>
  <Text style={styles.orderLabel}>Your pending order will show here</Text>
  <View style={styles.body}>
  <Image source={images.noOrder} 
    style={{
      height: wp(50), width: wp(50), resizeMode: 'contain',
      alignSelf: 'center'
    }}
  />
  <Text style={styles.orderAler}>No pending order found!</Text>
</View>
</View>
}

{(orderCart.length) > 0 &&
<View>
<View style={styles.subHeader}>
<Text style={styles.orderLabelAdded}>Order Items ({orderCart.length})</Text>
<TouchableOpacity
onPress={() => clearOrderCartItems()}
>
  <Text style={styles.clearLabel}>Clear Order</Text>
</TouchableOpacity>
</View>
    {orderCart.map((menu) => {
      return (
        <CartOrderItem 
        key={menu.foodMenuID} 
        foodName={menu.foodName}
        amount={(menu.foodAmount * menu.quantity)}
        itemQuantity={menu.quantity}
        bulkStatus={(menu.bulkOrder ==1) ? true : false}
        />
      )
    })
    }
</View>
}

{orderCart.length > 0 &&
  <View>
<Text style={styles.orderSumtxt}>Payment Details</Text>
<View style={styles.body}>
<View style={styles.summItem}><Text style={styles.itemSubj}>Payment Method</Text><Text style={[styles.textAmount, {color: COLORS.prinmaryOrange}]}>Pay on delivery</Text></View>
</View>
</View>
}

{orderCart.length > 0 &&
  <View>
<Text style={styles.orderSumtxt}>Order Summary</Text>
<View style={styles.body}>
    <View style={styles.summItem}><Text style={styles.itemSubj}>Sub-Total</Text><Text style={styles.textAmount}>₦ {subtotal.toLocaleString('en-US', {maximumFractionDigits:2})}</Text></View>
    <View style={styles.summItem}><Text style={styles.itemSubj}>Delivery Fee</Text><Text style={styles.textAmount}>₦ {deliveryFee.toLocaleString('en-US', {maximumFractionDigits:2})}</Text></View>
    <View style={styles.summItem}><Text style={styles.itemSubj}>Plastic Pack</Text><Text style={styles.textAmount}>₦ {packAmount.toLocaleString('en-US', {maximumFractionDigits:2})}</Text></View>
    <View style={[styles.summItem, {marginTop: wp(3)}]}><Text style={styles.totaltxt}>TOTAL</Text><Text style={styles.textTotal}>₦ {totalOrderPrice.toLocaleString('en-US', {maximumFractionDigits:2})}</Text></View>
</View>
   
<View style={{marginBottom: wp(25)}}>
<TouchableOpacity
onPress={() => submitCustomerOrder()}
style={styles.createActBtn}
>
  <Text style={styles.btnRegister}>Confirm & Checkout</Text>
</TouchableOpacity>
</View>
</View>
}

    </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btnRegister: {
    color: COLORS.white,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize:  wp(3.7),
    },
  createActBtn: {
    backgroundColor: COLORS.prinmaryOrange,
    borderRadius: wp(10),
    paddingHorizontal: wp(25),
    paddingVertical: wp(3.5),
    alignSelf: 'center',
    marginTop: wp(5)
    },
  textTotal: {
    color: COLORS.loginScreenDesc,
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: wp(4)
  },
  textAmount: {
    color: COLORS.loginScreenDesc,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.3)
  },
  totaltxt: {
    color: COLORS.prinmaryOrange,
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: wp(4)
  },
  itemSubj: {
    color: COLORS.busDescDarkgreen,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.3)
  },
  summItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: wp(5),
    paddingBottom: wp(3)
  },
  orderSumtxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.loginScreenDesc,
    marginTop: wp(7),
    marginLeft: wp(9),
    marginBottom: wp(3)
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp(8),
    marginTop: wp(8),
    marginBottom: wp(3)
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
    marginLeft: wp(10),
    marginTop: wp(7),
    marginBottom: wp(2.5)
  },
  orderLabelAdded: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.loginScreenDesc,
  },
  clearLabel: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.priceColorRed,
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
    paddingTop: wp(5),
    paddingLeft: wp(5),
    paddingBottom: wp(5),
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
export default CartScreen