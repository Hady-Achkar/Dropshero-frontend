import axios from 'axios'
import {ApiConstants} from '../constants'

const InfluencersAxios = axios.create({
	baseURL: ApiConstants.INFLUENCERS.BASE_URL,
})

export default InfluencersAxios
