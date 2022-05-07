import {PaymentAxios} from "../lib";
import {ApiConstants} from "../constants";
import {AxiosResponse} from "axios";

export const subscribe = (priceId: string, paymentMethodId: string = '1', coupon: string = ''): Promise<AxiosResponse<Subscribe.RootObject>> => {
    return PaymentAxios({
        method: 'POST',
        url: `${ApiConstants.PAYMENTS.SUBSCRIBE}?priceId=${priceId}`,
        data: {
            paymentMethodId,
            coupon
        }
    })
}

export declare namespace Subscribe {

    export interface User {
        favoriteProducts: any[];
        status: string;
        _id: string;
        email: string;
        password: string;
        fname: string;
        lname: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        inTrial: boolean;
        isTrialLegit: boolean;
        stripeId: string;
        activeSubscription: string;
        activePrice: string;
        bundleType: string;
    }

    export interface RootObject {
        status: 'Success' | 'Failure';
        message: string;
        user: User;
        requestTime: Date;
    }

}

