import React, {createContext, useState} from 'react';
import { Alert,Keyboard } from 'react-native';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userToken, setUserToken] = useState("dghej-jdkd-wjhjs-2020-02020");
    const [isLoading, setIsLoading] = useState(false);

    // FUNCTION TO LOGIN USER
    const ValidateCustomerLogin = (userPhone, userPasscode) => {

        const [userToken, setUserToken] = useState(null);
        const [isLoading, setIsLoading] = useState(false);
        const [errorMessage, setErrorMessage] = useState(null);
    }

    return (
        <AuthContext.Provider
            value={{
                userToken,
                ValidateCustomerLogin
            }}>
        {children}
        </AuthContext.Provider>
    )
}