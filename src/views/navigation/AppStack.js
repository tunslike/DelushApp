import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DashboardScreen, OrderDetailsScreen } from '../screens';
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

        </Stack.Navigator>
    )
}

export default AppStack;