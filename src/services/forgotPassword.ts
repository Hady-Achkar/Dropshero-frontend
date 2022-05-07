import {AxiosResponse} from "axios";
import {AuthAxios} from "../lib";
import {ApiConstants} from "../constants";

export const forgotPassword = (email: string): Promise<AxiosResponse<any>> => {
    return AuthAxios({
        method: 'POST',
        url: ApiConstants.AUTH.FORGOT_PASSWORD,
        data: {
            email
        }
    })
}
