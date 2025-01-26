import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[],
    loading:false,
    currentUser: null, 
    error:null,
    log:false
}

export const Users = createSlice({
    name:"Users", 
    initialState,
    reducers:{
        FETCH_USERS_START: (store) => {
            store.loading = true
        },
        FETCH_USERS_SUCCESS: (store, actions) => {
            store.loading = false
            store.data = actions.payload
        },
        FETCH_USER_DETAIL: (store, actions) => {
            store.loading = false
            // on save dans curentUser les informations de l'user sélectionné
            store.currentUser = store.data.filter(user => user._id == actions.payload )
        }
    }

})

export const {FETCH_USERS_START, FETCH_USERS_SUCCESS,FETCH_USER_DETAIL} = Users.actions
export default Users.reducer