import { createSlice } from "@reduxjs/toolkit";

//set initial state
const initialState = {
    customerData: [],
    cart: [],
    storeSettings: [],
}

export const customerSlice = createSlice({
    name: 'Customer',
    initialState: initialState,
    reducers: {
        updateStoreSettings: (state, action) => {
            state.storeSettings = action.payload
        },
        updateCustomerData: (state, action) => {
            state.customerData = action.payload
        },
        addToOrderCart: (state, action) => {
            state.cart = [...state.cart, action.payload]
            console.log(state.cart.length)
        },
        removeFromOrderCart: (state, action) => {
            const findIndex = state.cart.findIndex(a => a.menuID === action.payload)
            findIndex !== -1 && state.cart.splice(findIndex , 1)
            console.log(state.cart.length)
        },
        clearOrderCart: (state, action) => {
            state.cart.splice(0, state.cart.length);
            console.log(state.cart.length)
        },
        clearCustomerData: (state, action) => {
            state.customerData = [];
        }
    }
})

export const {
    updateCustomerData, 
    clearCustomerData,
    addToOrderCart, removeFromOrderCart, clearOrderCart, updateStoreSettings } = customerSlice.actions;

export default customerSlice.reducer;