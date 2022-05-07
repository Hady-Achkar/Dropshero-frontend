import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {AuthAxios} from '../lib'
import {AccountStatus, UserType, BundleType, IProduct} from '../types'

export declare namespace Signup {
    export interface AutomaticTax {
        enabled: boolean
    }

    export interface Metadata {
    }

    export interface Metadata2 {
    }

    export interface Plan {
        id: string
        object: string
        active: boolean
        aggregate_usage?: any
        amount: number
        amount_decimal: string
        billing_scheme: string
        created: number
        currency: string
        interval: string
        interval_count: number
        livemode: boolean
        metadata: Metadata2
        nickname?: any
        product: string
        tiers_mode?: any
        transform_usage?: any
        trial_period_days: number
        usage_type: string
    }

    export interface Metadata3 {
    }

    export interface Recurring {
        aggregate_usage?: any
        interval: string
        interval_count: number
        trial_period_days: number
        usage_type: string
    }

    export interface Price {
        id: string
        object: string
        active: boolean
        billing_scheme: string
        created: number
        currency: string
        livemode: boolean
        lookup_key?: any
        metadata: Metadata3
        nickname?: any
        product: string
        recurring: Recurring
        tax_behavior: string
        tiers_mode?: any
        transform_quantity?: any
        type: string
        unit_amount: number
        unit_amount_decimal: string
    }

    export interface Datum {
        id: string
        object: string
        billing_thresholds?: any
        created: number
        metadata: Metadata
        plan: Plan
        price: Price
        quantity: number
        subscription: string
        tax_rates: any[]
    }

    export interface Items {
        object: string
        data: Datum[]
        has_more: boolean
        total_count: number
        url: string
    }

    export interface Metadata4 {
    }

    export interface PaymentSettings {
        payment_method_options?: any
        payment_method_types?: any
    }

    export interface Metadata5 {
    }

    export interface Plan2 {
        id: string
        object: string
        active: boolean
        aggregate_usage?: any
        amount: number
        amount_decimal: string
        billing_scheme: string
        created: number
        currency: string
        interval: string
        interval_count: number
        livemode: boolean
        metadata: Metadata5
        nickname?: any
        product: string
        tiers_mode?: any
        transform_usage?: any
        trial_period_days: number
        usage_type: string
    }

    export interface Subscription {
        id: string
        object: string
        application_fee_percent?: any
        automatic_tax: AutomaticTax
        billing_cycle_anchor: number
        billing_thresholds?: any
        cancel_at?: any
        cancel_at_period_end: boolean
        canceled_at?: any
        collection_method: string
        created: number
        current_period_end: number
        current_period_start: number
        customer: string
        days_until_due?: any
        default_payment_method?: any
        default_source?: any
        default_tax_rates: any[]
        discount?: any
        ended_at?: any
        items: Items
        latest_invoice: string
        livemode: boolean
        metadata: Metadata4
        next_pending_invoice_item_invoice?: any
        pause_collection?: any
        payment_settings: PaymentSettings
        pending_invoice_item_interval?: any
        pending_setup_intent: string
        pending_update?: any
        plan: Plan2
        quantity: number
        schedule?: any
        start_date: number
        status: string
        transfer_data?: any
        trial_end: number
        trial_start: number
    }

    export interface RootObject {
        status: string
        message: string
        token: string
        fullName: string
        email: string
        _id: string
        type: UserType
        stripeId: string
        paymentMethods: any[]
        subscriptions: Subscription[]
        inTrial: boolean
        isTrialLegit: boolean
        activeSubscription: string
        accountStatus: AccountStatus
        favorites: IProduct[]
        bundleType: BundleType
        requestTime: Date
    }
}

export interface SignupPayload {
    fname: string
    lname: string
    email: string
    password: string
    referral?: string
}

export const signup = async (
    payload: SignupPayload
): Promise<AxiosResponse<Signup.RootObject>> => {
    const {fname, lname, email, password, referral} = payload
    return AuthAxios({
        method: 'POST',
        url: ApiConstants.AUTH.SIGNUP,
        data: {
            email,
            lname,
            fname,
            password,
            referral,
        },
    })
}
