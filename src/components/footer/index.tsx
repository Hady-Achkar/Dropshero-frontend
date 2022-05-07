import {FireIcon} from '@heroicons/react/solid'
import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppState} from '../../reducers'
import {AccountStatus, BundleType} from '../../types'
const navigation = {
	main: [
		{name: 'الشروط و الأحكام', href: '/terms'},
		{name: 'سياسة الخصوصية', href: './privacy'},
	],
}

const Index = () => {
	const {
		user: {bundleType, status},
	} = useSelector((state: AppState) => state.auth)
	return (
		<footer className="bg-slate-50">
			<div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
				<nav
					className="-mx-5 -my-2 flex flex-wrap justify-center items-center"
					aria-label="Footer"
				>
					{bundleType === BundleType.MONTHLY && (
						<div>
							{status === AccountStatus.VERIFIED && (
								<Link
									to="/upgrade"
									className="inline-flex items-center px-1 py-1.5 rounded-full text-sm font-medium bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500 text-gray-200 hover:opacity-90"
								>
									<FireIcon className="h-5 w-5 text-white ml-2" /> اشترك لمدى
									الحياة
								</Link>
							)}
						</div>
					)}
					{status === AccountStatus.VERIFIED && (
						<a
							href={'https://dropshero.getrewardful.com/signup'}
							target="_blank"
							className="text-base underline px-5 text-gray-500 hover:text-gray-900"
							rel="noreferrer"
						>
							برنامج الافلييت
						</a>
					)}

					{navigation.main.map((item) => (
						<div key={item.name} className="px-5 py-2">
							<Link
								to={item.href}
								className="text-base underline text-gray-500 hover:text-gray-900"
							>
								{item.name}
							</Link>
						</div>
					))}
				</nav>
			</div>
		</footer>
	)
}

export default Index
