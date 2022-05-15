import {Dispatch} from 'redux'
import {AppState} from '../reducers'
import {AppActions, DateSortingType, IAddProduct, IProduct} from '../types'
import {getAllProducts, addNewProduct} from '../services'
import {handleError} from '../utils'

export const initializeProducts = (
	products: IProduct[],
	length: number
): AppActions => ({
	type: 'INITIALIZE_ALL_PRODUCTS',
	products,
	length,
})
export const loadState = (): AppActions => ({
	type: 'LOAD_STATE',
})
export const unloadState = (): AppActions => ({
	type: 'UNLOAD_STATE',
})
export const sortCost = (): AppActions => ({
	type: 'SORT_COST',
})
export const sortDate = (flow: DateSortingType): AppActions => ({
	type: 'SORT_DATE',
	flow,
})
export const filterCategory = (category: string): AppActions => ({
	type: 'FILTER_CATEGORY',
	category,
})
export const requestPage = (
	products: IProduct[],
	page: number
): AppActions => ({
	type: 'REQUEST_PRODUCTS_PAGE',
	products,
	page,
})
export const startInitializeProducts = () => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState())
		getAllProducts(0)
			.then((res) => {
				const {products, length} = res.data
				dispatch(initializeProducts(products, length))
				dispatch(unloadState())
			})
			.catch(handleError)
	}
}
export const startRequestPage = (page: number) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		dispatch(loadState())
		getAllProducts(page)
			.then((res) => {
				const {products, length} = res.data
				dispatch(requestPage(products, length))
				dispatch(unloadState())
			})
			.catch(handleError)
	}
}

export const startAddNewProduct = (paylod: IAddProduct) => {
	return (dispatch: Dispatch<AppActions> | any, getState: () => AppState) => {
		dispatch(loadState())
		addNewProduct(paylod)
			.then((res) => {
				const {product} = res.data
				const OLD_PRODUCTS = getState().products.products
				dispatch(
					initializeProducts(
						[...OLD_PRODUCTS, product],
						OLD_PRODUCTS?.length + 1
					)
				)
				dispatch(unloadState())
			})
			.catch(handleError)
	}
}
