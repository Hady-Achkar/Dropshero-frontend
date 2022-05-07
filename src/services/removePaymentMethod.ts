import {AxiosResponse} from "axios";
import {PaymentAxios} from "../lib";
import {ApiConstants} from "../constants";

export const removePaymentMethod = (paymentMethodId: string): Promise<AxiosResponse<any>> => {
    return PaymentAxios({
        method: 'DELETE',
        url: ApiConstants.PAYMENTS.REMOVE,
        data: {
            paymentMethodId
        }
    })
}
