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
  import { COLORS, images, FONTS, icons } from '../../../constants';
  import { AuthContext } from '../../../context/AuthContext';
  import { useSelector, useDispatch } from 'react-redux';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { OrderCategory, FoodMenuItem, Loader } from '../../components';
  import { APIBaseUrl, utilities } from '../../../constants';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = ({navigation, route}) => {

  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.customerData);
  const storeSettings = useSelector((state) => state.customer.storeSettings)

  const [activeCategory, setActiveCategory] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [menuList, setMenuList] = useState([]);

  // function to change category
  const changeOrderCategory = (id) => {
      setActiveCategory(id)

      if(id == 1) {
        fetchFoodMenus('Food')
      }else if(id == 2) {
        fetchFoodMenus('Drink')
      }else if(id == 3) {
        fetchFoodMenus('Snack')
      }else if(id == 4) {
        fetchFoodMenus('Fruit')
      }
  }
  // end of function

  // functiont to fetch 
  const fetchFoodMenus = (foodid) => {
    //data
   const data = {
    foodName: foodid
  }

  console.log(data)

  setIsLoading(true);

    axios.post(APIBaseUrl.developmentUrl + 'order/fetchFoodMenu',data,{
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8082'
      }
    })
    .then(response => {

      setIsLoading(false);
    
          //set fetch list
          setMenuList(response.data);
          console.log(response.data)
    
    })
    .catch(error => {
      console.log(error);
      setIsLoading(false);
    });


  }// end of function


      // FUNCTION TO CHECK LOGGED USER
      const ValidateUserLoggedIn = async () => {
        try {
            
            let userData = await AsyncStorage.getItem('userLogged');
  
            if(userData) {
              console.log('user has logged in before')

            }else{
              console.log('New User found')
            }
            
            
        } catch (e) {
          console.log(`isLogged in error ${e}`);
        }
     }
    // END OF FUNCTION

  //USE EFFECT
  useEffect(() => {

    ValidateUserLoggedIn();

    fetchFoodMenus('Food');
  
  }, []);

  return (
    <SafeAreaView
    style={{
      flexGrow: 1,
      backgroundColor: COLORS.sliderBackgroundGrey
    }}
    >
  
    {(isLoading) &&
      <Loader />
    }
    <ScrollView>

        <View style={styles.header}>
            <View>
              <Text style={styles.textHeader}>Hello, {customerData.first_NAME}</Text>
              <Text style={styles.textDesc}>What would you like to order?</Text>
            </View>
            <TouchableOpacity
              style={styles.notification}
            >
                <Image source={icons.notification} 
                  style={{
                    height: wp(5), width: wp(5), resizeMode: 'contain', tintColor: COLORS.prinmaryOrange
                  }}
                />
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.bulkBox}>
                    <View>
                      <Text style={styles.txtPromo}>Get {storeSettings.bulk_discount}% discount on your BULK orders</Text>
                      <View style={styles.orderBtn}>
                        <Text style={styles.orderTxt}>ORDER NOW!</Text>
                      </View>
                    </View>
                    <Image source={images.deliveryman} 
                      style={{
                        height: wp(27), width: wp(27), resizeMode: 'contain', 
                        marginTop: wp(-2.5),
                        borderRadius: wp(3)
                      }} 
                    />
        </TouchableOpacity>

        <View style={styles.categoryBox}>
        
                <OrderCategory
                    onPress={() => changeOrderCategory(1)}
                    icon={images.foods}
                    active={(activeCategory == 1) ? true : false}
                    label="Foods"
                />
                <OrderCategory 
                    onPress={() => changeOrderCategory(2)}
                    icon={images.drinks}
                    active={(activeCategory == 2) ? true : false}
                    label="Drinks"
                />
                <OrderCategory 
                    onPress={() => changeOrderCategory(3)}
                    icon={images.snacks}
                    active={(activeCategory == 3) ? true : false}
                    label="Snacks"
                />
                <OrderCategory 
                    onPress={() => changeOrderCategory(4)}
                    icon={images.fruits}
                    active={(activeCategory == 4) ? true : false}
                    label="Fruits"
                />
        </View>

       <View style={styles.itemDisplay}>
              <Text style={styles.itemHeader}>Food Menu</Text>

              {
                menuList.map((menu) => {
                  return (
                      <FoodMenuItem key={menu.food_MENU_ID}
                        onPress={() => navigation.navigate("OrderDetails", {food_menu_ID:menu.food_MENU_ID, foodImage:(menu.image_BASE_64) ? {uri:menu.image_BASE_64} : utilities.FoodImageMatchAlgorithm(menu.food_NAME), foodName:menu.food_NAME, foodDesc:menu.description, foodAmount:menu.amount})}
                        image={(menu.image_BASE_64) ? {uri:menu.image_BASE_64} : utilities.FoodImageMatchAlgorithm(menu.food_NAME)}
                        foodName={menu.food_NAME}
                        desc={menu.description}
                        amount={menu.amount}
                      />
                  )
                })
              }

              {/*
                   <FoodMenuItem 
                onPress={() => navigation.navigate("OrderDetails", {foodImage:images.amala, foodName:"Amala and Ewedu", foodDesc:"Served with 2 pieces of meat or goat meat", foodAmount:4500})}
                image={images.amala}
                foodName="Amala and Ewedu"
                desc="Served with 2 pieces of meat or goat meat"
                amount={3500}
              />

              <FoodMenuItem 
                onPress={() => navigation.navigate("OrderDetails", {foodImage:images.egusi, foodName:"Egusi Soup", foodDesc:"Served with plantain or moimio with 1 meat and fish", foodAmount:2500})}
                image={images.egusi}
                foodName="Egusi Soup"
                desc="Served with plantain or moimio with 1 meat and fish"
                amount={2500}
              />

              <FoodMenuItem 
                onPress={() => navigation.navigate("OrderDetails", {foodImage:images.spag, foodName:"Spagetti", foodDesc:"Served with plantain or moimio with 1 meat and fish", foodAmount:2500})}
                image={images.spag}
                foodName="Spagetti"
                desc="Served with plantain or moimio with 1 meat and fish"
                amount={4500}
              />
            
            */}
       </View> 

    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  itemHeader: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.tabColorActive,
    fontSize: wp(4),
    marginBottom: wp(3),
    marginLeft: wp(2)
  },
  itemDisplay: {
    marginHorizontal: wp(5),
    marginTop: wp(7),
    marginBottom: wp(18)
  },
  categoryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: wp(3),
    marginHorizontal: wp(4),
    marginTop: wp(8)
  },
  orderTxt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.prinmaryOrange,
    fontSize: wp(3.3),
    textAlign: 'center'
  },
  orderBtn: {
    backgroundColor: COLORS.white,
    borderRadius: wp(8),
    paddingHorizontal: wp(1),
    paddingVertical: wp(1.7),
    width: wp(30),
    marginTop: wp(3)
  },
  txtPromo: {
      fontFamily: FONTS.POPPINS_BOLD,
      color: COLORS.white,
      fontSize: wp(4),
      width: wp(55)
  },
  bulkBox: {
    backgroundColor: COLORS.primaryGreen,
    borderRadius: wp(5),
    width: '95%',
    height: wp(30),
    marginTop: wp(4),
    marginHorizontal: wp(2.5),
    padding: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  textDesc: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.loginScreenDesc,
    fontSize: wp(3.3),
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: wp(4),
    paddingHorizontal:wp(3),
    paddingBottom: wp(5),
    backgroundColor: COLORS.white,
    borderRadius: wp(6),
    marginHorizontal: wp(3)
  }
})

export default DashboardScreen;