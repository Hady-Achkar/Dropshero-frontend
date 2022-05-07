import {IProduct, ProductActions, DateSortingType} from '../types'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'

interface IState {
    loading: boolean
    products: IProduct[]
    page: number
    length: number
}

const initState: IState = {
    loading: true,
    products: [],
    page: 0,
    length: 0
}
const productsReducer = (state: IState = initState, action: ProductActions) => {
    switch (action.type) {
        case 'LOAD_STATE':
            return {
                ...state,
                loading: true,
            }
        case 'UNLOAD_STATE':
            return {
                ...state,
                loading: false,
            }
        case 'INITIALIZE_ALL_PRODUCTS':
            return {
                ...state,
                products: action?.products,
                length: action?.length
            }
        case 'REQUEST_PRODUCTS_PAGE':
            return {
                ...state,
                products: action.products,
                page: action.page
            }
        case 'SORT_COST':
            return {
                ...state,
                products: state.products.sort(
                    (a, b) => a.price.cost.min - b.price.cost.min
                ),
            }
        case 'SORT_DATE':
            if (action?.flow === DateSortingType.ASC) {
                return {
                    ...state,
                    products: state.products.sort(
                        (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)
                    ),
                }
            } else {
                return {
                    ...state,
                    products: state.products.sort(
                        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
                    ),
                }
            }
        case 'FILTER_CATEGORY':
            return {
                ...state,
                products: state.products.filter(
                    (item) => item.category === action.category
                ),
            }

        default:
            return state
    }
}
const persistConfig = {
    keyPrefix: 'DropsHero-',
    key: 'ProductsReducer',
    storage,
}
export default persistReducer(persistConfig, productsReducer)
