import {AxiosResponse} from 'axios'
import {ProductsAxios} from '../lib'
import {ApiConstants} from '../constants'
import {IProduct} from '../types'

export const getAllProducts = (page: number): Promise<AxiosResponse<GetAllProducts.RootObject>> => {
    return ProductsAxios({
        method: 'GET',
        url: `${ApiConstants.PRODUCTS.GET_ALL_PRODUCTS}?page=${page}`,
    })
}

export declare namespace GetAllProducts {
    export interface RootObject {
        status: 'Success' | 'Failure'
        message: string
        products: IProduct[]
        length: number
        requestTime: Date
    }
}
