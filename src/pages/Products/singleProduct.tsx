import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import {startInitializeProducts} from '../../actions'
import {IProduct} from '../../types'
import {AddToFavorites, Footer, Header} from '../../components'
import {Disclosure, Tab} from '@headlessui/react'
import {MinusSmIcon, PlusSmIcon} from '@heroicons/react/outline'
import {Socials} from '../../constants'
import ReactPlayer from 'react-player'

type Params = {
	productId: string
}

//@ts-ignore
function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const Index = () => {
	const {productId} = useParams<Params>()
	const history = useHistory()
	const {products: StateProducts} = useSelector(
		(state: AppState) => state.products
	)
	const [product, setProduct] = useState<IProduct>()
	const dispatch = useDispatch()
	const fetchProduct = useCallback(() => {
		dispatch(startInitializeProducts())
		const productHolder = StateProducts.find(
			(item) => item._id.slice(item?._id.length - 6) === productId
		)
		if (!productHolder) {
			history.push('/404')
		} else {
			setProduct(productHolder)
		}
	}, [productId])
	useEffect(() => {
		if (!productId) {
			history.push('/404')
		} else {
			fetchProduct()
		}
		return () => fetchProduct()
	}, [productId])

	const findImage = (item: string) => {
		return Socials.find((i) => i.name == item)?.src
	}
	return (
		<Fragment>
			<Header />
			<div className="bg-white">
				<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
					<div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
						<div className="flex flex-col">
							<img
								src={product?.thumbnail}
								alt={`${product?.title}-Dropshero`}
								className="w-full h-full object-center object-cover sm:rounded-lg shadow-sm"
							/>
						</div>
						{/* Product info */}
						<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
							<AddToFavorites productId={product?._id || ''} />
							<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mt-8">
								{product?.title}
							</h1>
							<div className={'mt-3 bg-slate-50 shadow rounded-xl px-3'}>
								<h2 className="sr-only">Product information</h2>
								<ul>
									<li
										className={'grid grid-cols-2 text-base text-gray-900  py-3'}
									>
										<span>سعر البيع</span>
										<span className="font-sans">
											${product?.price?.selling?.min?.toFixed(2)} ~ $
											{product?.price?.selling?.max?.toFixed(2)}
										</span>
									</li>
									<li
										className={'grid grid-cols-2 text-base text-red-700  py-3'}
									>
										<span>سعر الشراء </span>
										<span className="font-sans">
											${product?.price?.cost?.min?.toFixed(2)} ~ $
											{product?.price?.cost?.max?.toFixed(2)}
										</span>
									</li>

									<li
										className={'grid grid-cols-2 text-base text-green-600 py-3'}
									>
										<span>الربح الصافي</span>
										{product?.price && (
											<span className="font-sans">
												{(
													product.price.selling.min - product.price.cost.min
												).toFixed(2)}
												$ -{' '}
												{(
													product.price.selling.max - product.price.cost.max
												).toFixed(2)}
												$
											</span>
										)}
									</li>
								</ul>
							</div>
							<section className="my-6">
								<div>
									<h3>
										<span
											className={classNames(
												'text-sm font-medium text-gray-900'
											)}
										>
											 منصات الترويج للمنتج
										</span>
									</h3>
									<div className="grid grid-cols-3 gap-3 mt-6">
										{product?.whereToSell.map((item) => (
											<div key={item}>
												<img
													src={findImage(item)}
													height="24"
													width="24"
													className="inline-flex mx-2"
												/>
												{item}
											</div>
										))}
									</div>
								</div>
							</section>

							{/* Description */}
							<section className="mt-4 ">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															وصف المنتج
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel as="div" className="pb-6">
													 
													<div
														dangerouslySetInnerHTML={{
															//@ts-ignore
															__html: product?.description,
														}}
													/>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							<section className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															النص الاعلاني
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel
													as="div"
													className="pb-6 prose prose-sm"
												>
													 
													<div
														dangerouslySetInnerHTML={{
															//@ts-ignore
															__html: product?.advertisementText,
														}}
													/>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							<section className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															الجمهور المستهدف
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel
													as="div"
													className="pb-6 prose prose-sm"
												>
													 
													<div
														dangerouslySetInnerHTML={{
															//@ts-ignore
															__html: product?.targets,
														}}
													/>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							<section aria-labelledby="details-heading" className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															دراسة المنافسين
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel
													as="div"
													className="pb-6 prose prose-sm"
												>
													 
													<div
														dangerouslySetInnerHTML={{
															//@ts-ignore
															__html: product?.competitorLinks,
														}}
													/>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							<section aria-labelledby="details-heading" className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															الزاوية التسويقية
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel
													as="div"
													className="pb-6 prose prose-sm"
												>
													<ul className="space-y-2">
														{product?.marketingAngel.map((item, index) => {
															return (
																<li key={index}>
																	<p>{item}</p>
																</li>
															)
														})}
													</ul>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							<section aria-labelledby="details-heading" className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															فيديوهات المنتج
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel
													as="div"
													className="pb-6 prose prose-sm"
												>
													<ul className="space-y-2">
														{product?.marketingVideo.map((item, index) => {
															return (
																<li key={index}>
																	<ReactPlayer
																		url={item}
																		width="100%"
																		height="auto"
																	/>
																</li>
															)
														})}
													</ul>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							{/*Supplier links*/}
							<section className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															روابط الموردين
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel
													as="div"
													className="pb-6 prose prose-sm"
												>
													<ul role="list">
														{product?.supplierLinks.map((item, index) => (
															<li className="px-2 text-base " key={item}>
																<a
																	target="_blank"
																	className="text-blue-700"
																	href={item}
																	rel="noreferrer"
																>
																	الرابط {index + 1}
																</a>
															</li>
														))}
													</ul>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							{/* <section className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															روابط الموردين
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel
													as="div"
													className="pb-6 prose prose-sm"
												>
													<a href={product?.ratings}>
														حمل التعليقات بصيغة اكسل من هنا
													</a>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section> */}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</Fragment>
	)
}
export default Index
