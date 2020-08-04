import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import postReducer from './reduces/postReducer'
import authReducer from './reduces/authReducer'
import userReducer from './reduces/userReducer'

const reducers = combineReducers({
  posts: postReducer,
  userLogged: authReducer,
  users: userReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
