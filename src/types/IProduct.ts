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

export interface IProduct {
	_id: string
	title: string
	thumbnail: string
	description: string
	price: Price
	marketingVideo: string[]
	category: string
	ratings: string
	marketingAngel: string[]
	competitorLinks: string
	advertisementText: string
	targets: string
	supplierLinks: string[]
	whereToSell: string[]
	isHot: false
	createdAt: Date
}
