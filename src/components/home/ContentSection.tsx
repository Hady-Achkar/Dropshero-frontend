import React from 'react'
import {useHistory} from 'react-router-dom'
const ContentSection = () => {
	const history = useHistory()
	return (
		<div className="relative py-16 bg-white overflow-hidden">
			<div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
				<div
					className="relative h-full text-lg max-w-prose mx-auto"
					aria-hidden="true"
				>
					<svg
						className="absolute top-12 left-full transform translate-x-32"
						width={404}
						height={384}
						fill="none"
						viewBox="0 0 404 384"
					>
						<defs>
							<pattern
								id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
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
							height={384}
							fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
						/>
					</svg>
					<svg
						className="absolute top-12 right-full transform -translate-y-1/2 -translate-x-32"
						width={404}
						height={384}
						fill="none"
						viewBox="0 0 404 384"
					>
						<defs>
							<pattern
								id="f210dbf6-a58d-4871-961e-36d5016a0f49"
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
							height={384}
							fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
						/>
					</svg>
				</div>
			</div>
			<div className="relative px-4 sm:px-6 lg:px-8 text-center leading-3">
				<div className="text-lg max-w-prose mx-auto">
					<h1>
						<span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-green-900 sm:text-4xl">
							منتج جديد يوميا من اختيارنا
						</span>
					</h1>
					<p className="mt-8 text-xl text-gray-500 leading-8">
						سنقوم يوميا بالبحث بشكل يدوي عن منتجات مربحة في مجال الدروب شيبنغ
						بطرقنا المختلفة حيث انه لدينا فريق كامل متخصص فقط في البحث عن منتجات
						في السوشال ميديا و التجسس علي المتاجر الناجحة لنعرف المنتج الرابح
						اليوم (و ليس منذ شهرين){' '}
					</p>
				</div>
				<div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto ">
					<p>
						كل ما عليك فعله هو تسجيل الدخول والبدء بتجريب احد المنتجات الرابحة
						التي نضيفها بشكل يومي والبدء بتجريب احد المنتجات الرابحة التي نضيفها
						بشكل يومي
						<span className="font-bold text-gray-700 underline block">
							لن تنتهي افكار منتجاتك الرابحة ابدا بعد اشتراكك معنا
						</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default ContentSection
