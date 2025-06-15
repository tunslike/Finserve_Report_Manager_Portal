import { createSlice  } from "@reduxjs/toolkit";

// set initial State
const initialState = {
    subscriberData: [],
    clientIpAddress: ''
}

export const subscriberSlice = createSlice({
    name: 'subscriber',
    initialState: initialState,
    reducers: {
        updateClientIPAddress: (state, action) => {
            state.clientIpAddress = action.payload
        },
        updateSubscriberData: (state, action) => {
            state.subscriberData = action.payload
        },
        logoutSubscriber: (state) => {
            state.subscriberData = []
            state.subscriberProfile = []
            state.earningsBalance = []
        }
    },
});

export const {

    updateSubscriberData,
    logoutSubscriber,
    updateClientIPAddress

} = subscriberSlice.actions;

export default subscriberSlice.reducer;