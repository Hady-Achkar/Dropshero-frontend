import React, {useCallback, useState} from 'react'
import {loginAction} from '../../actions'
import {useDispatch} from 'react-redux'
import {login} from '../../services'
import Cookies from 'universal-cookie'
import {handleError} from '../../utils'
import {BundleType} from '../../types'
import {ErrorToast} from '../../components'
import {useHistory} from 'react-router-dom'

const Index = () => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	})
	const [errorLoginOpen, setErrorLoginOpen] = useState<boolean>(false)
	const history = useHistory()
	const cookies = new Cookies()
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
					history.push('/')
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
	return (
		<div
			style={{minHeight: '100vh'}}
			dir="ltr"
			className="bg-gray-50 py-16 sm:py-24"
		>
			<div className="relative sm:py-16">
				<div aria-hidden="true" className="hidden sm:block">
					<div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
					<svg
						className="absolute top-8 left-1/2 -ml-3"
						width={404}
						height={392}
						fill="none"
						viewBox="0 0 404 392"
					>
						<defs>
							<pattern
								id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
								x={0}
								y={0}
								width={20}
								height={20}
								patternUnits="userSpaceOnUse"
							>
								<rect
									x={0}
									y={0}
									width={4}
									height={4}
									className="text-gray-200"
									fill="currentColor"
								/>
							</pattern>
						</defs>
						<rect
							width={404}
							height={392}
							fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
						/>
					</svg>
				</div>
				<div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
					<div className="relative rounded-2xl px-6 py-10 bg-gray-900 overflow-hidden shadow-xl sm:px-12 sm:py-20">
						<div
							aria-hidden="true"
							className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
						>
							<svg
								className="absolute inset-0 h-full w-full"
								preserveAspectRatio="xMidYMid slice"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 1463 360"
							>
								<path
									className="text-gray-500 text-opacity-40"
									fill="currentColor"
									d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
								/>
								<path
									className="text-gray-700 text-opacity-40"
									fill="currentColor"
									d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
								/>
							</svg>
						</div>
						<div className="relative">
							<div className="sm:text-center">
								<h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
									Dropshero is being updated to a newer version!
								</h2>
								<p className="mt-6 mx-auto max-w-2xl text-lg text-green-200">
									If you already have an account, please sign in here.
								</p>
							</div>
							<form
								onSubmit={handleSubmit}
								className="space-y-6 max-w-md mx-auto my-5"
							>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-white"
									>
										Email address
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
										className="block text-sm font-medium text-white"
									>
										Password
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

								<div>
									<button
										type="submit"
										className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
									>
										Sign in
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<ErrorToast
				message={'Wrong email or password.'}
				setOpen={setErrorLoginOpen}
				open={errorLoginOpen}
				title={'Error Signing in'}
			/>
		</div>
	)
}

export default Index
