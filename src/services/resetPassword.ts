import {AxiosResponse} from "axios";
import {AuthAxios} from "../lib";
import {ApiConstants} from "../constants";

export const resetPassword = (password: string, token: string): Promise<AxiosResponse<any>> => {
    return AuthAxios({
        method: 'POST',
        url: ApiConstants.AUTH.RESET_PASSWORD,
        data: {
            password,
            token
        }
    })
}
