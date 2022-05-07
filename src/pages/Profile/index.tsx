import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {
	AddPaymentMethodModal,
	Footer,
	Header,
	Wrapper,
	SuccessToast,
	ErrorToast,
} from '../../components'
import {
	cancelSubscription,
	editProfile,
	getMyProfile,
	GetMyProfile,
	makeDefaultPaymentMethod,
	removePaymentMethod,
} from '../../services'
import {cancelSubscriptionAction} from '../../actions'
import ConfirmationModal from '../../components/common/ConfirmationModal'
import moment from 'moment'
import {AccountStatus, BundleType, UserType} from '../../types'
import {Link} from 'react-router-dom'
import {TrashIcon} from '@heroicons/react/outline'
import {useHistory} from 'react-router-dom'
import {handleError} from '../../utils'

const Index = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [profileData, setProfileData] = useState<GetMyProfile.User>()
	const [loading, setLoading] = useState<boolean>(false)
	const [mainPaymentMethod, setMainPaymentMethod] = useState<string>('')
	const [successOpen, setSuccessOpen] = useState<boolean>(false)
	const [errorOpen, setErrorOpen] = useState<boolean>(false)
	const [declineReason, setDeclineReason] = useState<string>('')
	const [open, setOpen] = useState(false)
	const [confirmDefaultOpen, setConfirmDefaultOpen] = useState<boolean>(false)
	const [successDefaultOpen, setSuccessDefaultOpen] = useState<boolean>(false)

	const handleMakeDefault = useCallback(() => {
		setLoading(true)
		setConfirmDefaultOpen(false)
		makeDefaultPaymentMethod(mainPaymentMethod)
			.then((res) => {
				fetchProfile('default')
			})
			.catch(handleError)
	}, [mainPaymentMethod])
	const [cancelConfirmationModalOpen, setCancelSubscriptionModalOpen] =
		useState<boolean>(false)
	const fetchProfile = useCallback((type: 'load' | 'refetch' | 'default') => {
		setLoading(true)
		getMyProfile()
			.then((res) => {
				setProfileData(res?.data?.user)
				setLoading(false)
			})
			.catch(handleError)
		if (type === 'refetch') {
			setSuccessOpen(true)
		} else if (type === 'default') {
			setSuccessDefaultOpen(true)
		}
	}, [])

	useEffect(() => {
		fetchProfile('load')
		return () => fetchProfile('load')
	}, [])
	const handleCancel = useCallback(() => {
		setCancelSubscriptionModalOpen(false)
		if (profileData?.subscriptions.data[0].id) {
			cancelSubscription(profileData?.subscriptions.data[0].id)
				.then((res) => {
					fetchProfile('load')
					dispatch(cancelSubscriptionAction())
				})
				.catch((err) => {
					if (err.response) {
						console.log(err.response.data)
					} else {
						console.log(err)
					}
				})
		}
	}, [profileData, dispatch])
	const [removeConfirmationModalOpen, setRemoveConfirmationModalOpen] =
		useState<boolean>(false)
	const [successToastOpen, setSuccessToastOpen] = useState<boolean>(false)

	const handleRemovePaymentMethod = useCallback(() => {
		removePaymentMethod(mainPaymentMethod)
			.then((res) => {
				//@ts-ignore
				setProfileData((prevState) => ({
					...prevState,
					paymentMethods: {
						...prevState?.paymentMethods,
						data: prevState?.paymentMethods.data.filter(
							(item) => item.id !== mainPaymentMethod
						),
					},
				}))

				setSuccessToastOpen(true)
				setRemoveConfirmationModalOpen(false)
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data)
				} else {
					console.log(err)
				}
			})
	}, [mainPaymentMethod])

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			//@ts-ignore
			setProfileData((prevState) => ({
				...prevState,
				[event.target.id]: event.target.value,
			}))
		},
		[]
	)

	const handleSubmit = useCallback(() => {
		editProfile({
			//@ts-ignore
			fname: profileData?.fname,
			//@ts-ignore
			lname: profileData?.lname,
			password: profileData?.password,
		})
			.then((res) => {
				fetchProfile('load')
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data)
				} else {
					console.log(err)
				}
			})
	}, [profileData])
	const handleUpgrade = useCallback(() => {
		history.push('/upgrade')
	}, [profileData])
	return (
		<React.Fragment>
			<Header />
			<Wrapper loading={loading}>
				<div className="bg-slate-50">
					<div className="pb-4 divide-y divide-gray-200 ">
						<div className="max-w-7xl mx-auto shadow rounded p-3 mt-4 bg-white">
							<div className="bg-white divide-y divide-gray-200 mt-3  px-4 py-5 sm:rounded-lg sm:p-6">
								<div className="md:grid md:grid-cols-3 md:gap-6">
									<div className="md:col-span-1">
										<div className="px-4 py-5 sm:p-6">
											<h3 className="text-lg font-medium leading-6 text-gray-900">
												المعلومات الشخصية
											</h3>
										</div>
									</div>
									<div className="mt-5 md:mt-0 md:col-span-2">
										<div className="grid grid-cols-4 gap-6">
											<div className="col-span-4 sm:col-span-2">
												<label
													htmlFor="fname"
													className="block text-sm font-medium text-gray-700"
												>
													الاسم الاول
												</label>
												<input
													type="text"
													name="fname"
													id="fname"
													value={profileData?.fname}
													onChange={handleChange}
													autoComplete="cc-given-name"
													className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
												/>
											</div>
											<div className="col-span-4 sm:col-span-2">
												<label
													htmlFor="lname"
													className="block text-sm font-medium text-gray-700"
												>
													اسم الشهرة
												</label>
												<input
													type="text"
													name="lname"
													id="lname"
													onChange={handleChange}
													value={profileData?.lname}
													autoComplete="cc-family-name"
													className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
												/>
											</div>

											<div className="col-span-4 sm:col-span-2">
												<label
													htmlFor="email"
													className="block text-sm font-medium text-gray-700"
												>
													البريد الالكتروني
												</label>
												<input
													type="text"
													name="email"
													id="email"
													autoComplete="email"
													value={profileData?.email}
													disabled
													className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
												/>
											</div>
											{profileData?.type === UserType.STANDARD && (
												<div className="col-span-4 sm:col-span-2">
													<label
														htmlFor="lname"
														className="block text-sm font-medium text-gray-700"
													>
														كلمة المرور
													</label>
													<input
														type="password"
														id="password"
														onChange={handleChange}
														className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
													/>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className="bg-white divide-y-2 divide-gray-200 mt-3  px-4 py-5 sm:rounded-lg sm:p-6">
								<div className="md:grid md:grid-cols-3 md:gap-6">
									<div className="md:col-span-1">
										<div className="px-4 py-5 sm:p-6">
											<h3 className="text-lg font-medium leading-6 text-gray-900">
												نوع الاشتراك
											</h3>
										</div>
									</div>
									<div className="mt-5 md:mt-0 md:col-span-2">
										{profileData?.status === AccountStatus.NOT_VERIFIED ? (
											<div className="bg-white shadow sm:rounded-lg">
												<div className="px-4 py-5 sm:p-6">
													<h3 className="text-lg leading-6 font-medium text-gray-900">
														اشترك معنا
													</h3>
													<div className="mt-2 sm:flex sm:items-start sm:justify-between">
														<div className="max-w-xl text-sm text-gray-500">
															<p>
																اختر الخطة المناسبة لك الان و اكتشف منتجات رابحة
																يومياً
															</p>
														</div>
														<div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
															<Link
																to="/pricing"
																className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
															>
																عرض الباقات
															</Link>
														</div>
													</div>
												</div>
											</div>
										) : profileData?.status === AccountStatus.TRIAL ? (
											<React.Fragment>
												<span className="inline-flex items-center px-2 py-3 rounded text-xs font-medium bg-green-100 text-green-800">
													تنتهي الفترة التجريبية بتاريخ
													<span className="mx-2">
														{moment
															.unix(
																//@ts-ignore
																profileData?.subscriptions?.data.find(
																	(item) =>
																		item.id === profileData?.activeSubscription
																).current_period_end
															)
															.locale('ar')
															.format('MM-DD-YYYY')}
													</span>
												</span>
											</React.Fragment>
										) : profileData?.bundleType === BundleType.MONTHLY ? (
											<div className="bg-white shadow sm:rounded-lg">
												<div className="px-4 py-5 sm:p-6">
													<div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
														<button
															onClick={handleUpgrade}
															type="button"
															className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-green-800 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
														>
															خصم التطوير لمدى الحياة
														</button>
													</div>
												</div>
											</div>
										) : profileData?.bundleType === BundleType.ONE_TIME ? (
											<div className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-green-800 bg-green-100 sm:text-sm">
												خطة مدى الحياة
											</div>
										) : (
											<div className="bg-white ">
												<div className="px-4 py-5 sm:p-6">
													<span className="inline-flex items-center px-2 py-3 rounded text-xs font-medium bg-green-100 text-green-800">
														{profileData?.payments?.data[0].metadata.name}
													</span>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>

							{profileData &&
								(profileData?.invoices?.data?.length > 0 ||
									profileData?.payments?.data?.length > 0) && (
									<div className="bg-white divide-y-2 divide-gray-200 mt-3  px-4 py-5 sm:rounded-lg sm:p-6">
										<div className="md:grid md:grid-cols-3 md:gap-6">
											<div className="md:col-span-1">
												<div className="px-4 py-5 sm:p-6">
													<h3 className="text-lg font-medium leading-6 text-gray-900">
														تاريخ الدفعات
													</h3>
												</div>
											</div>
											<div className="mt-5 md:mt-0 md:col-span-2">
												<table className="min-w-full divide-y divide-gray-200">
													<thead className="bg-gray-50">
														<tr>
															<th
																scope="col"
																className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
															>
																التاريخ
															</th>
															<th
																scope="col"
																className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
															>
																التفصيل
															</th>
															<th
																scope="col"
																className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
															>
																المبلغ
															</th>
															{/*`relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.*/}
															<th
																scope="col"
																className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
															>
																<span>روابط الدفعات</span>
															</th>
														</tr>
													</thead>
													<tbody className="bg-white divide-y divide-gray-200">
														{profileData?.payments.data.map(
															(payment, index) => {
																if (payment?.charges?.data[0]?.receipt_url)
																	return (
																		<tr key={payment.id}>
																			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
																				<time
																					//@ts-ignore
																					dateTime={parseInt(payment.created)}
																				>
																					{/*@ts-ignore*/}
																					{moment
																						.unix(payment.created)
																						.locale('ar')
																						.format('MM-DD-YYYY')}
																				</time>
																			</td>
																			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
																				{/* @ts-ignore */}
																				<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
																					مدفوعة
																				</span>
																			</td>
																			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
																				{(payment.amount / 100).toFixed(2)} USD
																			</td>
																			<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
																				<a
																					className="flex items-center"
																					href={
																						payment?.charges?.data[0]
																							?.receipt_url
																					}
																					download
																					target={'_blank'}
																					rel={'noreferrer'}
																				>
																					حمل الدفعة بصيغة PDF
																					<svg
																						xmlns="http://www.w3.org/2000/svg"
																						className="h-6 w-6 mr-2"
																						fill="none"
																						viewBox="0 0 24 24"
																						stroke="currentColor"
																					>
																						<path
																							strokeLinecap="round"
																							strokeLinejoin="round"
																							strokeWidth={2}
																							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
																						/>
																					</svg>
																				</a>
																			</td>
																		</tr>
																	)
															}
														)}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								)}

							{profileData && profileData?.paymentMethods?.data?.length > 0 ? (
								<React.Fragment>
									<div className="bg-white divide-y-2 divide-gray-200 mt-3  px-4 py-5 sm:rounded-lg sm:p-6">
										<div className="px-4 py-5 sm:p-6">
											<div className="flex items-center">
												<h3 className="text-lg leading-6 font-medium text-gray-900">
													وسائل الدفع
												</h3>
												<button
													type="button"
													className="inline-flex mx-3 items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
													onClick={() => setOpen(true)}
												>
													اضافة
												</button>
											</div>

											<div className="mt-5">
												{profileData?.paymentMethods?.data?.map((item) => {
													return (
														<React.Fragment key={item?.id}>
															<div
																key={item?.id}
																className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between"
															>
																<h4 className="sr-only">
																	{item.card.brand.charAt(0).toUpperCase()}
																</h4>
																<div className="sm:flex sm:items-start">
																	{item.card.brand === 'visa' ? (
																		<React.Fragment>
																			{/*Visa here*/}
																			<svg
																				className="h-8 w-auto sm:flex-shrink-0 sm:h-6"
																				viewBox="0 0 36 24"
																				aria-hidden="true"
																			>
																				<rect
																					width={36}
																					height={24}
																					fill="#224DBA"
																					rx={4}
																				/>
																				<path
																					fill="#fff"
																					d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
																				/>
																			</svg>
																		</React.Fragment>
																	) : item.card.brand === 'amex' ? (
																		<React.Fragment>
																			{/*amex here*/}
																			<svg
																				id="Capa_1"
																				xmlns="http://www.w3.org/2000/svg"
																				xmlnsXlink="http://www.w3.org/1999/xlink"
																				x="0px"
																				y="0px"
																				viewBox="0 0 512 512"
																				xmlSpace="preserve"
																				className="h-8 w-auto sm:flex-shrink-0 sm:h-6"
																				width={36}
																				height={24}
																			>
																				<path
																					style={{
																						fill: '#306FC5',
																					}}
																					d="M512,402.281c0,16.716-13.55,30.267-30.265,30.267H30.265C13.55,432.549,0,418.997,0,402.281V109.717 c0-16.715,13.55-30.266,30.265-30.266h451.47c16.716,0,30.265,13.551,30.265,30.266V402.281L512,402.281z"
																				/>
																				<path
																					style={{
																						opacity: 0.15,
																						fill: '#202121',
																					}}
																					d="M21.517,402.281V109.717 c0-16.715,13.552-30.266,30.267-30.266h-21.52C13.55,79.451,0,93.001,0,109.717v292.565c0,16.716,13.55,30.267,30.265,30.267h21.52 C35.07,432.549,21.517,418.997,21.517,402.281z"
																				/>
																				<g>
																					<polygon
																						style={{
																							fill: '#FFFFFF',
																						}}
																						points="74.59,220.748 89.888,220.748 82.241,201.278  "
																					/>
																					<polygon
																						style={{
																							fill: '#FFFFFF',
																						}}
																						points="155.946,286.107 155.946,295.148 181.675,295.148 181.675,304.885 155.946,304.885  155.946,315.318 184.455,315.318 197.666,300.712 185.151,286.107  "
																					/>
																					<polygon
																						style={{
																							fill: '#FFFFFF',
																						}}
																						points="356.898,201.278 348.553,220.748 364.548,220.748  "
																					/>
																					<polygon
																						style={{
																							fill: '#FFFFFF',
																						}}
																						points="230.348,320.875 230.348,281.241 212.268,300.712  "
																					/>
																					<path
																						style={{
																							fill: '#FFFFFF',
																						}}
																						d="M264.42,292.368c-0.696-4.172-3.48-6.261-7.654-6.261h-14.599v12.516h15.299 C261.637,298.624,264.42,296.539,264.42,292.368z"
																					/>
																					<path
																						style={{
																							fill: '#FFFFFF',
																						}}
																						d="M313.09,297.236c1.391-0.697,2.089-2.785,2.089-4.867c0.696-2.779-0.698-4.172-2.089-4.868 c-1.387-0.696-3.476-0.696-5.559-0.696h-13.91v11.127h13.909C309.613,297.932,311.702,297.932,313.09,297.236z"
																					/>
																					<path
																						style={{
																							fill: '#FFFFFF',
																						}}
																						d="M413.217,183.198v8.344l-4.169-8.344H376.37v8.344l-4.174-8.344h-44.502 c-7.648,0-13.909,1.392-19.469,4.173v-4.173h-31.289v0.696v3.477c-3.476-2.78-7.648-4.173-13.211-4.173h-111.95l-7.652,17.384 l-7.647-17.384h-25.031h-10.431v8.344l-3.477-8.344h-0.696H66.942l-13.909,32.68L37.042,251.34l-0.294,0.697h0.294h35.463h0.444 l0.252-0.697l4.174-10.428h9.039l4.172,11.125h40.326v-0.697v-7.647l3.479,8.343h20.163l3.475-8.343v7.647v0.697h15.993h79.965 h0.696v-18.08h1.394c1.389,0,1.389,0,1.389,2.087v15.297h50.065v-4.172c4.172,2.089,10.426,4.172,18.771,4.172h20.863l4.172-11.123 h9.732l4.172,11.123h40.328v-6.952v-3.476l6.261,10.428h1.387h0.698h30.595v-68.143h-31.291l0,0H413.217z M177.501,241.609h-6.955 h-4.171v-4.169v-34.076l-0.696,1.595v-0.019l-16.176,36.669h-0.512h-3.719h-6.017l-16.687-38.245v38.245h-23.64l-4.867-10.43 H70.417l-4.868,10.43H53.326l20.57-48.675h17.382l19.469,46.587v-46.587h4.171h14.251l0.328,0.697h0.024l8.773,19.094l6.3,14.306 l0.223-0.721l13.906-33.375H177.5v48.674H177.501L177.501,241.609z M225.481,203.364h-27.119v9.039h26.423v9.734h-26.423v9.738 h27.119v10.427h-38.939v-49.367h38.939V203.364L225.481,203.364z M275.076,221.294c0.018,0.016,0.041,0.027,0.063,0.042 c0.263,0.278,0.488,0.557,0.68,0.824c1.332,1.746,2.409,4.343,2.463,8.151c0.004,0.066,0.007,0.131,0.011,0.197 c0,0.038,0.007,0.071,0.007,0.11c0,0.022-0.002,0.039-0.002,0.06c0.016,0.383,0.026,0.774,0.026,1.197v9.735h-10.428v-5.565 c0-2.781,0-6.954-2.089-9.735c-0.657-0.657-1.322-1.09-2.046-1.398c-1.042-0.675-3.017-0.686-6.295-0.686h-12.52v17.384h-11.818 v-48.675h26.425c6.254,0,10.428,0,13.906,2.086c3.407,2.046,5.465,5.439,5.543,10.812c-0.161,7.4-4.911,11.46-8.326,12.829 C270.676,218.662,272.996,219.129,275.076,221.294z M298.491,241.609h-11.822v-48.675h11.822V241.609z M434.083,241.609h-15.3 l-22.25-36.855v30.595l-0.073-0.072v6.362h-11.747v-0.029h-11.822l-4.172-10.43H344.38l-4.172,11.123h-13.211 c-5.559,0-12.517-1.389-16.687-5.561c-4.172-4.172-6.256-9.735-6.256-18.773c0-6.953,1.389-13.911,6.256-19.472 c3.474-4.175,9.735-5.562,17.382-5.562h11.128v10.429h-11.128c-4.172,0-6.254,0.693-9.041,2.783 c-2.082,2.085-3.474,6.256-3.474,11.123c0,5.564,0.696,9.04,3.474,11.821c2.091,2.089,4.87,2.785,8.346,2.785h4.867l15.991-38.243 h6.957h10.428l19.472,46.587v-2.376v-15.705v-1.389v-27.116h17.382l20.161,34.07v-34.07h11.826v47.977h0.002L434.083,241.609 L434.083,241.609z"
																					/>
																					<path
																						style={{
																							fill: '#FFFFFF',
																						}}
																						d="M265.161,213.207c0.203-0.217,0.387-0.463,0.543-0.745c0.63-0.997,1.352-2.793,0.963-5.244 c-0.016-0.225-0.057-0.433-0.105-0.634c-0.013-0.056-0.011-0.105-0.026-0.161l-0.007,0.001c-0.346-1.191-1.229-1.923-2.11-2.367 c-1.394-0.693-3.48-0.693-5.565-0.693h-13.909v11.127h13.909c2.085,0,4.172,0,5.565-0.697c0.209-0.106,0.395-0.25,0.574-0.413 l0.002,0.009C264.996,213.389,265.067,213.315,265.161,213.207z"
																					/>
																					<path
																						style={{
																							fill: '#FFFFFF',
																						}}
																						d="M475.105,311.144c0-4.867-1.389-9.736-3.474-13.212v-31.289h-0.032v-2.089c0,0-29.145,0-33.483,0 c-4.336,0-9.598,4.171-9.598,4.171v-4.171h-31.984c-4.87,0-11.124,1.392-13.909,4.171v-4.171h-57.016v2.089v2.081 c-4.169-3.474-11.824-4.171-15.298-4.171h-37.549v2.089v2.081c-3.476-3.474-11.824-4.171-15.998-4.171H215.05l-9.737,10.431 l-9.04-10.431h-2.911h-4.737h-54.93v2.089v5.493v62.651h61.19l10.054-10.057l8.715,10.057h0.698h35.258h1.598h0.696h0.692v-6.953 v-9.039h3.479c4.863,0,11.124,0,15.991-2.089v17.382v1.394h31.291v-1.394V317.4h1.387c2.089,0,2.089,0,2.089,2.086v14.6v1.394 h94.563c6.263,0,12.517-1.394,15.993-4.175v2.781v1.394h29.902c6.254,0,12.517-0.695,16.689-3.478 c6.402-3.841,10.437-10.64,11.037-18.749c0.028-0.24,0.063-0.48,0.085-0.721l-0.041-0.039 C475.087,312.043,475.105,311.598,475.105,311.144z M256.076,306.973h-13.91v2.081v4.174v4.173v7.649h-22.855l-13.302-15.299 l-0.046,0.051l-0.65-0.748l-15.297,15.996h-44.501v-48.673h45.197l12.348,13.525l2.596,2.832l0.352-0.365l14.604-15.991h36.852 c7.152,0,15.161,1.765,18.196,9.042c0.365,1.441,0.577,3.043,0.577,4.863C276.237,304.189,266.502,306.973,256.076,306.973z  M325.609,306.276c1.389,2.081,2.085,4.867,2.085,9.041v9.732h-11.819v-6.256c0-2.786,0-7.65-2.089-9.739 c-1.387-2.081-4.172-2.081-8.341-2.081H292.93v18.077h-11.82v-49.369h26.421c5.559,0,10.426,0,13.909,2.084 c3.474,2.088,6.254,5.565,6.254,11.128c0,7.647-4.865,11.819-8.343,13.212C322.829,303.49,324.914,304.885,325.609,306.276z  M373.589,286.107h-27.122v9.04h26.424v9.737h-26.424v9.736h27.122v10.429H334.65V275.68h38.939V286.107z M402.791,325.05h-22.252 v-10.429h22.252c2.082,0,3.476,0,4.87-1.392c0.696-0.697,1.387-2.085,1.387-3.477c0-1.394-0.691-2.778-1.387-3.475 c-0.698-0.695-2.091-1.391-4.176-1.391c-11.126-0.696-24.337,0-24.337-15.296c0-6.954,4.172-14.604,16.689-14.604h22.945v11.819 h-21.554c-2.085,0-3.478,0-4.87,0.696c-1.387,0.697-1.387,2.089-1.387,3.478c0,2.087,1.387,2.783,2.778,3.473 c1.394,0.697,2.783,0.697,4.172,0.697h6.259c6.259,0,10.43,1.391,13.211,4.173c2.087,2.087,3.478,5.564,3.478,10.43 C420.869,320.179,414.611,325.05,402.791,325.05z M462.59,320.179c-2.778,2.785-7.648,4.871-14.604,4.871H425.74v-10.429h22.245 c2.087,0,3.481,0,4.87-1.392c0.693-0.697,1.391-2.085,1.391-3.477c0-1.394-0.698-2.778-1.391-3.475 c-0.696-0.695-2.085-1.391-4.172-1.391c-11.122-0.696-24.337,0-24.337-15.295c0-6.609,3.781-12.579,13.106-14.352 c1.115-0.154,2.293-0.253,3.583-0.253h22.948v11.819h-15.3h-5.561h-0.696c-2.087,0-3.476,0-4.865,0.696 c-0.7,0.697-1.396,2.089-1.396,3.478c0,2.087,0.696,2.783,2.785,3.473c1.389,0.697,2.78,0.697,4.172,0.697h0.691h5.565 c3.039,0,5.337,0.375,7.44,1.114c1.926,0.697,8.302,3.549,9.728,10.994c0.124,0.78,0.215,1.594,0.215,2.495 C466.761,313.925,465.37,317.401,462.59,320.179z"
																					/>
																				</g>
																				<g />
																				<g />
																				<g />
																				<g />
																				<g />
																				<g />
																				<g />
																				<g />
																				<g />
																				<g />
																				<g />
																				<g />
																				<g />
																				<g />
																				<g />
																			</svg>
																		</React.Fragment>
																	) : (
																		<React.Fragment>
																			{/*master here*/}
																			<svg
																				className="h-8 w-auto sm:flex-shrink-0 sm:h-6"
																				width={36}
																				height={24}
																				viewBox="0 -28.5 256 256"
																				version="1.1"
																				xmlns="http://www.w3.org/2000/svg"
																				xmlnsXlink="http://www.w3.org/1999/xlink"
																				preserveAspectRatio="xMidYMid"
																			>
																				<g>
																					<path
																						d="M46.5392504,198.011312 L46.5392504,184.839826 C46.5392504,179.790757 43.4659038,176.497885 38.1973096,176.497885 C35.5630125,176.497885 32.7091906,177.375984 30.7334678,180.229806 C29.1967945,177.815034 27.0015469,176.497885 23.7086756,176.497885 C21.513428,176.497885 19.3181804,177.15646 17.5619824,179.571233 L17.5619824,176.936935 L12.9519625,176.936935 L12.9519625,198.011312 L17.5619824,198.011312 L17.5619824,186.3765 C17.5619824,182.644579 19.5377052,180.888381 22.6110518,180.888381 C25.6843984,180.888381 27.2210717,182.864103 27.2210717,186.3765 L27.2210717,198.011312 L31.8310916,198.011312 L31.8310916,186.3765 C31.8310916,182.644579 34.0263392,180.888381 36.880161,180.888381 C39.9535076,180.888381 41.490181,182.864103 41.490181,186.3765 L41.490181,198.011312 L46.5392504,198.011312 L46.5392504,198.011312 Z M114.81145,176.936935 L107.347608,176.936935 L107.347608,170.570717 L102.737589,170.570717 L102.737589,176.936935 L98.566618,176.936935 L98.566618,181.107905 L102.737589,181.107905 L102.737589,190.766995 C102.737589,195.59654 104.713311,198.450362 109.981906,198.450362 C111.957628,198.450362 114.152876,197.791787 115.689549,196.913688 L114.372401,192.962243 C113.055252,193.840341 111.518579,194.059866 110.420955,194.059866 C108.225708,194.059866 107.347608,192.742718 107.347608,190.54747 L107.347608,181.107905 L114.81145,181.107905 L114.81145,176.936935 L114.81145,176.936935 Z M153.886857,176.497885 C151.25256,176.497885 149.496362,177.815034 148.398738,179.571233 L148.398738,176.936935 L143.788718,176.936935 L143.788718,198.011312 L148.398738,198.011312 L148.398738,186.156975 C148.398738,182.644579 149.935411,180.668856 152.789233,180.668856 C153.667332,180.668856 154.764956,180.888381 155.643055,181.107905 L156.960204,176.71741 C156.082105,176.497885 154.764956,176.497885 153.886857,176.497885 L153.886857,176.497885 L153.886857,176.497885 Z M94.834697,178.693133 C92.6394495,177.15646 89.566103,176.497885 86.2732315,176.497885 C81.0046375,176.497885 77.492241,179.132183 77.492241,183.303153 C77.492241,186.81555 80.1265385,188.791272 84.736558,189.449847 L86.931806,189.669371 C89.346578,190.10842 90.6637265,190.766995 90.6637265,191.864619 C90.6637265,193.401292 88.9075285,194.498916 85.834182,194.498916 C82.7608355,194.498916 80.346063,193.401292 78.8093895,192.303668 L76.614142,195.816065 C79.0289145,197.572262 82.321786,198.450362 85.614657,198.450362 C91.7613505,198.450362 95.2737465,195.59654 95.2737465,191.645094 C95.2737465,187.913173 92.4199245,185.937451 88.0294295,185.278876 L85.834182,185.059351 C83.858459,184.839826 82.321786,184.400777 82.321786,183.083629 C82.321786,181.546955 83.858459,180.668856 86.2732315,180.668856 C88.9075285,180.668856 91.5418255,181.76648 92.858974,182.425054 L94.834697,178.693133 L94.834697,178.693133 Z M217.329512,176.497885 C214.695215,176.497885 212.939017,177.815034 211.841393,179.571233 L211.841393,176.936935 L207.231373,176.936935 L207.231373,198.011312 L211.841393,198.011312 L211.841393,186.156975 C211.841393,182.644579 213.378066,180.668856 216.231888,180.668856 C217.109987,180.668856 218.207611,180.888381 219.08571,181.107905 L220.402859,176.71741 C219.52476,176.497885 218.207611,176.497885 217.329512,176.497885 L217.329512,176.497885 L217.329512,176.497885 Z M158.496877,187.474123 C158.496877,193.840341 162.887372,198.450362 169.69264,198.450362 C172.765986,198.450362 174.961234,197.791787 177.156481,196.035589 L174.961234,192.303668 C173.205036,193.620817 171.448838,194.279391 169.473115,194.279391 C165.741194,194.279391 163.106897,191.645094 163.106897,187.474123 C163.106897,183.522678 165.741194,180.888381 169.473115,180.668856 C171.448838,180.668856 173.205036,181.32743 174.961234,182.644579 L177.156481,178.912658 C174.961234,177.15646 172.765986,176.497885 169.69264,176.497885 C162.887372,176.497885 158.496877,181.107905 158.496877,187.474123 L158.496877,187.474123 L158.496877,187.474123 Z M201.08468,187.474123 L201.08468,176.936935 L196.47466,176.936935 L196.47466,179.571233 C194.937987,177.595509 192.742739,176.497885 189.888917,176.497885 C183.961749,176.497885 179.351729,181.107905 179.351729,187.474123 C179.351729,193.840341 183.961749,198.450362 189.888917,198.450362 C192.962264,198.450362 195.157512,197.352737 196.47466,195.377015 L196.47466,198.011312 L201.08468,198.011312 L201.08468,187.474123 Z M184.181274,187.474123 C184.181274,183.742202 186.596046,180.668856 190.547492,180.668856 C194.279413,180.668856 196.91371,183.522678 196.91371,187.474123 C196.91371,191.206044 194.279413,194.279391 190.547492,194.279391 C186.596046,194.059866 184.181274,191.206044 184.181274,187.474123 L184.181274,187.474123 Z M129.080559,176.497885 C122.933866,176.497885 118.543371,180.888381 118.543371,187.474123 C118.543371,194.059866 122.933866,198.450362 129.300084,198.450362 C132.373431,198.450362 135.446777,197.572262 137.861549,195.59654 L135.666302,192.303668 C133.910104,193.620817 131.714856,194.498916 129.519609,194.498916 C126.665787,194.498916 123.811965,193.181768 123.153391,189.449847 L138.739648,189.449847 L138.739648,187.693648 C138.959173,180.888381 135.007727,176.497885 129.080559,176.497885 L129.080559,176.497885 L129.080559,176.497885 Z M129.080559,180.449331 C131.934381,180.449331 133.910104,182.20553 134.349153,185.498401 L123.372916,185.498401 C123.811965,182.644579 125.787688,180.449331 129.080559,180.449331 L129.080559,180.449331 Z M243.452958,187.474123 L243.452958,168.594995 L238.842938,168.594995 L238.842938,179.571233 C237.306265,177.595509 235.111017,176.497885 232.257196,176.497885 C226.330027,176.497885 221.720007,181.107905 221.720007,187.474123 C221.720007,193.840341 226.330027,198.450362 232.257196,198.450362 C235.330542,198.450362 237.52579,197.352737 238.842938,195.377015 L238.842938,198.011312 L243.452958,198.011312 L243.452958,187.474123 Z M226.549552,187.474123 C226.549552,183.742202 228.964324,180.668856 232.91577,180.668856 C236.647691,180.668856 239.281988,183.522678 239.281988,187.474123 C239.281988,191.206044 236.647691,194.279391 232.91577,194.279391 C228.964324,194.059866 226.549552,191.206044 226.549552,187.474123 L226.549552,187.474123 Z M72.443172,187.474123 L72.443172,176.936935 L67.833152,176.936935 L67.833152,179.571233 C66.2964785,177.595509 64.101231,176.497885 61.247409,176.497885 C55.3202405,176.497885 50.7102205,181.107905 50.7102205,187.474123 C50.7102205,193.840341 55.3202405,198.450362 61.247409,198.450362 C64.3207555,198.450362 66.5160035,197.352737 67.833152,195.377015 L67.833152,198.011312 L72.443172,198.011312 L72.443172,187.474123 Z M55.3202405,187.474123 C55.3202405,183.742202 57.735013,180.668856 61.6864585,180.668856 C65.4183795,180.668856 68.0526765,183.522678 68.0526765,187.474123 C68.0526765,191.206044 65.4183795,194.279391 61.6864585,194.279391 C57.735013,194.059866 55.3202405,191.206044 55.3202405,187.474123 Z"
																						fill="#000000"
																					></path>
																					<rect
																						fill="#FF5F00"
																						x="93.2980455"
																						y="16.9034088"
																						width="69.1502985"
																						height="124.251009"
																					></rect>
																					<path
																						d="M97.688519,79.0288935 C97.688519,53.783546 109.542856,31.3920209 127.763411,16.9033869 C114.3724,6.3661985 97.468994,-1.94737475e-05 79.0289145,-1.94737475e-05 C35.3434877,-1.94737475e-05 1.7258174e-06,35.3434665 1.7258174e-06,79.0288935 C1.7258174e-06,122.71432 35.3434877,158.057806 79.0289145,158.057806 C97.468994,158.057806 114.3724,151.691588 127.763411,141.1544 C109.542856,126.88529 97.688519,104.274241 97.688519,79.0288935 Z"
																						fill="#EB001B"
																					></path>
																					<path
																						d="M255.746345,79.0288935 C255.746345,122.71432 220.402859,158.057806 176.717432,158.057806 C158.277352,158.057806 141.373945,151.691588 127.982936,141.1544 C146.423015,126.665766 158.057827,104.274241 158.057827,79.0288935 C158.057827,53.783546 146.20349,31.3920209 127.982936,16.9033869 C141.373945,6.3661985 158.277352,-1.94737475e-05 176.717432,-1.94737475e-05 C220.402859,-1.94737475e-05 255.746345,35.5629913 255.746345,79.0288935 Z"
																						fill="#F79E1B"
																					></path>
																				</g>
																			</svg>
																		</React.Fragment>
																	)}

																	<div className="mt-3 sm:mt-0 sm:mr-4">
																		<div className="text-sm font-medium text-gray-900">
																			{item?.card?.last4} **** **** ****
																		</div>
																		<div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
																			<div>
																				تاريخ الانتهاء {item?.card?.exp_month}/
																				{item?.card?.exp_year}
																			</div>
																		</div>
																	</div>
																</div>
																<div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
																	<span className="relative z-0 inline-flex shadow-sm rounded-md">
																		{profileData?.defaultPaymentMethod !==
																			item.id && (
																			<button
																				onClick={() => {
																					setMainPaymentMethod(item?.id)
																					setConfirmDefaultOpen(true)
																				}}
																				type="button"
																				className="-ml-px relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
																			>
																				اضافة كوسيلة الدفع الافتراضية
																			</button>
																		)}
																		<button
																			type="button"
																			className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
																			onClick={() => {
																				setMainPaymentMethod(item?.id)
																				setRemoveConfirmationModalOpen(true)
																			}}
																		>
																			<TrashIcon
																				className="-ml-1 mr-2 h-5 w-5 text-gray-400"
																				aria-hidden="true"
																			/>
																		</button>
																	</span>
																</div>
															</div>
														</React.Fragment>
													)
												})}
											</div>
										</div>
									</div>
								</React.Fragment>
							) : (
								<div className="bg-white divide-y-2 divide-gray-200 mt-3  px-4 py-5 sm:rounded-lg sm:p-6">
									<div className="md:grid md:grid-cols-3 md:gap-6">
										<div className="md:col-span-1">
											<h3 className="text-lg font-medium leading-6 text-gray-900">
												وسائل الدفع{' '}
											</h3>
										</div>
										<div className="mt-5 md:mt-0 md:col-span-2">
											<button
												type="button"
												className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
												onClick={() => setOpen(true)}
											>
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
														d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
													/>
												</svg>
												<span className="mt-2 block text-sm font-medium text-gray-900">
													اضافة وسيلة دفع للحساب{' '}
												</span>
											</button>
										</div>
									</div>
								</div>
							)}

							<div className="flex justify-end mt-4 ml-4">
								<button
									onClick={() => fetchProfile('load')}
									type="button"
									className="bg-white w-32 py-2 ml-4 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
								>
									الغاء
								</button>
								<button
									type="submit"
									onClick={handleSubmit}
									className="ml-3 inline-flex w-32 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
								>
									حفظ
								</button>
							</div>
						</div>
					</div>
				</div>
			</Wrapper>
			<AddPaymentMethodModal
				open={open}
				setOpen={setOpen}
				cb={fetchProfile}
				setErrorOpen={setErrorOpen}
				setDeclineReason={setDeclineReason}
			/>
			<ConfirmationModal
				open={cancelConfirmationModalOpen}
				setOpen={setCancelSubscriptionModalOpen}
				title={'الغاء اشتراكك في Dropshero'}
				action={handleCancel}
				text={'هل انت متأكد انك تريد إلغاء هذا الاشتراك'}
				variant={'Warning'}
				buttonText={'نعم، متأكد'}
			/>
			<ConfirmationModal
				open={removeConfirmationModalOpen}
				setOpen={setRemoveConfirmationModalOpen}
				title={'حذف وسيلة الدفع من حسابك؟'}
				action={handleRemovePaymentMethod}
				text={' هل انت متأكد؟ سيكون بإمكانك لاحقا من اضافة وسيلة دفع جديدة'}
				variant={'Warning'}
				buttonText={'نعم. متأكد'}
			/>
			<ConfirmationModal
				open={confirmDefaultOpen}
				setOpen={setConfirmDefaultOpen}
				title={'وسيلة الدفع الافتراضية'}
				action={handleMakeDefault}
				text={'هل انت متأكد من جعل وسيلة الدفع الوسيلة الافتراضية؟'}
				variant={'Info'}
				buttonText={'نعم. متأكد'}
			/>
			<SuccessToast
				message={'لقد تم حذف وسيلة الدفع بنجاح'}
				setOpen={setSuccessToastOpen}
				open={successToastOpen}
				title={'تمت العملية بنجاح'}
			/>
			<SuccessToast
				message={'تمت اضافة وسيلة دفع جديدة بنجاح'}
				setOpen={setSuccessOpen}
				open={successOpen}
				title={'وسائل الدفع'}
			/>
			<SuccessToast
				message={'تم تغيير وسيلة الدفع الافتراضية بنجاح'}
				setOpen={setSuccessDefaultOpen}
				open={successDefaultOpen}
				title={' وسائل الدفع الافتراضية'}
			/>
			<ErrorToast
				message={`عذرا، تم رفض وسيلة الدفع التي قمت باضافتها، الرجاء المحاولة من جديد`}
				setOpen={setErrorOpen}
				open={errorOpen}
				title={'وسائل الدفع'}
			/>
			<Footer />
		</React.Fragment>
	)
}
export default Index
