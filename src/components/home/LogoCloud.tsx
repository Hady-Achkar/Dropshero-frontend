import React from 'react'
import {Images} from '../../constants'
const LogoCloud = () => {
	return (
		<div className="bg-white">
			<div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
				<p className="text-center text-base font-medium uppercase text-gray-600 tracking-wider">
					يمكنك استخدام المنتجات لبيعها على افضل منصات التجارة
				</p>
				<div className="mt-6 grid grid-cols-5 gap-0.5  lg:mt-8">
					<div className="col-span-1 flex justify-center ">
						<img
							src="https://img.icons8.com/color/144/000000/amazon.png"
							className="max-h-14"
						/>
					</div>
					<div className="col-span-1 flex justify-center ">
						<img
							className="max-h-14"
							src="https://img.icons8.com/color/144/000000/shopify.png"
						/>
					</div>
					<div className="col-span-1 flex justify-center ">
						<img
							className="max-h-14"
							src="https://img.icons8.com/color/144/000000/ebay.png"
						/>
					</div>
					<div className="col-span-1 flex justify-center ">
						<img
							className="max-h-14"
							src="https://img.icons8.com/fluency/144/000000/wordpress.png"
						/>
					</div>

					<div className="col-span-1 flex justify-center ">
						<img
							className="max-h-14"
							src="https://img.icons8.com/color/144/000000/aliexpress.png"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default LogoCloud
