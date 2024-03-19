import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthContext} from '../../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Router = () => {
    
    const {userToken} = useContext(AuthContext);

    return (
        <NavigationContainer>
            {(userToken !== null) ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Router;
