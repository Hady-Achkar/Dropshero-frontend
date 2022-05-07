import React from 'react'
import {Link} from 'react-router-dom'

const Index = () => {
	return (
		<>
			<div
				style={{minHeight: '100vh'}}
				className=" h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
			>
				<div className="max-w-max mx-auto">
					<main className="sm:flex">
						<p className="text-4xl font-extrabold text-gray-600 sm:text-5xl">
							404
						</p>
						<div className="sm:ml-6">
							<div className="sm:border-r sm:border-gray-200 sm:pr-6">
								<h1 className="text-4xl  text-gray-900 tracking-tight sm:text-5xl">
									الصفحة غير موجودة
								</h1>
								<p className="mt-1 text-base text-gray-500">
									الرجاء التحقق من الرابط و المحاولة مجددا
								</p>
							</div>
							<div className="mt-10 flex space-x-3 sm:border-r sm:border-transparent sm:pr-6">
								<Link
									to="/"
									className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
								>
									الصفحة الرئيسية
								</Link>
								<Link
									to="/contact-us"
									className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
								>
									تواصل معنا
								</Link>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	)
}

export default Index
