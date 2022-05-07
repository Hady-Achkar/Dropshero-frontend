import {AddNewPaymentMethod} from '../services'
import {IProduct} from "./IProduct";
import {AccountStatus, BundleType, UserState, UserType} from "./enums";


export interface IUser {
    token: string
    fullName: string
    email: string
    _id: string
    type: UserType
    stripeId: string
    paymentMethods: AddNewPaymentMethod.PaymentMethod[]
    subscriptions: any
    inTrial: boolean
    isTrialLegit: boolean
    activeSubscription: string
    status: AccountStatus
    favorites: IProduct[]
    bundleType: BundleType
}
