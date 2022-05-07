import {CheckCircleIcon} from '@heroicons/react/solid'
import React from 'react'
import {Link} from 'react-router-dom'

const Index = () => {
	return (
		<div className="h-screen bg-slate-50 flex items-center">
			<div className="max-w-2xl mx-auto bg-white shadow rounded-lg  py-12 px-12">
				<CheckCircleIcon className="h-32 w-32 text-green-400 mx-auto" />
				<p className="font-medium text-3xl text-gray-500 text-center">
					شكرا لك للاشتراك ب Dropshero
				</p>
				<div className="w-full inline-flex justify-center mx-auto my-4">
					<Link
						className="text-center py-2 px-4 rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-br  from-green-500 to-blue-400 border-0 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
						to="/products"
					>
						كشف المنتجات
					</Link>
				</div>
			</div>
		</div>
	)
}
export default Index
