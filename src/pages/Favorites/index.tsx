import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
	startAddToFavorites,
	startInitializeProducts,
	startRemoveFavorites,
} from '../../actions'
import {AppState} from '../../reducers'
import {Link} from 'react-router-dom'
import {Footer, Header} from '../../components'
import {Socials} from '../../constants'
import moment from 'moment'
import {categories} from '../../data/categories'

const Index = () => {
	const dispatch = useDispatch()
	const fetchProducts = useCallback(() => {
		dispatch(startInitializeProducts())
	}, [])
	useEffect(() => {
		fetchProducts()
		return () => fetchProducts()
	}, [])
	const {products, loading} = useSelector((state: AppState) => state.products)
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
		return categories.find((i) => i.value == item.toLowerCase())?.label
	}
	return (
		<div>
			<Header />
			<div className="min-h-screen max-w-7xl mx-auto my-4">
				{favorites.length === 0 && (
					<div className="w-full flex justify-center items-center">
						<div className="text-center">
							<h3 className="my-2 text-2xl font-medium text-gray-900">
								ليس لديك منتجات مفضلة حتى الآن
							</h3>
							<Link
								to="/products"
								className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md bg-green-600 text-white hover:bg-green-700"
							>
								  رؤية جميع المنتجات{' '}
							</Link>
						</div>
					</div>
				)}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-3 ">
					{favorites.length > 0 &&
						favorites?.map((product) => {
							return (
								<div
									key={product._id}
									className="max-w-sm w-full lg:max-w-full lg:flex space-y-3 shadow shadow-gray-200 mx-auto bg-slate-50"
								>
									<div
										className="h-48 lg:h-auto lg:w-64 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-r text-center overflow-hidden"
										style={{backgroundImage: `url('${product?.thumbnail}')`}}
										title="Woman holding a mug"
									/>
									<div className="w-full  bg-slate-50 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
										<div className="mb-8">
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
														{product?.price?.cost?.min}$ -{' '}
														{product?.price?.cost?.max}$
													</div>
												</div>
												<div className="grid grid-cols-2">
													<div className="text-sm text-gray-700">سعر البيع</div>
													<div className="text-sm text-gray-700">
														{product?.price?.selling?.min}$ -{' '}
														{product?.price?.selling?.max}$
													</div>
												</div>
												<div className="grid grid-cols-2">
													<div className="text-sm text-gray-700">
														الربح الصافي
													</div>
													<div className="text-sm text-green-700">
														{product?.price?.profit?.min.toFixed(2)}$ -{' '}
														{product?.price?.profit?.max.toFixed(2)}$
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
											<div className="py-1 text-sm text-gray-600">
												تمت اضافة المنتج بتاريخ:{' '}
												<span>
													{moment(product.createdAt).format('DD/MM/YY hh:mm')}
												</span>
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
							)
						})}
				</div>
			</div>

			<Footer />
		</div>
	)
}
export default Index
