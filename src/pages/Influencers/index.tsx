import React, {useCallback, useEffect, useState} from 'react'
import {DescriptionModal, Footer, Header} from '../../components'
import {categories} from '../../data/categories'
import {getAllInfluencers, Influencer} from '../../services'
import {DotsCircleHorizontalIcon} from '@heroicons/react/outline'
import {Images, Socials} from '../../constants'
import countries from '../../data/countries'

const Index = () => {
	const [influencersData, setInfluencersData] = useState<Influencer[]>()
	const [filtered, setFiltered] = useState<Influencer[]>()

	const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilters({...filters, [e.target.id]: e.target.value})
	}

	const initFilterState = {
		platform: '',
		category: '',
		language: '',
		country: '',
		followers: '',
	}
	const [filters, setFilters] = useState(initFilterState)
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

	const sortedCountries = countries.sort((a: any, b: any) =>
		a.label > b.label ? 1 : -1
	)

	const socials = ['Youtube', 'Tiktok', 'Instagram', 'Snapchat']
	const languages = ['german', 'english', 'arabic']

	const followersOptions = [
		'0-1K',
		'1K-10K',
		'10K-50K',
		'50K-200K',
		'200K-500K',
		'500K-999K',
		'<1M',
	]
	const [open, setOpen] = useState<boolean>(false)
	return (
		<div lang="en">
			<Header />
			<div
				style={{minHeight: '100vh'}}
				className="px-4 sm:px-6 lg:px-8 font-sans english"
			>
				<div className="grid grid-cols-5 gap-x-5">
					<div className="mt-8 col-span-5 lg:col-span-1 space-y-3 shadow p-4 ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<div>
							<label
								htmlFor="category"
								className="block text-sm font-medium text-gray-700"
							>
								Category
							</label>
							<select
								id="category"
								name="category"
								onChange={handleFilters}
								className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
							>
								<option selected value="">
									All Categories
								</option>
								{categories.map((item) => {
									return (
										<option key={item.label} value={item.value}>
											{item.value.toUpperCase()}
										</option>
									)
								})}
							</select>
						</div>

						<div>
							<label
								htmlFor="language"
								className="block text-sm font-medium text-gray-700"
							>
								Number of Followers
							</label>
							<select
								id="followers"
								name="followers"
								className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
								onChange={handleFilters}
							>
								<option selected value="">
									Any Number
								</option>
								{followersOptions.map((item) => {
									return (
										<option key={item} value={item}>
											{item}
										</option>
									)
								})}
							</select>
						</div>

						<div>
							<label
								htmlFor="language"
								className="block text-sm font-medium text-gray-700"
							>
								Language
							</label>
							<select
								id="language"
								name="language"
								className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
								onChange={handleFilters}
							>
								<option selected value="">
									All Languages
								</option>
								{languages.map((item) => {
									return (
										<option key={item} value={item}>
											{item.toUpperCase()}
										</option>
									)
								})}
							</select>
						</div>
						<div>
							<label
								htmlFor="platform"
								className="block text-sm font-medium text-gray-700"
							>
								Main Platform
							</label>
							<select
								id="platform"
								name="platform"
								className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
								onChange={handleFilters}
							>
								<option selected value="">
									All Platforms
								</option>
								{socials.map((item) => {
									return (
										<option key={item} value={item}>
											{item.toUpperCase()}
										</option>
									)
								})}
							</select>
						</div>
						<div>
							<label
								htmlFor="country"
								className="block text-sm font-medium text-gray-700"
							>
								Countries
							</label>
							<select
								id="country"
								name="country"
								className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
								onChange={handleFilters}
							>
								<option selected value="">
									All Countries
								</option>
								{sortedCountries.map((item) => {
									return (
										<option key={item.code} value={item.label}>
											{item.label}
										</option>
									)
								})}
							</select>
						</div>
						<div className="flex justify-end">
							<button
								onClick={() => setFilters(initFilterState)}
								type="button"
								className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
							>
								Clear all
							</button>
						</div>
					</div>
					<div className="mt-8 col-span-5 lg:col-span-4 flex flex-col">
						<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
								<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
									<table className="min-w-full px-5 lg:px-0 divide-y divide-gray-300">
										<thead className="bg-gray-50 english">
											<tr>
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
												>
													Channel Name
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Category
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Followers
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Language
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Country
												</th>
												<th
													scope="col"
													className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Channels Links
												</th>
												<th
													scope="col"
													className="relative py-3.5 pl-3 pr-4 sm:pr-6"
												>
													<span className="sr-only">Edit</span>
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 bg-white">
											{filtered?.length === 0 && (
												<h1 className="py-4 text-center">
													No influencers match your filters
												</h1>
											)}
											{filtered?.map((item) => (
												<tr key={item._id}>
													<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
														<div className="flex items-center">
															<div className="h-10 w-10 flex-shrink-0">
																<img
																	className="h-10 w-10 rounded-full"
																	src={item.image}
																	alt=""
																/>
															</div>
															<div className="ml-4">
																<div className="font-medium text-gray-900">
																	{item.channelName}
																</div>
																<div className="text-gray-500">
																	{item.platform}
																</div>
															</div>
														</div>
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														<div className="text-gray-500">
															{item.category.toUpperCase()}
														</div>
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
															{item.followers}
														</span>
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														{item.language.toUpperCase()}
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														{item.country.toUpperCase()}
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm mx-auto text-gray-500">
														<div className="flex space-x-2 items-center mx-auto w-full">
															{item?.youtube && item?.youtube !== '' && (
																<a
																	target="_blank"
																	rel="noreferrer"
																	href={item?.youtube}
																>
																	<img
																		alt=""
																		height="20"
																		width="20"
																		src={require('../../assets/socials/youtube.png')}
																	/>
																</a>
															)}
															{item?.snapchat && item?.snapchat !== '' && (
																<a
																	target="_blank"
																	rel="noreferrer"
																	href={item?.snapchat}
																>
																	<img
																		alt=""
																		height="20"
																		width="20"
																		src={require('../../assets/socials/snapchat.png')}
																	/>
																</a>
															)}
															{item?.instagram && item?.instagram !== '' && (
																<a
																	target="_blank"
																	rel="noreferrer"
																	href={item?.instagram}
																>
																	<img
																		alt=""
																		height="20"
																		width="20"
																		src={require('../../assets/socials/instagram.png')}
																	/>
																</a>
															)}
															{item?.tiktok && item?.tiktok !== '' && (
																<a
																	target="_blank"
																	rel="noreferrer"
																	href={item?.tiktok}
																>
																	<img
																		alt=""
																		height="20"
																		width="20"
																		src={require('../../assets/socials/tiktok.png')}
																	/>
																</a>
															)}
														</div>
													</td>
													<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
														<button
															onClick={() => setOpen(true)}
															className="text-green-600 hover:text-green-900"
														>
															View Details
															<span className="sr-only">
																, {item.channelName}
															</span>
														</button>
														<DescriptionModal
															open={open}
															setOpen={setOpen}
															description={item?.description}
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Index
