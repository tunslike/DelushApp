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
  import { OrderCategory, FoodMenuItem } from '../../components';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = ({navigation}) => {

  const [activeCategory, setActiveCategory] = useState(1)

  // function to change category
  const changeOrderCategory = (id) => {
      setActiveCategory(id)
  }
  // end of function

  return (
    <SafeAreaView
    style={{
      flexGrow: 1,
      backgroundColor: COLORS.sliderBackgroundGrey
    }}
    >
    <ScrollView>

        <View style={styles.header}>
            <View>
              <Text style={styles.textHeader}>Hello, Adebayo</Text>
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
                      <Text style={styles.txtPromo}>Get 20% discount on your BULK orders</Text>
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

              <FoodMenuItem 
                onPress={() => navigation.navigate("OrderDetails", {foodImage:images.jollofrice, foodName:"Jollof Rice Special", foodDesc:"Served with plantain or moimio with 1 meat and fish", foodAmount:2500})}
                image={images.jollofrice}
                foodName="Jollof Rice Special"
                desc="Served with plantain or moimio with 1 meat and fish"
                amount={2500}
              />

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
    paddingHorizontal: wp(2),
    paddingVertical: wp(2),
    width: wp(30),
    marginTop: wp(2)
  },
  txtPromo: {
      fontFamily: FONTS.POPPINS_BOLD,
      color: COLORS.white,
      fontSize: wp(4.5),
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