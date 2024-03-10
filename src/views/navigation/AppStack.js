import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DashboardScreen, NotificationScreen, OrderCompletedScreen, OrderDetailsScreen, PrivacyScreen, ProfileUpdateScreen } from '../screens';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Tab" component={TabNavigator} />
            <Stack.Screen name='Dashboard' component={DashboardScreen} />
            <Stack.Screen name='OrderDetails' component={OrderDetailsScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name='CompletedOrder' component={OrderCompletedScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name='ProfileUpdate' component={ProfileUpdateScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='Privacy' component={PrivacyScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='Notification' component={NotificationScreen} options={{animation: 'slide_from_right'}} />

        </Stack.Navigator>
    )
}

export default AppStack;