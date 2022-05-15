import React, {useCallback, useEffect, useState} from 'react'
import {Footer, Header} from '../../components'
import {categories} from '../../data/categories'
import {getAllInfluencers, Influencer} from '../../services'

const Index = () => {
	const [influencersData, setInfluencersData] = useState<Influencer[]>()
	const [filtered, setFiltered] = useState<Influencer[]>()

	const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilters({...filters, [e.target.id]: e.target.value})
	}

	const [filters, setFilters] = useState({
		platform: '',
		category: '',
		language: '',
	})
	const fetchData = useCallback(() => {
		getAllInfluencers()
			.then((res) => {
				setInfluencersData(res?.data?.influencers)
				setFiltered(res?.data?.influencers)
			})

			.catch((err) => {
				console.log(err)
			})
	}, [])
	// useEffect(() => {
	// 	const {category, platform} = filters
	// 	if (category === '' && platform === '') {
	// 		fetchData()
	// 		console.log('im here?')
	// 	}
	// 	if (category !== '' && platform === '') {
	// 		setFiltered(influencersData)
	// 		console.log('category not empty')
	// 		setFiltered((data) => data?.filter((item) => item.category === category))
	// 	}
	// 	if (platform !== '' && category === '') {
	// 		setFiltered(influencersData)

	// 		console.log('platform not empty')
	// 		setFiltered((data) => data?.filter((item) => item.platform === platform))
	// 	}
	// 	if (platform !== '' && category !== '') {
	// 		setFiltered(influencersData)

	// 		console.log('platform not empty')
	// 		setFiltered((data) =>
	// 			data?.filter(
	// 				(item) => item.platform === platform && item.category === category
	// 			)
	// 		)
	// 	}
	// }, [fetchData, filters, setFilters])

	if (Object.values(filters).every((item) => item === '')) {
		console.log('all values empty')
	}
	Object.entries(filters).forEach(([key, value]) => {
		if (value === '') {
			console.log(`${value} of ${key} is empty`)
		} else {
			console.log(`${value} of ${key} is full`)
		}
	})

	useEffect(() => {
		if (Object.values(filters).every((item) => item === '')) {
			return fetchData()
		} else {
			setFiltered(influencersData)
			Object.entries(filters).forEach(([key, value]) => {
				if (value !== '') {
					return setFiltered((data) =>
						//@ts-ignore
						data?.filter((item) => item[key] === value)
					)
				}
			})
		}
	}, [fetchData, filters, setFilters])

	console.log(filtered)

	const socials = ['youtube', 'tiktok', 'instagram', 'snapchat']
	const languages = ['german', 'english', 'arabic']

	return (
		<div className="h-full">
			<Header />
			<div className="max-w-7xl mx-auto">INFLUENCERS</div>

			<select id="category" onChange={handleFilters}>
				{categories.map((item) => {
					return (
						<option key={item.label} value={item.value}>
							{item.label}
						</option>
					)
				})}
			</select>
			<select id="platform" onChange={handleFilters}>
				{socials.map((item) => {
					return (
						<option key={item} value={item}>
							{item}
						</option>
					)
				})}
			</select>
			<select id="language" onChange={handleFilters}>
				{languages.map((item) => {
					return (
						<option key={item} value={item}>
							{item}
						</option>
					)
				})}
			</select>
			{filtered &&
				filtered?.map((item) => (
					<div className="flex " key={item?._id}>
						<h1>{item?.platform}</h1>
						<h1>{item?.category}</h1>
					</div>
				))}
			<Footer />
		</div>
	)
}

export default Index
