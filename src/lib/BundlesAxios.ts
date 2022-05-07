import axios from 'axios'
import {ApiConstants} from '../constants'

const BundlesAxios = axios.create({
    baseURL: ApiConstants.BUNDLES.BASE_URL,
})

export default BundlesAxios
