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
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { AuthContext } from '../../../context/AuthContext';
  import { InnerHeaderTab } from '../../components';
  import { useDispatch, useSelector } from 'react-redux';
  import { addToOrderCart } from '../../../store/customerSlice';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get("window");

const OrderDetailsScreen = ({navigation, route}) => {

    const orderCart = useSelector((state) => state.customer.cart);
    const dispatch = useDispatch();

    //route values
    const {foodImage, food_menu_ID, foodName, foodDesc, foodAmount} = route.params;
    const [enableBulk, setEnableBulk] = useState(0);
    const [itemQuantity, setItemQuantity] = useState(1);
    const [itemPrice, setItemPrice] = useState(foodAmount);
    const [showCart, setShowCart] = useState(false);
    const [foodAdded, setFoodAdded] = useState(false);

    const updateQuantity = (type) => {
        if(type == 1) {
            setItemQuantity(itemQuantity + 1)
        }else if(type == 0) {
            if(itemQuantity > 1) {
                setItemQuantity(itemQuantity - 1)
            }
        }
    }


// function to load product details
const AddProductToCart = (product_id) => {

    // create cart object
    const cart = {
        foodMenuID : food_menu_ID,
        foodName : foodName,
        quantity: itemQuantity,
        foodAmount: foodAmount,
        bulkOrder: enableBulk
    }

    // push cart to store
    dispatch(addToOrderCart(cart))
    setFoodAdded(true)

}
// end of function

   const switchEnableBulk = () => {
    if(enableBulk == 0) {
        setEnableBulk(1);
    }else if(enableBulk == 1) {
        setEnableBulk(0)
    }
  }

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
        <ScrollView>
            <ImageBackground
                source={foodImage}
                style={styles.headerBg}
            >

                <InnerHeaderTab 
                    onPress={() => navigation.goBack()}
                />
            </ImageBackground>

            <View
                style={styles.foodDetails}   
            >
                <View style={styles.titleArea}>
                    <Text style={styles.foodTitle}>{foodName}</Text>
                    <TouchableOpacity>
                        <Image source={icons.like} 
                            style={{
                                height: wp(5), width: wp(5), resizeMode: 'contain', tintColor: COLORS.prinmaryOrange
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.descTitle}>What's Included</Text>
                <Text style={styles.foodDesc}>{foodDesc}</Text>

                <View style={styles.noticeBox}>
                    <Text style={styles.discTxt}>10% discount for orders more than 10 quantities</Text>
                </View>
                <Text style={styles.foodPrice}>₦ {(itemPrice * itemQuantity).toLocaleString('en-US', {maximumFractionDigits:2})}</Text>
                <Text style={[styles.foodDesc, {marginTop: wp(-0.2)}]}>Sub-Total</Text>


                <View style={styles.quantityBox}>
                        
                    <TouchableOpacity
                            onPress={() => updateQuantity(0)}
                            style={styles.removeQuant}
                    >
                            <Image source={icons.minus} 
                                style={{
                                    height: wp(4), width: wp(4), tintColor: COLORS.loginScreenDesc,
                                    resizeMode: 'contain'
                                }}
                            />
                    </TouchableOpacity>
                    <Text style={styles.counter}>{itemQuantity}</Text>
                    <TouchableOpacity
                       onPress={() => updateQuantity(1)}
                       style={styles.addQuant}
                    >
                            <Image source={icons.add} 
                            style={{
                                height: wp(4), width: wp(4), tintColor: COLORS.white,
                                resizeMode: 'contain'
                            }}
                            />
                    </TouchableOpacity>
                </View>

                {(itemQuantity >= 10) &&
                
                    <TouchableOpacity 
                    onPress={() => switchEnableBulk()}
                    style={styles.bulkOrder}>
                            
                    {(enableBulk == 1) &&
                        <View style={styles.bulkBoxActive}>
                            <Image source={icons.check} 
                                style={{
                                    height: wp(4.5), width: wp(4.5), resizeMode: 'contain', tintColor: COLORS.white
                                }}
                            />
                        </View>
                    }
    
                    {(enableBulk == 0) &&
                        <View style={styles.bulkBox}></View>
                    }
                           
                            <Text style={[styles.bulkTxt,{color: (enableBulk == 0) ? COLORS.tabbedGray : COLORS.prinmaryOrange}]}>Bulk Order</Text>
                    </TouchableOpacity>
    
            
                }

                <TouchableOpacity
                    onPress={() => AddProductToCart()}
                    style={[styles.createActBtn, {backgroundColor: (foodAdded) ? COLORS.primaryGreenDisabled : COLORS.primaryGreen}]}
                    disabled={foodAdded ? true : false}
                 >
                 {foodAdded &&
                    <Text style={styles.btnRegister}>Added to order!</Text>
                }

                {!foodAdded &&
                    <Text style={styles.btnRegister}>Add to order</Text>
                }
                
            </TouchableOpacity>

            {(orderCart.length > 0) &&
                <TouchableOpacity
                    onPress={() => navigation.navigate("Order")}
                    style={styles.viewCartBtn}
                 >
                         <Text style={styles.viewCartTxt}>View Orders</Text><View style={styles.cartCount}><Text style={styles.cartTxt}>{orderCart.length}</Text></View>
                     </TouchableOpacity>
            }
          

            </View>

        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    cartTxt: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.prinmaryOrange,
        fontSize: wp(3)
    },
    cartCount: {
        borderColor: COLORS.prinmaryOrange,
        borderWidth: 1,
        borderStyle: 'solid',
        height: wp(5),
        width: wp(5),
        borderRadius: wp(4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    noticeBox: {
        paddingHorizontal: wp(4),
        paddingVertical: wp(2),
        marginHorizontal: wp(7.5),
        borderColor: COLORS.busDescDarkgreen,
        borderWidth: 1,
        borderStyle:  'dashed',
        borderRadius: wp(2),
        marginTop:wp(4)
    },
    discTxt: {
        color: COLORS.busDescDarkgreen,
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(2.9)
    },
    bulkBoxActive: {
        backgroundColor: COLORS.prinmaryOrange,
        borderRadius: wp(1.3),
        height: wp(3.5),
        width: wp(3.5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    bulkBox:{
        borderColor: COLORS.tabbedGray,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: wp(1),
        height: wp(3.2),
        width: wp(3.2)
    },
    bulkTxt: {
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3),
    },
    bulkOrder: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        columnGap: wp(1.5),
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: wp(2)
    },
    viewCartTxt: {
        color: COLORS.prinmaryOrange,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize:  wp(3.7),
    },
    btnRegister: {
        color: COLORS.white,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize:  wp(3.7),
    },
    createActBtn: {
        backgroundColor: COLORS.primaryGreen,
        borderRadius: wp(10),
        paddingHorizontal: wp(25),
        paddingVertical: wp(3.7),
        alignSelf: 'center',
        marginTop: wp(6)
    },
    viewCartBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:  'center',
        columnGap: wp(1),
        borderColor: COLORS.prinmaryOrange,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: wp(10),
        paddingHorizontal: wp(23),
        paddingVertical: wp(3.2),
        alignSelf: 'center',
        marginTop: wp(3)
    },
    
    counter: {
        fontFamily: FONTS.POPPINS_BOLD,
        fontSize: wp(7),
        color: COLORS.loginScreenDesc
    },
    addQuant: {
        backgroundColor: COLORS.prinmaryOrange,
        height: wp(7.5),
        borderRadius: wp(7.5),
        width: wp(7.5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeQuant: {
        borderColor: COLORS.orderDetailsDesc,
        borderWidth: 1,
        borderStyle: 'solid',
        height: wp(7.5),
        borderRadius: wp(7.5),
        width: wp(7.5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityBox: {
        marginHorizontal: wp(6),
        marginTop: wp(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: wp(35)
    },
    foodPrice: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.priceColorRed,
        fontSize: wp(7),
        marginHorizontal: wp(7.5),
        marginTop: wp(4)
    },
    foodDesc: {
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.orderDetailsDesc,
        fontSize: wp(3),
        marginHorizontal: wp(7.5),
        marginTop: wp(2)
    },
    descTitle: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        color: COLORS.prinmaryOrange,
        fontSize: wp(3),
        marginHorizontal: wp(7.5),
        marginTop: wp(6)
    },
    foodTitle: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(5),
        color: COLORS.primaryGreen
    },
    titleArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp(7)
    },
    foodDetails: {
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        paddingBottom: wp(20),
        marginTop: wp(-10),
        paddingTop: wp(10),
        backgroundColor: COLORS.white  
    },
    headerBg: {
        paddingTop: wp(4),
        height:350,
        width
      },
})
export default OrderDetailsScreen
