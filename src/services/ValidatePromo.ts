import {AxiosResponse} from "axios";
import {PaymentAxios} from "../lib";
import {ApiConstants} from "../constants";

export const validatePromo = (promo: string): Promise<AxiosResponse<any>> => {
    return PaymentAxios({
        method: 'GET',
        url: `${ApiConstants.PAYMENTS.VALIDATE_PROMO}?promoCode=${promo}`
    })
}
