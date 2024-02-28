import React from 'react';

import {StyleSheet, Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, icons, images } from '../../constants';
import { TabIcon } from '../components';
import { DashboardScreen, CartScreen, ProfileScreen, HistoryScreen } from '../screens';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
            
        screenOptions={{
            tabBarShowLabel:false,
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: COLORS.white,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                height: hp(7.6),
                borderRadius: wp(5),
                marginBottom: Platform.OS === 'ios' ? hp(3.5) : hp(2),
                marginHorizontal:10,
                borderColor: COLORS.accountFormborder
            }
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={DashboardScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.home}
                    title="Home"    
                />
            }}
            />
        <Tab.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.history}
                    title="History"    
                />
            }}
            />
        <Tab.Screen 
            name="Loans" 
            component={CartScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.loan}
                    title="Cart"    
                />
            }}
            />
        <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.user}
                    title="Profile" 
                />
            }}
            />
    </Tab.Navigator>
  )
}

export default TabNavigator;

const styles = StyleSheet.create({})