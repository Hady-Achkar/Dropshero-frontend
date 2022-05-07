import {IUser} from '../IUser'
import {AddNewPaymentMethod} from '../../services'
import {IProduct} from "../IProduct";
import {AccountStatus, BundleType} from "../enums";

export interface authState {
    isAuthenticated: boolean
    user: IUser
}

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const ADD_PAYMENT_METHOD = 'ADD_PAYMENT_METHOD'
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES'
export const CANCEL_SUBSCRIPTION = 'CANCEL_SUBSCRIPTION'
export const CHANGE_ACCOUNT_TYPE = 'CHANGE_ACCOUNT_TYPE'
export const CHANGE_BUNDLE_TYPE = 'CHANGE_BUNDLE_TYPE'

export interface addPaymentMethodType {
    type: typeof ADD_PAYMENT_METHOD
    paymentMethod: AddNewPaymentMethod.PaymentMethod
}

export interface addProductToFavoritesType {
    type: typeof ADD_TO_FAVORITES
    products: IProduct[]
}

export interface removeProductFromProductsType {
    type: typeof REMOVE_FROM_FAVORITES
    products: IProduct[]
}

export interface LoginAction {
    type: typeof LOGIN
    user_info: IUser
}

export interface LogoutAction {
    type: typeof LOGOUT
}

export interface cancelSubscriptionActionType {
    type: typeof CANCEL_SUBSCRIPTION
}

export interface changeAccountTypeActionType {
    type: typeof CHANGE_ACCOUNT_TYPE,
    accountStatus: AccountStatus
}

export interface changeBundleTypeActionType {
    type: typeof CHANGE_BUNDLE_TYPE
    bundleType: BundleType
}

export type AuthActions =
    LoginAction
    | LogoutAction
    | addPaymentMethodType
    | addProductToFavoritesType
    | removeProductFromProductsType
    | cancelSubscriptionActionType
    | changeAccountTypeActionType
    | changeBundleTypeActionType
