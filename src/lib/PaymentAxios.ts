import axios from 'axios'
import {ApiConstants} from '../constants'

const PaymentAxios = axios.create({
    baseURL: ApiConstants.PAYMENTS.BASE_URL,
})

export default PaymentAxios
