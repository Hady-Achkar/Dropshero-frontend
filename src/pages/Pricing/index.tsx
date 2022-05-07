import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {CheckIcon as CheckIconSolid} from '@heroicons/react/solid'
import {Footer, Header, Wrapper} from '../../components'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import {AccountStatus} from '../../types'
import {Link} from 'react-router-dom'
import {GetAllBundles, getAllBundles} from '../../services'
import {handleError} from '../../utils'

const Index = () => {
	const {
		user: {status},
	} = useSelector((state: AppState) => state.auth)
	const [bundles, setBundles] = useState<GetAllBundles.Price[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [hasReferral, setHasReferral] = useState<boolean>(false)
	useEffect(() => {
		//@ts-ignore
		rewardful('ready', function () {
			//@ts-ignore
			if (Rewardful.referral) {
				//@ts-ignore
				setHasReferral(true)
			}
		})
	}, [])
	const fetchBundles = useCallback(() => {
		setLoading(true)
		getAllBundles()
			.then((res) => {
				setBundles(
					res?.data?.prices.filter((item) => item.nickname !== 'upgrade')
				)
				setLoading(false)
			})
			.catch(handleError)
	}, [])
	useEffect(() => {
		fetchBundles()
		return () => fetchBundles()
	}, [])

	//     منتجات جديدة يوميا
	// اعلانات جاهزة
	// وصف جاهز
	// فيديو جاهز
	// تسعير مناسب للمنتج
	// تحديد الزوايا التسويقية
	// دراسة عن السوق و المنافسين

	// ‏Lifetime plan:
	// هذه الخطة هي عرض الافتتاح و سينتهي العرض قريباً

	console.log(bundles)

	return (
		<Fragment>
			<Header />
			<div className="bg-slate-50">
				<div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
					<div className="sm:flex sm:flex-col sm:align-center">
						<h1 className="text-5xl font-extrabold text-gray-900 text-center">
							قائمة العروض
						</h1>
						<p className="mt-5 text-xl text-gray-500 text-center">
							اشترك بواحدة من باقات الاشتراك ووفّر عناء البحث عن منتج و خسارة
							الاموال بتجريب منتج خاسر
						</p>
						<p className="mt-5 text-xl text-gray-500 text-center"></p>
					</div>
					<Wrapper loading={loading}>
						<div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2 pb-8">
							{bundles.map((tier) => (
								<React.Fragment key={tier?.id}>
									{/* @ts-ignore */}
									{tier?.product?.metadata?.main_key === 'production' && (
										<div>
											<div
												className={
													tier?.type === 'one_time'
														? 'border-4 bg-white border-red-400 rounded-lg shadow-sm divide-y divide-gray-200'
														: 'border bg-white border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200'
												}
											>
												<div className="p-6">
													<h2 className="text-2xl text-center leading-6 font-medium text-gray-900">
														{tier?.product.name}
													</h2>

													<p className="mt-8 text-center ">
														<span className="text-xl font-extrabold text-gray-900">
															${tier?.unit_amount / 100}
														</span>
														<span className="text-base font-medium text-gray-500">
															/{tier?.product.unit_label}
														</span>
													</p>
													<form data-rewardful>
														<Link
															to={
																//@ts-ignore
																hasReferral
																	? //@ts-ignore
																	  `/checkout/${tier?.id}?referral=${Rewardful.referral}`
																	: status === AccountStatus.VERIFIED ||
																	  status === AccountStatus.TRIAL
																	? '/products'
																	: `/checkout/${tier?.id}`
															}
															className="mt-8 block w-full bg-gradient-to-r from-green-500 to-green-700 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-green-700"
														>
															المتابعة الى الشراء
														</Link>
													</form>

													<p className="mt-8 text-center ">
														{tier?.recurring === null ? (
															<span className="text-base font-medium text-red-500">
																{/* @ts-ignore */}
																{tier?.product.metadata?.highlight}
															</span>
														) : (
															<br />
														)}
													</p>
												</div>
												<div className="pt-6 pb-8 px-6">
													<h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
														المضمون{' '}
													</h3>
													<ul role="list" className="mt-6 space-y-4">
														{tier?.product.description
															.split('/n')
															.map((feature) => (
																<li
																	key={feature}
																	className="flex items-center space-x-3"
																>
																	<CheckIconSolid
																		className="flex-shrink-0 h-5 w-5 text-green-500"
																		aria-hidden="true"
																	/>
																	<span className="px-2 text-lg text-gray-500">
																		{feature}
																	</span>
																</li>
															))}
													</ul>
												</div>
											</div>
										</div>
									)}
								</React.Fragment>
							))}
						</div>
					</Wrapper>
				</div>
			</div>
			<Footer />
		</Fragment>
	)
}
export default Index
