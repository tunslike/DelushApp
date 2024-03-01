import React, {createContext, useState} from 'react';
import { Alert,Keyboard } from 'react-native';
import axios from 'axios';
import { APIBaseUrl } from '../constants';
import { useDispatch } from 'react-redux';
import { updateCustomerData } from '../store/customerSlice';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const dispatch = useDispatch();

    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // FUNCTION TO VALIDATE USER LOGIN
    const ValidateCustomerLogin = (customerEntry, customerAccessCode) => {


        if(customerEntry == '' || customerAccessCode == '') {
            Alert.alert('Delush','Please enter your phone number and password to login!');
            return;
        }

        //DISMISS KEYBOARD
        Keyboard.dismiss();

        setIsLoading(true);


        const options = {
            headers: {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8083'
            }
          };

        const data = {
            username: customerEntry,
            password: customerAccessCode
          };
        
          axios.post(APIBaseUrl.developmentUrl + 'customer/login', data, options)
          .then(response => {
  
              setIsLoading(false);

              if(response.data.response.responseCode == '200') {

                   console.log('****************/ LOGIN WAS SUCCESSFUL /********************')

                   dispatch(updateCustomerData(response.data.customer))
                   setUserToken(response.data.customer.customer_ENTRY_ID);

                   return;
                   
              }else {
  
                  console.log(response.data.statusMessage)
                  //show error message
                  setErrorMessage(response.data.statusMessage);
  
                  //set loading off
                  setIsLoading(false)
  
                  return;
              }
          })
          .catch(error => {
  
              setIsLoading(false);
              setErrorMessage('Service is unavailable, please retry!')
  
              console.log(error);
          });
    }
    // END OF FUNCTION

    return (
        <AuthContext.Provider
            value={{
                userToken,
                ValidateCustomerLogin,
                isLoading
            }}>
        {children}
        </AuthContext.Provider>
    )
}