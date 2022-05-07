import {IAddProduct, IProduct} from '../types'
import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ProductsAxios} from '../lib'

export declare namespace AddNewProduct {
    export interface Cost {
        _id: string
        min: number
        max: number
        createdAt: Date
        updatedAt: Date
    }

    export interface Selling {
        _id: string
        min: number
        max: number
        createdAt: Date
        updatedAt: Date
    }

    export interface Profit {
        _id: string
        min: number
        max: number
        createdAt: Date
        updatedAt: Date
    }

    export interface Price {
        _id: string
        cost: Cost
        selling: Selling
        createdAt: Date
        updatedAt: Date
        profit: Profit
    }


    export interface RootObject {
        status: 'Success' | 'Failure'
        message: string
        product: IProduct
        requestTime: Date
    }
}

export const addNewProduct = async (
    payload: IAddProduct
): Promise<AxiosResponse<AddNewProduct.RootObject>> => {
    return ProductsAxios({
        method: 'POST',
        url: ApiConstants.PRODUCTS.ADD_NEW_PRODUCT,
        data: payload,
    })
}
