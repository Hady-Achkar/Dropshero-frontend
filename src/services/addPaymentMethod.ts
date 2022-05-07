import {PaymentAxios} from '../lib'
import {ApiConstants} from '../constants'
import {AxiosResponse} from 'axios'

export const addPaymentMethod = (paymentMethodId: string): Promise<AxiosResponse<AddNewPaymentMethod.RootObject>> => {
    return PaymentAxios({
        method: 'POST',
        url: ApiConstants.PAYMENTS.ADD_NEW_PAYMENT_METHOD,
        data: {
            paymentMethodId,
        },
    })
}
export declare namespace AddNewPaymentMethod {

    export interface Address {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
    }

    export interface BillingDetails {
        address: Address;
        email: string;
        name: string;
        phone?: any;
    }

    export interface Checks {
        address_line1_check: string;
        address_postal_code_check: string;
        cvc_check: string;
    }

    export interface Networks {
        available: string[];
        preferred?: any;
    }

    export interface ThreeDSecureUsage {
        supported: boolean;
    }

    export interface Card {
        brand: string;
        checks: Checks;
        country: string;
        exp_month: number;
        exp_year: number;
        fingerprint: string;
        funding: string;
        generated_from?: any;
        last4: string;
        networks: Networks;
        three_d_secure_usage: ThreeDSecureUsage;
        wallet?: any;
    }

    export interface Metadata {
        _id: string;
    }

    export interface PaymentMethod {
        id: string;
        object: string;
        billing_details: BillingDetails;
        card: Card;
        created: number;
        customer: string;
        livemode: boolean;
        metadata: Metadata;
        type: string;
    }

    export interface RootObject {
        status: 'Success' | 'Failure';
        message: string;
        paymentMethod: PaymentMethod;
        requestTime: Date;
    }

}

