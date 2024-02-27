import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WelcomeScreen, 
        SliderScreen, CreateAccountScreen, LoginScreen, ForgotPasswordScreen } from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Slider' component={SliderScreen} />
            <Stack.Screen name='CreateAccount' component={CreateAccountScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack;