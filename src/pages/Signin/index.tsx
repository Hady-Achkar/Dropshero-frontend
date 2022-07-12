import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loginAction, startGoogleLogin} from '../../actions'
import {Images} from '../../constants'
import {GoogleLoginResponse} from 'react-google-login'
import {Link, useHistory} from 'react-router-dom'
import {ErrorToast} from '../../components'
import {login} from '../../services'
import {BundleType} from '../../types'
import Cookies from 'universal-cookie'
import {handleError} from '../../utils'
import {AppState} from '../../reducers'

const Signin = () => {
	const history = useHistory()
	const {isAuthenticated} = useSelector((state: AppState) => state.auth)
	useEffect(() => {
		if (!isAuthenticated) {
			history.push('/maintenance')
		}
	}, [])

	const [userData, setUserData] = useState({
		email: '',
		password: '',
	})
	const [errorLoginOpen, setErrorLoginOpen] = useState<boolean>(false)
	const dispatch = useDispatch()
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setUserData((prevState) => ({
				...prevState,
				[event.target.id]: event.target.value,
			}))
		},
		[]
	)
	const cookies = new Cookies()
	const handleSubmit = useCallback(
		(event: React.FormEvent) => {
			event.preventDefault()
			// dispatch(startLogin(userData))
			const {email, password} = userData
			login(email.toLowerCase(), password)
				.then((res) => {
					const {
						token,
						fullName,
						email,
						_id,
						type,
						stripeId,
						activeSubscription,
						isTrialLegit,
						subscriptions,
						inTrial,
						paymentMethods,
						accountStatus,
						favorites,
						bundleType,
					} = res.data
					cookies.set('token', token, {path: '/'})
					cookies.set('fullName', fullName, {path: '/'})
					cookies.set('email', email, {path: '/'})
					cookies.set('_id', _id, {path: '/'})
					cookies.set('type', type, {path: '/'})
					cookies.set('stripeId', stripeId, {path: '/'})
					dispatch(
						loginAction({
							token,
							fullName,
							email,
							_id,
							type,
							stripeId,
							activeSubscription,
							subscriptions,
							inTrial,
							isTrialLegit,
							paymentMethods,
							status: accountStatus,
							favorites,
							bundleType: bundleType ? bundleType : BundleType.MONTHLY,
						})
					)
				})
				.catch((err) => {
					if (err.response) {
						setErrorLoginOpen(true)
						handleError(err)
					} else {
						handleError(err)
					}
				})
		},
		[userData]
	)
	const handleGoogleLogin = (googleData: GoogleLoginResponse) => {
		const {givenName, familyName, email} = googleData.profileObj
		dispatch(
			startGoogleLogin({fname: givenName, lname: familyName, email: email})
		)
	}
	//@ts-ignore
	const handleGoogleFailure = (result) => {
		alert(result)
	}

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
							سجل الدخول الى حسابك
						</h2>
						{/*<p className="mt-2 text-sm text-gray-600">*/}
						{/*	و{' '}*/}
						{/*	<Link to="/sign-up" className="font-medium text-green-600 ">*/}
						{/*		ابدأ الفترة التجريبية لمدة ١٤ يوم{' '}*/}
						{/*	</Link>*/}
						{/*</p>*/}
					</div>

					<div className="mt-8">
						<div>
							<div>
								{/*							<p className="text-sm font-medium text-gray-700">*/}
								{/*								تسحيل عن طريق*/}
								{/*							</p>*/}

								{/*							<div className="grid grid-cols-2 gap-3 mt-4">*/}
								{/*								<div>*/}
								{/*									<GoogleLogin*/}
								{/*										clientId="933337790979-cguncfg5t0pn719cejfii2futvkbfrif.apps.googleusercontent.com"*/}
								{/*										//@ts-ignore*/}
								{/*										onSuccess={handleGoogleLogin}*/}
								{/*										onFailure={handleGoogleFailure}*/}
								{/*										render={(renderProps) => (*/}
								{/*											<button*/}
								{/*												onClick={renderProps.onClick}*/}
								{/*												className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"*/}
								{/*											>*/}
								{/*												<span className="sr-only">Sign in with Google</span>*/}
								{/*												<svg*/}
								{/*													width="24px"*/}
								{/*													height="24px"*/}
								{/*													viewBox="0 0 24 24"*/}
								{/*													xmlns="http://www.w3.org/2000/svg"*/}
								{/*													xmlnsXlink="http://www.w3.org/1999/xlink"*/}
								{/*												>*/}
								{/*													<path*/}
								{/*														fill="#EA4335 "*/}
								{/*														d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"*/}
								{/*													/>*/}
								{/*													<path*/}
								{/*														fill="#34A853"*/}
								{/*														d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"*/}
								{/*													/>*/}
								{/*													<path*/}
								{/*														fill="#4A90E2"*/}
								{/*														d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"*/}
								{/*													/>*/}
								{/*													<path*/}
								{/*														fill="#FBBC05"*/}
								{/*														d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"*/}
								{/*													/>*/}
								{/*												</svg>*/}
								{/*											</button>*/}
								{/*										)}*/}
								{/*									/>*/}
								{/*								</div>*/}
								{/*								<button*/}
								{/*									// onClick={}*/}
								{/*									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"*/}
								{/*								>*/}
								{/*									<span className="sr-only">Sign in with GitHub</span>*/}
								{/*									<svg*/}
								{/*										width="24px"*/}
								{/*										height="24px"*/}
								{/*										version="1.1"*/}
								{/*										id="Layer_1"*/}
								{/*										xmlns="http://www.w3.org/2000/svg"*/}
								{/*										xmlnsXlink="http://www.w3.org/1999/xlink"*/}
								{/*										x="0px"*/}
								{/*										y="0px"*/}
								{/*										viewBox="0 0 408.788 408.788"*/}
								{/*										xmlSpace="preserve"*/}
								{/*									>*/}
								{/*										<path*/}
								{/*											fill="#475993"*/}
								{/*											d="M353.701,0H55.087C24.665,0,0.002,24.662,0.002,55.085v298.616c0,30.423,24.662,55.085,55.085,55.085*/}
								{/*h147.275l0.251-146.078h-37.951c-4.932,0-8.935-3.988-8.954-8.92l-0.182-47.087c-0.019-4.959,3.996-8.989,8.955-8.989h37.882*/}
								{/*v-45.498c0-52.8,32.247-81.55,79.348-81.55h38.65c4.945,0,8.955,4.009,8.955,8.955v39.704c0,4.944-4.007,8.952-8.95,8.955*/}
								{/*l-23.719,0.011c-25.615,0-30.575,12.172-30.575,30.035v39.389h56.285c5.363,0,9.524,4.683,8.892,10.009l-5.581,47.087*/}
								{/*c-0.534,4.506-4.355,7.901-8.892,7.901h-50.453l-0.251,146.078h87.631c30.422,0,55.084-24.662,55.084-55.084V55.085*/}
								{/*C408.786,24.662,384.124,0,353.701,0z"*/}
								{/*										/>*/}
								{/*									</svg>*/}
								{/*								</button>*/}
								{/*							</div>*/}
							</div>

							<div className="mt-6 relative">
								<div
									className="absolute inset-0 flex items-center"
									aria-hidden="true"
								>
									<div className="w-full border-t border-gray-300" />
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-white text-gray-500">
										التسجيل بسيط و لا يحتاج اكثر من دقيقة
									</span>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<form onSubmit={handleSubmit} className="space-y-6">
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700"
									>
										البريد الالكتروني
									</label>
									<div className="mt-1">
										<input
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											required
											onChange={handleChange}
											value={userData?.email}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="space-y-1">
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700"
									>
										كلمة المرور
									</label>
									<div className="mt-1">
										<input
											id="password"
											name="password"
											type="password"
											autoComplete="current-password"
											required
											onChange={handleChange}
											value={userData?.password}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
										/>
									</div>
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
									<div className="flex items-center">
										<Link
											to="/sign-up"
											className="block text-sm font-medium text-blue-500 underline hover:text-blue-600"
										>
											انشاء حساب جديد
										</Link>
									</div>
								</div>
								<div>
									<button
										type="submit"
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
									>
										سجل الدخول
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				{/*TODO: Translate here*/}
				<ErrorToast
					message={'البريد الإلكتروني أو كلمة السر خاطئة'}
					setOpen={setErrorLoginOpen}
					open={errorLoginOpen}
					title={'تسجيل الدخول'}
				/>
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

export default Signin
