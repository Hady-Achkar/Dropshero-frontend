import {AuthAxios} from '../lib'
import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {Signup} from './Signup'
import {UserType} from "../types";

export const login = async (
    email: string,
    password: string
): Promise<AxiosResponse<Signup.RootObject>> => {
    return AuthAxios({
        method: 'POST',
        url: ApiConstants.AUTH.SIGN_IN,
        data: {
            email,
            password,
        },
    })
}

export const googleLogin = async (
    fname: string,
    lname: string,
    email: string,
): Promise<AxiosResponse<Signup.RootObject>> => {
    return AuthAxios({
        method: 'POST',
        url: ApiConstants.AUTH.GOOGLE_SIGN_IN,
        data: {
            email,
            lname,
            fname,
        },
    })
}


export interface LoginPayload {
    readonly email: string
    readonly password: string
}

