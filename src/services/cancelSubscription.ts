import {GetMyProfile} from "./getMe";
import {AxiosResponse} from "axios";
import {PaymentAxios} from "../lib";
import {ApiConstants} from "../constants";

export const cancelSubscription = (subscriptionId: string): Promise<AxiosResponse<GetMyProfile.RootObject>> => {
    return PaymentAxios({
        method: 'DELETE',
        url: ApiConstants.PAYMENTS.CANCEL_SUBSCRIPTION,
        data: {
            subscriptionId
        }
    })
}
