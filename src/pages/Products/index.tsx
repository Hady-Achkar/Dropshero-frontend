import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
	startAddToFavorites,
	startInitializeProducts,
	startRemoveFavorites,
	startRequestPage,
} from '../../actions'
import {AppState} from '../../reducers'
import {Link} from 'react-router-dom'
import {Footer, Header} from '../../components'
import Filters from './Filters'
import {Socials} from '../../constants'
import moment from 'moment'
import {categories} from '../../data/categories'
import 'moment/locale/ar'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid'
import {log} from 'util'
import classNames from 'classnames'
import {useHistory} from 'react-router-dom'

const Index = () => {
	const dispatch = useDispatch()
	const fetchProducts = useCallback(() => {
		dispatch(startInitializeProducts())
	}, [])
	useEffect(() => {
		fetchProducts()
		return () => fetchProducts()
	}, [])
	const {products, loading, page, length} = useSelector(
		(state: AppState) => state.products
	)
	const findImage = useCallback(
		(item: string) => Socials.find((i) => i.name == item)?.src,
		[]
	)

	const {
		user: {favorites},
	} = useSelector((state: AppState) => state.auth)

	const isFavorite = (productId: string) => {
		return favorites.find((element) => element._id === productId)
	}

	const findCategory = (item: string) => {
		return categories.find((i) => i.value == item)?.label
	}
	const handlePagination = (page: number) => {
		window.scrollTo(0, 0)
		dispatch(startRequestPage(page))
	}
	const renderPagination = () => {
		const mapLength = Math.ceil(length / 10)
		console.log(mapLength)
		let a = new Array(mapLength)
		for (let i = 0; i < mapLength; ++i) a[i] = 0
		return a.map((item, index) => {
			return (
				<button
					key={index}
					onClick={() => handlePagination(index)}
					aria-current="page"
					className={classNames(
						'z-10  border-green-500 text-green-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium',
						page === index && 'bg-green-50'
					)}
				>
					{index + 1}
				</button>
			)
		})
	}

	const history = useHistory()
	return (
		<div>
			<Header />
			<Filters />
			<div className="min-h-screen max-w-7xl mx-auto my-4">
				{products.length === 0 && (
					<div className="w-full flex justify-center items-center">
						<div className="text-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="mx-auto h-12 w-12 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							<h3 className="mt-2 text-2xl font-medium text-gray-900">
								لا يوجد منتجات بالتصنيف الذي اخترته
							</h3>
							<button
								onClick={() => dispatch(startInitializeProducts())}
								className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md bg-green-600 text-white hover:bg-green-700"
							>
								رؤية جميع المنتجات{' '}
							</button>
						</div>
					</div>
				)}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-3 ">
					{products.length > 0 &&
						products?.map((product) => {
							return (
								<div
									key={product._id}
									className={
										product.isHot
											? 'p-1 mx-auto max-w-screen-sm bg-gradient-to-r from-yellow-400 via-orange-500  to-red-600 rounded'
											: ' h-full'
									}
								>
									<div className="max-w-sm w-full lg:max-w-full lg:flex space-y-3 shadow shadow-gray-200 mx-auto bg-slate-50">
										<div
											className="h-48 lg:h-auto lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-r text-center overflow-hidden cursor-pointer"
											style={{backgroundImage: `url('${product?.thumbnail}')`}}
											title="Woman holding a mug"
											onClick={() =>
												history.push(
													`/product/${product._id.slice(
														product?._id.length - 6
													)}`
												)
											}
										/>
										<div className="w-full  bg-slate-50 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
											<div className="mb-8">
												{product.isHot ? (
													<div className="inline-flex px-2 py-1 items-center text-xs mb-2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500  to-red-600 flex-shrink">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-5 w-5 text-white"
															viewBox="0 0 20 20"
															fill="currentColor"
														>
															<path
																fillRule="evenodd"
																d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
												) : (
													<div style={{height: '42px'}} />
												)}
												<div className="flex justify-between mb-1">
													<p className="text-sm text-gray-500 flex items-center">
														<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
															{findCategory(product?.category)}
														</span>
													</p>{' '}
													<p className="text-sm text-gray-500 flex items-center">
														{!isFavorite(product?._id) ? (
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5 hover:scale-110 cursor-pointer text-gray-500"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
																onClick={() =>
																	dispatch(startAddToFavorites(product?._id))
																}
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
																/>
															</svg>
														) : (
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-5 w-5 hover:scale-110 cursor-pointer text-red-500"
																viewBox="0 0 20 20"
																fill="currentColor"
																onClick={() =>
																	dispatch(startRemoveFavorites(product?._id))
																}
															>
																<path
																	fillRule="evenodd"
																	d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
																	clipRule="evenodd"
																/>
															</svg>
														)}
													</p>
												</div>

												<div className="text-gray-800 font-medium text-md my-2 truncate">
													{product?.title}
												</div>
												<div className="space-y-2">
													<div className="grid grid-cols-2">
														<div className="text-sm  text-gray-700">
															سعر الشراء
														</div>
														<div className="text-sm text-red-600 ">
															{product?.price?.cost?.min.toFixed(2)}$ -{' '}
															{product?.price?.cost?.max.toFixed(2)}$
														</div>
													</div>
													<div className="grid grid-cols-2">
														<div className="text-sm text-gray-700">
															سعر البيع
														</div>
														<div className="text-sm text-gray-700">
															{product?.price?.selling?.min.toFixed(2)}$ -{' '}
															{product?.price?.selling?.max.toFixed(2)}$
														</div>
													</div>
													<div className="grid grid-cols-2">
														<div className="text-sm text-gray-700">
															الربح الصافي
														</div>
														<div className="text-sm text-green-700">
															{(
																product.price.selling.min -
																product.price.cost.min
															).toFixed(2)}
															$ -{' '}
															{(
																product.price.selling.max -
																product.price.cost.max
															).toFixed(2)}
															$
														</div>
													</div>
												</div>
												<div className="grid grid-cols-8 space-x-2 pt-3 gap-y-2">
													{product?.whereToSell?.map((item, index) => {
														return (
															<img
																key={index}
																height="32"
																width="32"
																src={findImage(item)}
																alt=""
															/>
														)
													})}
												</div>
											</div>

											<div className="flex items-center">
												<Link
													to={`/product/${product._id.slice(
														product?._id.length - 6
													)}`}
													className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
												>
													تفاصيل المنتج
												</Link>
											</div>
										</div>
									</div>
								</div>
							)
						})}
				</div>
			</div>

			<div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
				<div className="flex-1 flex justify-center sm:hidden">
					{Math.ceil(length / 10) === 0 ? (
						<button
							aria-current="page"
							className="z-10 bg-green-50 border-green-500 text-green-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
						>
							1
						</button>
					) : (
						renderPagination()
					)}
				</div>
				<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
					<div>
						<p className="text-sm text-gray-700">
							عرض <span className="font-medium">{products?.length}</span> من{' '}
							<span className="font-medium">{length}</span> نتائج
						</p>
					</div>
					<div>
						<nav
							className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
							aria-label="Pagination"
						>
							{/* Current: "z-10 bg-green-50 border-green-500 text-green-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

							{Math.ceil(length / 10) === 0 ? (
								<button
									aria-current="page"
									className="z-10 bg-green-50 border-green-500 text-green-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
								>
									1
								</button>
							) : (
								renderPagination()
							)}
						</nav>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default Index
