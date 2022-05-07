import axios from 'axios'
import {ApiConstants} from '../constants'

const AuthAxios = axios.create({
    baseURL: ApiConstants.AUTH.BASE_URL,
})

export default AuthAxios
