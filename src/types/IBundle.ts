export interface IBundle {
	bundleId: string
	name: string
	description?: string
	price: number
	type: 'مرة واحدة' | 'شهريا'
	features?: string[]
}
