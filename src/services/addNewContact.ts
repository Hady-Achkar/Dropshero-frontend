import {AxiosResponse} from "axios";
import UtilAxios from "../lib/UtilAxios";
import {ApiConstants} from "../constants";

export interface IAddNewContact {
    email: string
    message: string
    fullName: string
}

export const addNewContact = (contactData: IAddNewContact): Promise<AxiosResponse<any>> => {
    return UtilAxios({
        method: 'POST',
        url: ApiConstants.UTILS.ADD_CONTACT,
        data: {
            ...contactData
        }
    })
}
