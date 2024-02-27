import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DashboardScreen } from '../screens';
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

        </Stack.Navigator>
    )
}

export default AppStack;