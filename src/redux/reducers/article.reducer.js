import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    data:[],
    loading: false,
    error: null
} 
export const Article = createSlice({
    name:'Article',
    initialState,
    reducers:{
        FETCH_ARTICLE_START: (store) => {
            store.loading = true
        },
        FETCH_ARTICLE_SUCCESS: (store, actions) => {
            store.loading = false
            store.data = actions.payload
        },
        FETCH_ARTICLE_DETAIL: (store, actions) => {
            store.loading = false
            store.data = store.data.filter(article => article.id == actions.payload )
        },
        FETCH_ARTICLE_CATEGORY: (store, actions) => {
            store.loading = false
            store.data = store.data.filter(article => article.category == actions.payload )
        }
    }
})

export const {FETCH_ARTICLE_START, FETCH_ARTICLE_SUCCESS, FETCH_ARTICLE_DETAIL, FETCH_ARTICLE_CATEGORY} = Article.actions
export default Article.reducer