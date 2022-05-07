import {AxiosResponse} from "axios";
import {PaymentAxios} from "../lib";
import {ApiConstants} from "../constants";

export const makeDefaultPaymentMethod = (paymentMethodId: string): Promise<AxiosResponse<any>> => {
    return PaymentAxios({
        method: 'PATCH',
        url: ApiConstants.PAYMENTS.MAKE_DEFUALT,
        data: {
            paymentMethodId
        }
    })
}
