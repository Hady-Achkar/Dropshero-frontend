import {AxiosResponse} from "axios";
import {UsersAxios} from "../lib";
import {ApiConstants} from "../constants";

interface IEditProfile {
    fname: string
    lname: string
    password?: string
}

export const editProfile = (profileData:IEditProfile): Promise<AxiosResponse<any>> => {
    return UsersAxios({
        method: 'PUT',
        url: ApiConstants.USERS.EDIT_PROFILE,
        data: {
            ...profileData
        }
    })
}
