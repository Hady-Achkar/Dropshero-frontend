import {ExternalLinkIcon} from '@heroicons/react/outline'
import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppState} from '../../reducers'
import {AccountStatus} from '../../types'

const Cta = () => {
	const {
		user: {status},
	} = useSelector((state: AppState) => state.auth)
	return (
		<div className="bg-gradient-to-bl from-green-600 to-blue-900">
			<div className="max-w-3xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
					<span className="block"> لا داعي للبحث عن منتج بعد اليوم</span>
				</h2>
				<p className="mt-4 text-lg leading-7 text-gray-300">
					لاننا سنقوم بذلك يومياً من اجلك و سنجد منتجات رابحة لتبعها في متجرك
					الخاص مع الحصول على اعلان قابل للاستخدام و تحليل كامل للمنتج و
					المنافسين
				</p>
				<Link
					to={status === AccountStatus.VERIFIED ? '/products' : '/sign-up'}
					style={{color: '#5e8e3e'}}
					className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-sky-600 bg-white hover:bg-indigo-50 sm:w-auto"
				>
					{status === AccountStatus.VERIFIED ? (
						<span>تصفح المنتجات</span>
					) : (
						<span>سجل الآن</span>
					)}
				</Link>
			</div>
		</div>
	)
}

export default Cta
