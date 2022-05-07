import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Images} from '../../constants'
import {Field, Form} from 'react-final-form'
import {startSignup} from '../../actions'
import {Link} from 'react-router-dom'

const Signout = () => {
	const [rewardfulData, setRewardfulData] = useState({referral: ''})
	const dispatch = useDispatch()

	const onSubmit = async (values: any) => {
		const {fname, email, lname, password} = values
		const {referral} = rewardfulData
		dispatch(startSignup({fname, email, lname, password, referral}))
	}
	const queryParams = new URLSearchParams(window.location.search)
	useEffect(() => {
		const rewardfulReferral = queryParams.get('via')
		if (rewardfulReferral && rewardfulReferral !== '') {
			console.log('are we here')
			//@ts-ignore
			setRewardfulData({referral: window.Rewardful.referral})
		}
	}, [])

	let formData = {}

	return (
		<div className="min-h-screen flex">
			<div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
				<div className="mx-auto w-full max-w-sm lg:w-96">
					<div>
						<Link to={'/'} className={'cursor-pointer hover:opacity-90'}>
							<img
								className="h-24 w-auto"
								src={Images.Logo.src}
								alt={Images.Logo.alt}
							/>
						</Link>
						<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
							سجل حساب جديد
						</h2>
						<div className="mt-6 relative">
							<div
								className="absolute inset-0 flex items-center"
								aria-hidden="true"
							>
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									لديك حساب؟{' '}
									<Link to="/sign-in" className="font-medium text-green-600 ">
										سجل الدخول
									</Link>{' '}
								</span>
							</div>
						</div>
					</div>

					<div className="mt-8">
						<div className="mt-6">
							<Form
								onSubmit={onSubmit}
								initialValues={formData}
								validate={(values) => {
									const errors = {}
									if (!values.fname) {
										//@ts-ignore
										errors.fname = 'يرجى ادخال الاسم الاول'
									}
									if (!values.lname) {
										//@ts-ignore

										errors.lname = 'يرجى ادخال اسم الشهرة'
									}
									if (!values.email) {
										//@ts-ignore

										errors.email = 'يرجى ادخال بريد الكتروني صحيح'
									}
									if (!values.password || values.password.length < 6) {
										//@ts-ignore

										errors.password =
											'يرجى ادخال كلمة مرور اكبر من ٦ احرف او ارقام'
									}
									return errors
								}}
								render={({
									handleSubmit,
									form,
									submitting,
									pristine,
									values,
								}) => (
									<form
										data-rewardful
										onSubmit={handleSubmit}
										className="space-y-6"
									>
										<div>
											<Field name="fname">
												{({input, meta}) => (
													<div className="mt-1">
														<label className="block text-sm font-medium text-gray-700 my-2">
															الاسم الاول
														</label>
														<input
															{...input}
															type="text"
															className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
														/>
														{meta.error && meta.touched && (
															<span className="text-sm mt-2 text-red-600">
																{meta.error}
															</span>
														)}
													</div>
												)}
											</Field>

											<Field name="lname">
												{({input, meta}) => (
													<div className="mt-1">
														<label className="block text-sm font-medium text-gray-700 my-2">
															اسم الشهرة
														</label>
														<input
															{...input}
															type="text"
															className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
														/>
														{meta.error && meta.touched && (
															<span className="text-sm mt-2 text-red-600">
																{meta.error}
															</span>
														)}
													</div>
												)}
											</Field>

											<Field name="email">
												{({input, meta}) => (
													<div className="mt-1">
														<label className="block text-sm font-medium text-gray-700 my-2">
															البريد الالكتروني
														</label>
														<input
															{...input}
															type="email"
															className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
														/>
														{meta.error && meta.touched && (
															<span className="text-sm mt-2 text-red-600">
																{meta.error}
															</span>
														)}
													</div>
												)}
											</Field>

											<Field name="password" type={'password'}>
												{({input, meta}) => (
													<div className="mt-1">
														<label className="block text-sm font-medium text-gray-700 my-2">
															كلمة المرور
														</label>
														<input
															type={'password'}
															{...input}
															className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
														/>
														{meta.error && meta.touched && (
															<span className="text-sm mt-2 text-red-600">
																{meta.error}
															</span>
														)}
													</div>
												)}
											</Field>

											<input
												type="hidden"
												name="referral"
												value={rewardfulData.referral}
											/>
										</div>

										<div className="flex items-center justify-between">
											<div className="text-sm">
												<Link
													to="/forgot-password"
													className="font-medium text-green-600 hover:text-green-500"
												>
													هل نسيت كلمة المرور؟
												</Link>
											</div>
										</div>
										<div>
											<button
												type="submit"
												className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
												disabled={submitting}
											>
												اكمل التسحيل
											</button>
										</div>
									</form>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="hidden lg:block relative w-0 flex-1">
				<img
					className="absolute inset-0 h-full w-full object-cover aspect-3"
					src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
					alt=""
				/>
			</div>
		</div>
	)
}

export default Signout
