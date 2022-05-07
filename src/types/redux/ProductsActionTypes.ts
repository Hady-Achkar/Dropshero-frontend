import {IProduct} from "../IProduct";
import {DateSortingType} from "../enums";


export const INITIALIZE_ALL_PRODUCTS = 'INITIALIZE_ALL_PRODUCTS'
export const LOAD_STATE = 'LOAD_STATE'
export const UNLOAD_STATE = 'UNLOAD_STATE'
export const SORT_COST = 'SORT_COST'
export const SORT_DATE = 'SORT_DATE'
export const FILTER_CATEGORY = 'FILTER_CATEGORY'
export const REQUEST_PRODUCTS_PAGE = 'REQUEST_PRODUCTS_PAGE'

export interface initializeProductActionType {
    type: typeof INITIALIZE_ALL_PRODUCTS
    products: IProduct[]
    length: number
}

export interface requestPageActionType {
    type: typeof REQUEST_PRODUCTS_PAGE
    products: IProduct[]
    page: number
}

export interface loadStateActionType {
    type: typeof LOAD_STATE
}

export interface unloadStateActionType {
    type: typeof UNLOAD_STATE
}

export interface sortCostActionType {
    type: typeof SORT_COST
}

export interface sortDateActionType {
    type: typeof SORT_DATE
    flow: DateSortingType
}

export interface filterCategoryActionType {
    type: typeof FILTER_CATEGORY
    category: string
}

export type ProductActions =
    initializeProductActionType
    | loadStateActionType
    | unloadStateActionType
    | sortCostActionType
    | sortDateActionType
    | filterCategoryActionType
    | requestPageActionType
