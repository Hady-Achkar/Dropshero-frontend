import authReducer from './AuthReducer'
import productsReducer from './ProductsReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer
