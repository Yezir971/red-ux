import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[],
    loading:false,
    error:null,
    log:false
}

export const User = createSlice({
    name:"User", 
    initialState,
    reducers:{
        FETCH_USER_START: (store) => {
            store.loading = true
        },
        FETCH_USER_SUCCESS: (store, actions) => {
            store.loading = false
            store.data = actions.payload
            store.log = true
        },
        USER_LOGOUT: (store) => {
            store.loading = false
            store.data = []
            store.log = false
        },
        USER_UPDATE: (store) => {
            store.loading = false
            // store.data = store.userUpdate
        }
    }

})

export const {FETCH_USER_START, FETCH_USER_SUCCESS,USER_LOGOUT, USER_UPDATE} = User.actions
export default User.reducer