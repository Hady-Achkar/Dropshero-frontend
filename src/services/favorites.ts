import {AxiosResponse} from 'axios'
import {ProductsAxios, UsersAxios} from '../lib'
import {ApiConstants} from '../constants'
import {IProduct} from '../types'

export const addNewFavoriteProduct = (
	productId: string
): Promise<AxiosResponse<AddRemoveFavoriteProduct.RootObject>> => {
	return UsersAxios({
		method: 'POST',
		url: `${ApiConstants.USERS.ADD_NEW_FAVORITE_PRODUCT}?productId=${productId}`,
	})
}

export const removeFavoriteProduct = (
	productId: string
): Promise<AxiosResponse<AddRemoveFavoriteProduct.RootObject>> => {
	return UsersAxios({
		method: 'DELETE',
		url: `${ApiConstants.USERS.DELETE_FAVORITE_PRODUCT}?productId=${productId}`,
	})
}

export declare namespace AddRemoveFavoriteProduct {
	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string
		favorites: IProduct[]
		requestTime: Date
	}
}
