import {
    AccountStatus,
    AuthActions,
    authState,
    BundleType,
    UserType,
} from '../types'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import {AuthAxios, UsersAxios, UtilsAxios} from '../lib'

const initState: authState = {
    isAuthenticated: false,
    user: {
        token: '',
        fullName: '',
        email: '',
        _id: '',
        type: UserType.STANDARD,
        stripeId: '',
        activeSubscription: '',
        isTrialLegit: true,
        subscriptions: [],
        inTrial: false,
        paymentMethods: [],
        status: AccountStatus.NOT_VERIFIED,
        favorites: [],
        bundleType: BundleType.MONTHLY,
    },
}
const authReducer = (state: authState = initState, action: AuthActions) => {
    switch (action.type) {
        case 'LOGIN':
            AuthAxios.defaults.headers.common['Authorization'] =
                'Bearer ' + action?.user_info.token
            AuthAxios.defaults.headers.common['Accept'] = 'application/json'

            UsersAxios.defaults.headers.common['Authorization'] =
                'Bearer ' + action?.user_info.token
            UsersAxios.defaults.headers.common['Accept'] = 'application/json'
            UtilsAxios.defaults.headers.common['Authorization'] =
                'Bearer ' + action?.user_info.token
            UtilsAxios.defaults.headers.common['Accept'] = 'application/json'
            return {
                ...state,
                isAuthenticated: true,
                user: action.user_info,
            }
        case 'LOGOUT':
            return initState
        case 'ADD_PAYMENT_METHOD':
            return {
                ...state,
                user: {
                    ...state.user,
                    paymentMethods: [...state.user.paymentMethods, action.paymentMethod],
                },
            }
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                user: {
                    ...state.user,
                    favorites: action.products,
                },
            }
        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                user: {
                    ...state.user,
                    favorites: action.products,
                },
            }
        case 'CHANGE_BUNDLE_TYPE':
            return {
                ...state,
                user: {
                    ...state.user,
                    bundleType: action.bundleType
                }
            }
        case 'CHANGE_ACCOUNT_TYPE':
            return {
                ...state,
                user: {
                    ...state.user,
                    status: action.accountStatus
                }
            }

        case 'CANCEL_SUBSCRIPTION': {
            return {
                ...state,
                user: {
                    ...state.user,
                    activeSubscription: '',
                    isTrialLegit: false,
                    subscriptions: [],
                    inTrial: false,
                    status: AccountStatus.NOT_VERIFIED,
                    bundleType: BundleType.MONTHLY,
                }
            }
        }
        default:
            return state
    }
}
const persistConfig = {
    keyPrefix: 'DropsHero-',
    key: 'AuthReducer',
    storage,
}
export default persistReducer(persistConfig, authReducer)
