import {AxiosResponse} from "axios";
import {PaymentAxios} from "../lib";
import {ApiConstants} from "../constants";

export const upgradeSub = (promoId: string = ''): Promise<AxiosResponse<UpgradeSub.RootObject>> => {
    return PaymentAxios({
        method: 'PUT',
        url: ApiConstants.PAYMENTS.UPGRADE_SUB,
        data: {
            coupon: promoId
        }
    })
}

export declare namespace UpgradeSub {

    export interface User {
        favoriteProducts: any[];
        status: string;
        _id: string;
        email: string;
        fname: string;
        lname: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
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

