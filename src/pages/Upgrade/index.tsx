//@ts-nocheck
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {
	ErrorToast,
	Footer,
	Header,
	SuccessToast,
	Wrapper,
} from '../../components'
import {
	getAllBundles,
	getMyProfile,
	GetSingleBundle,
	upgradeSub,
	validatePromo,
} from '../../services'
import {changeAccountType, changeBundleType} from '../../actions'
import {useDispatch} from 'react-redux'
import {AccountStatus, BundleType, IPromo} from '../../types'
import {CheckCircleIcon} from '@heroicons/react/outline'
import {handleError} from '../../utils'

const Checkout = () => {
	const [successOpen, setSuccessOpen] = useState<boolean>(false)
	const [errorOpen, setErrorOpen] = useState<boolean>(false)
	const [termsErrorOpen, setTermsErrorOpen] = useState<boolean>(false)

	const history = useHistory()
	const [loading, setLoading] = useState<boolean>(false)
	const [bundle, setBundle] = useState<GetSingleBundle.Prices>()
	const [recurring, setRecurring] = useState<GetSingleBundle.Prices>()
	const [isAcceptChecked, setIsAcceptChecked] = useState<boolean>(false)
	const refTermsDiv = useRef()
	const dispatch = useDispatch()

	const handleSubmit = useCallback(() => {
		if (!isAcceptChecked) {
			//@ts-ignore
			refTermsDiv.current.focus()
			setTermsErrorOpen(true)
		} else {
			upgradeSub(promoData.id)
				.then((res) => {
					dispatch(changeBundleType(res?.data?.user?.bundleType as BundleType))
				})
				.catch(handleError)
		}
	}, [isAcceptChecked])
	const fetchBundles = useCallback(() => {
		setLoading(true)
		getAllBundles()
			.then((res) => {
				getMyProfile()
					.then((response) => {
						const {invoices} = response.data.user
						const latestInvoiceData = invoices.data[invoices.data.length - 1]
						setLatestInvoice(latestInvoiceData.amount_paid)
						const lifeTimeBundle = res?.data?.prices.find(
							(item) => item.nickname === 'one_time'
						)
						const recurringBundle = res?.data?.prices?.find(
							(item) => item.nickname === 'monthly'
						)
						setRecurring(recurringBundle)
						setBundle(lifeTimeBundle)
						setLoading(false)
					})
					.catch(handleError)
			})
			.catch(handleError)
	}, [])
	const [promo, setPromo] = useState<string>('')
	const [promoSuccessOpen, setPromoSuccessOpen] = useState<boolean>(false)
	const [promoErrorOpen, setPromoErrorOpen] = useState<boolean>(false)
	const [promoApplied, setPromoApplied] = useState<boolean>(false)
	const [promoAmountDiscounted, setPromoAmountDiscounted] = useState<number>(0)
	const [latestInvoice, setLatestInvoice] = useState<number>(0)
	const [promoData, setPromoData] = useState<IPromo>({
		id: '',
		object: '',
		amount_off: 0,
		created: 0,
		currency: '',
		duration: '',
		duration_in_months: 0,
		livemode: false,
		max_redemptions: 0,
		metadata: {},
		name: '',
		percent_off: 0,
		times_redeemed: 0,
		valid: false,
	})
	const handleVerifyPromo = useCallback(() => {
		setLoading(true)
		validatePromo(promo)
			.then((res) => {
				if (res.data.coupon) {
					const {coupon} = res.data
					setPromoApplied(true)
					setPromoData(coupon)
					setPromoSuccessOpen(true)
					setPromoAmountDiscounted(
						bundle!.unit_amount * (coupon.percent_off / 100)
					)
				} else {
					setPromoApplied(false)
					setPromoErrorOpen(true)
				}
				setLoading(false)
			})
			.catch(handleError)
	}, [promo])
	useEffect(() => {
		fetchBundles()
		return () => fetchBundles()
	}, [])
	return (
		<Fragment>
			<Header />
			<Wrapper loading={loading}>
				<div className="bg-white h-full">
					<div className="max-w-4xl mx-auto">
						<section className="bg-gray-50 pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2">
							<div>
								<h2 className="text-lg font-medium text-gray-900">
									{' '}
									الفاتورة{' '}
								</h2>

								<div>
									<div className="flex w-full items-center text-sm justify-between">
										<span className=" border-transparent" aria-hidden="true">
											<span className="rounded-full bg-white w-1.5 h-1.5" />
										</span>
									</div>
									<dl className="text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block">
										{promoApplied && (
											<div className="flex items-center justify-between">
												<dt className="text-gray-600">السعر قبل الخصم</dt>
												<dd className="font-sans line-through text-red-700">
													{bundle?.unit_amount &&
														(bundle?.unit_amount / 100)?.toFixed(2)}
													$
												</dd>
											</div>
										)}
										<div className="flex items-center justify-between">
											<dt className="text-gray-600">سعر الاشتراك</dt>
											<dd className="font-sans text-green-800">
												{!promoApplied
													? bundle?.unit_amount &&
													  (bundle?.unit_amount / 100)?.toFixed(2)
													: bundle?.unit_amount &&
													  (
															bundle?.unit_amount / 100 -
															(bundle?.unit_amount / 100) *
																(promoData?.percent_off / 100)
													  )?.toFixed(2)}
												$
											</dd>
										</div>
										{promoApplied && (
											<div className="flex items-center justify-between">
												<dt className="text-gray-600">قيمة البرومو</dt>
												<dd className="font-sans">
													${(promoAmountDiscounted / 100).toFixed(2)}
												</dd>
											</div>
										)}
										<div className="flex items-center justify-between">
											<dt className="text-gray-600">
												المبلغ المخصوم (عرض التطوير لخطة مدى الحياة)
											</dt>
											<dd className="font-sans">
												$
												{promoApplied
													? /*@ts-ignore*/
													  (
															(latestInvoice + promoAmountDiscounted) /
															100
													  ).toFixed(2)
													: /*@ts-ignore*/
													  (latestInvoice / 100).toFixed(2)}
											</dd>
										</div>

										<div className="flex items-center justify-between border-t border-gray-200 pt-6">
											<dt className="text-base">المجموع</dt>
											<dd className="text-base font-sans">
												{!promoApplied
													? //@ts-ignore
													  (
															(bundle?.unit_amount - latestInvoice) /
															100
													  ).toFixed(2)
													: //@ts-ignore

													  (
															(bundle?.unit_amount -
																latestInvoice -
																promoAmountDiscounted) /
															100
													  ).toFixed(2)}
												$
											</dd>
										</div>
									</dl>
									<div>
										<div className="mt-10 pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
											<label
												htmlFor="address"
												className="block text-sm font-medium text-gray-700"
											>
												كود الخصم
											</label>
											<div className="flex space-x-3 mt-1 sm:mt-4">
												{!promoApplied && (
													<button
														onClick={handleVerifyPromo}
														className="bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-green-700  sm:mr-6 sm:order-last sm:w-auto"
														disabled={Boolean(promo === '')}
													>
														اضافة
													</button>
												)}

												<div className="flex items-center">
													<input
														onChange={(e) => setPromo(e.target.value)}
														value={promo}
														type="text"
														id="promo"
														name="promo"
														autoComplete="Promotion code"
														className=" border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm sm:mx-4"
													/>
													{promoApplied && (
														<CheckCircleIcon className="h-5 w-5 text-green-600 inline-flex items-center" />
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{loading ? (
								<div className="mt-10 pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 my-5" />
								</div>
							) : (
								<React.Fragment>
									<div className="mt-10 pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
										<div className="flex space-x-3 items-center">
											<input
												//@ts-ignore
												ref={refTermsDiv}
												checked={isAcceptChecked}
												type="checkbox"
												onChange={() =>
													setIsAcceptChecked((prevState) => !prevState)
												}
												className="ml-2 rounded focus:ring-green-600"
											/>
											<Link
												to="/terms"
												className="text-sm font-medium text-blue-800 "
											>
												أوافق على شروط الموقع قبل الدفع
											</Link>
										</div>

										<button
											onClick={handleSubmit}
											className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-green-700  sm:ml-6 sm:order-last sm:w-auto"
										>
											اكمل عملية الدفع
										</button>
									</div>
								</React.Fragment>
							)}
						</section>
					</div>
				</div>
			</Wrapper>

			<SuccessToast
				message={'تمت اضافة وسيلة دفع جديدة بنجاح'}
				setOpen={setSuccessOpen}
				open={successOpen}
				title={'وسائل الدفع'}
			/>
			<SuccessToast
				message={'تمت إضافة كود الخصم بنجاح'}
				setOpen={setPromoSuccessOpen}
				open={promoSuccessOpen}
				title={'كود الخصم'}
			/>
			<ErrorToast
				message={'فشل بإضافة كود الخصم، او كود الخصم ليس موجود'}
				setOpen={setPromoErrorOpen}
				open={promoErrorOpen}
				title={'كود الخصم'}
			/>
			<ErrorToast
				message={`عذرا، تم رفض وسيلة الدفع التي قمت باضافتها، الرجاء المحاولة من جديد`}
				setOpen={setErrorOpen}
				open={errorOpen}
				title={'وسائل الدفع'}
			/>
			<ErrorToast
				message={`الرجاء الموافقة على شروط و احكام الموقع قبل الشراء`}
				setOpen={setTermsErrorOpen}
				open={termsErrorOpen}
				title={'انتباه!'}
			/>
			<Footer />
		</Fragment>
	)
}
export default Checkout
