import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {InfluencersAxios} from '../lib'

export interface Influencer {
	_id: string
	channelName: string
	description: string
	image: string
	country: string
	platform: string
	category: string
	followers: string
	youtube?: string
	instagram?: string
	snapchat?: string
	tiktok?: string
	language: string
	createdAt: Date
	updatedAt: Date
}

export interface GetAllInfluencersResponse {
	message: string
	influencers: Influencer[]
}

export const getAllInfluencers = (): Promise<
	AxiosResponse<GetAllInfluencersResponse>
> => {
	return InfluencersAxios({
		method: 'GET',
		url: ApiConstants.INFLUENCERS.GET_ALL,
	})
}
