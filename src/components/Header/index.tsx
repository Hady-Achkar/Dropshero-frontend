import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../reducers'

import React, {Fragment, useState} from 'react'
import {Popover, Transition, Menu} from '@headlessui/react'
import {Link} from 'react-router-dom'
import {logoutAction} from '../../actions'
import {ChevronDownIcon, MenuIcon, XIcon} from '@heroicons/react/solid'
import classNames from 'classnames'
import ConfirmationModal from '../common/ConfirmationModal'
import {Images} from '../../constants'
import {AccountStatus, BundleType} from '../../types'
import {FireIcon, HeartIcon} from '@heroicons/react/outline'

const navigation = [
	{
		id: 1,
		name: 'الصفحة الرئيسية',
		href: '/',
	},
	{
		id: 2,
		name: 'سجل حساب جديد',
		href: '/sign-up',
	},
]

const Index = () => {
	const {
		isAuthenticated,
		user: {status, email, bundleType, activeSubscription},
	} = useSelector((state: AppState) => state.auth)
	const [open, setOpen] = useState<boolean>(false)

	const dispatch = useDispatch()
	const handleLogout = () => {
		dispatch(logoutAction())
		setOpen(false)
	}

	return (
		<Fragment>
			<div className="sticky pt-6 pb-16 sm:pb-24 lg:pb-4 shadow-sm ">
				<Popover>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 ">
						<nav
							className="relative flex items-center justify-between sm:h-10 md:justify-center "
							aria-label="Global"
						>
							<div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
								<div className="flex items-center justify-between w-full md:w-auto">
									<Link to="/">
										<span className="sr-only">Workflow</span>
										<img
											className="h-16 w-auto"
											src={Images.Logo.src}
											alt={Images.Logo.alt}
										/>
									</Link>
									<div className="flex items-center md:hidden">
										{bundleType === BundleType.MONTHLY && (
											<div>
												{status === AccountStatus.VERIFIED && (
													<Link
														to="/upgrade"
														className="inline-flex items-center px-1 py-1.5 rounded-full text-sm font-medium bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500 text-gray-200 hover:opacity-90"
													>
														<FireIcon className="h-5 w-5 text-white ml-2" /> مدى
														الحياة
													</Link>
												)}
											</div>
										)}
										{status === AccountStatus.VERIFIED && (
											<Fragment>
												<a
													href={'https://dropshero.getrewardful.com/signup'}
													target="_blank"
													className="font-medium text-lgtext-gray-500 hover:text-gray-900 mx-4 underline"
													rel="noreferrer"
												>
													برنامج الافلييت
												</a>
											</Fragment>
										)}
									</div>

									<div className="-mr-2 flex items-center md:hidden">
										<Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
											<span className="sr-only">Open main menu</span>
											<MenuIcon className="h-6 w-6" aria-hidden="true" />
										</Popover.Button>
									</div>
								</div>
							</div>
							<div className="hidden md:flex items-center ">
								{isAuthenticated ? (
									<React.Fragment>
										<Link
											to={
												status === AccountStatus.VERIFIED ||
												status === AccountStatus.TRIAL
													? '/products'
													: '/pricing'
											}
											className="font-medium text-lgtext-gray-500 hover:text-gray-900 mx-4"
										>
											المنتجات
										</Link>
										{status === AccountStatus.VERIFIED && (
											<Fragment>
												<a
													href={'https://dropshero.getrewardful.com/signup'}
													target="_blank"
													className="font-medium text-lgtext-gray-500 hover:text-gray-900 mx-4 underline"
													rel="noreferrer"
												>
													انضم لبرنامج الافلييت
												</a>
											</Fragment>
										)}

										{status === AccountStatus.NOT_VERIFIED && (
											<Link
												to="/pricing"
												className="font-medium text-lgtext-gray-500 hover:text-gray-900 mx-4"
											>
												قائمة العروض
											</Link>
										)}
										{bundleType === BundleType.MONTHLY && (
											<div>
												{status === AccountStatus.VERIFIED && (
													<Link
														to="/upgrade"
														className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500 text-gray-200 hover:opacity-90"
													>
														<FireIcon className="h-5 w-5 text-white ml-2" />{' '}
														اشترك لمدى الحياة
													</Link>
												)}
											</div>
										)}
									</React.Fragment>
								) : (
									navigation.map((item) => (
										<Link
											key={item.name}
											to={item.href}
											className="font-medium text-lgtext-gray-500 hover:text-gray-900 mx-4 underline"
										>
											{item.name}
										</Link>
									))
								)}
								<a
									href={'https://tny.sh/VVw3vlO'}
									target="_blank"
									className="font-medium text-lgtext-gray-500 hover:text-gray-900 mx-4 underline"
									rel="noreferrer"
								>
									تواصل معنا عبر وتساب
								</a>
								{isAuthenticated && AccountStatus.VERIFIED && (
									<Link
										to={'influencers'}
										className="font-medium text-lgtext-gray-500 hover:text-gray-900 mx-4 underline"
									>
										 قائمة المؤثرين
									</Link>
								)}
							</div>
							<div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
								{isAuthenticated ? (
									<div className="flex items-center space-x-4 bg-white">
										<Menu
											as="div"
											className="inline-flex rounded-md bg-opacity-100 "
										>
											<div>
												<Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-200 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ">
													الحساب الشخصي
													<ChevronDownIcon
														className="-ml-1 mr-2 h-5 w-5"
														aria-hidden="true"
													/>
												</Menu.Button>
											</div>

											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="origin-top-right absolute right-0 mt-12 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
													<div className="px-4 py-3 bg-green-50">
														<p className="text-sm">مسجل بالبريد الالكتروني</p>
														<p className="text-sm font-medium text-gray-900 truncate">
															{email}
														</p>
													</div>
													<div className="py-1">
														<Menu.Item>
															{({active}) => (
																<Link
																	to="/account-settings"
																	className={classNames(
																		active
																			? 'bg-gray-100 text-gray-900'
																			: 'text-gray-700',
																		'block px-4 py-2 text-sm '
																	)}
																>
																	اعدادات الحساب
																</Link>
															)}
														</Menu.Item>
													</div>
													<div className="py-1">
														<Menu.Item>
															{({active}) => (
																<button
																	type="submit"
																	className={classNames(
																		active
																			? 'bg-red-100 text-gray-900'
																			: 'text-gray-700',
																		'block w-full text-right px-4 py-2 text-sm'
																	)}
																	// onClick={() => setOpen(true)}
																	onClick={() => setOpen(true)}
																>
																	تسجيل الخروج
																</button>
															)}
														</Menu.Item>
													</div>
												</Menu.Items>
											</Transition>
										</Menu>
										{status === AccountStatus.TRIAL && (
											<Link className="px-2" to="/favs">
												<HeartIcon className="w-5 h-5 text-red-500 stroke" />
											</Link>
										)}
										{status === AccountStatus.VERIFIED && (
											<Link className="px-2" to="/favs">
												<HeartIcon className="w-5 h-5 text-red-500 stroke" />
											</Link>
										)}
									</div>
								) : (
									<Fragment>
										<span className="inline-flex rounded-md shadow">
											<Link
												to="/sign-in"
												className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50"
											>
												تسجيل الدخول
											</Link>
										</span>
										<span className="inline-flex rounded-md shadow mx-2">
											<Link
												to={isAuthenticated ? '/products' : '/sign-up'}
												className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md bg-green-600 text-white hover:bg-green-700"
											>
												الكشف عن المنتجات{' '}
											</Link>
										</span>
									</Fragment>
								)}
							</div>
						</nav>
					</div>

					<Transition
						as={Fragment}
						enter="duration-150 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel
							focus
							className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
						>
							<div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
								<div className="px-5 pt-4 flex items-center justify-between">
									<div>
										<img
											className="h-16 w-auto"
											src={Images.Logo.src}
											alt={Images.Logo.alt}
										/>
									</div>

									<div className="-mr-2">
										<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
											<span className="sr-only">Close menu</span>
											<XIcon className="h-6 w-6" aria-hidden="true" />
										</Popover.Button>
									</div>
								</div>
								<div className="px-2 pt-2 pb-3">
									{navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
										>
											{item.name}
										</a>
									))}
									<a
										href={'https://tny.sh/VVw3vlO'}
										className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
									>
										تواصل معنا عبر وتساب
									</a>
									{status === AccountStatus.VERIFIED && (
										<Link
											to="/influencers"
											className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
										>
											قائمة المؤثرين
										</Link>
									)}
								</div>
								{!isAuthenticated ? (
									<Fragment>
										<Link
											to="/sign-in"
											className="block w-full px-5 py-3 text-center font-medium text-green-600 bg-gray-50 hover:bg-gray-100"
										>
											تسجيل الدخول
										</Link>
										<Link
											to={'/sign-up'}
											className="block w-full px-5 py-3 text-center font-medium text-green-600 bg-gray-50 hover:bg-gray-100"
										>
											الكشف عن المنتجات{' '}
										</Link>
									</Fragment>
								) : (
									<>
										{status === AccountStatus.VERIFIED && (
											<div className="px-2 pb-3">
												<Link
													className="inline-flex items-center space-x-2 justify-center w-full px-5 py-2 text-center font-medium bg-red-500 text-gray-200 hover:opacity-90"
													to="/favs"
												>
													قائمة المفضلات
													<HeartIcon className="w-4 h-4 " />
												</Link>
											</div>
										)}
										{bundleType === BundleType.MONTHLY && (
											<div>
												{status === AccountStatus.VERIFIED && (
													<Link
														to="/upgrade"
														className="inline-flex justify-center w-full px-5 py-2 text-center font-medium bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500 text-gray-200 hover:opacity-90"
													>
														اشترك لمدى الحياة
													</Link>
												)}
											</div>
										)}
										<button
											onClick={() => setOpen(true)}
											className="block w-full px-5 py-3 text-center font-medium text-gray-400 bg-gray-50 hover:bg-gray-100"
										>
											تسجيل الخروج
										</button>
									</>
								)}
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
			</div>
			<ConfirmationModal
				open={open}
				variant="Warning"
				title="تسجيل الخروج"
				text="هل تريد تسجيل الخروج من حسابك؟"
				buttonText="نعم"
				setOpen={() => setOpen(false)}
				action={handleLogout}
			/>
		</Fragment>
	)
}
export default Index
