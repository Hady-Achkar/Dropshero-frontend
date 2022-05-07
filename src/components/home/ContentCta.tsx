import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {AppState} from '../../reducers'
import {AccountStatus} from '../../types'
const ContentCta = () => {
	const {
		user: {status},
	} = useSelector((state: AppState) => state.auth)
	return (
		<div className="bg-gradient-to-br from-green-600 to-blue-900">
			<div className="max-w-4xl  mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
					<span className="block"> وفر الوقت و المال</span>
				</h2>
				<br />
				<blockquote className="mt-4 text-lg leading-9 text-green-200">
					وفر الوقت و الجهد و احصل على منتجات رابحة يومياً بدون خبرة مسبقة و
					بدون الحاجة لمعرفة حيل ايجاد المنتجات الرابحة و كيفية تقييمها وكيفية
					دراسة السوق, لاننا سنقوم بذلك من اجلك.(في حال قررت اجراء بحث عن المنتج
					لوحدك ستحتاج الى ما يفوق ال ١٠ ساعات او ستستخدم خدمات مدفوعة تكلفك ما
					لا يقل عن ٥٠ دولار للمنتج الرابح, و في حال اردت اجراء تحليل للمنتج
					ستحتاج الى عدة ايام او ستضطر الى شراء خدمة تحليل سوق و دراسة المنافسين
					و ستكلفك ما لا يقل عن ١٠٠ دولار) … اما في حال اشتركت في برنامج
					Dropshero ستحصل على كل ذلك بشكل يومي لمدة ٥ سنوات عبر اشتراك مرة
					واحدة.
				</blockquote>

				{status !== AccountStatus.VERIFIED && (
					<Link
						to="/pricing"
						className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 sm:w-auto"
					>
						انضم الينا الان
					</Link>
				)}
			</div>
		</div>
	)
}
export default ContentCta
