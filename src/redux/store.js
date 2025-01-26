import { configureStore } from '@reduxjs/toolkit'
import Article from './reducers/article.reducer'
import  User  from './reducers/user.reducer'
import  Users  from './reducers/users.reducer'

export default configureStore({
    reducer: {
        article: Article,
        user: User,
        users: Users
    },
})
