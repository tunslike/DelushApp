import { createSlice } from "@reduxjs/toolkit";

//set initial state
const initialState = {
    customerData: [],
}

export const customerSlice = createSlice({
    name: 'Customer',
    initialState: initialState,
    reducers: {
        updateCustomerData: (state, action) => {
            state.customerData = action.payload
        }
    }
})

export const {
    updateCustomerData,
} = customerSlice.actions;

export default customerSlice.reducer;