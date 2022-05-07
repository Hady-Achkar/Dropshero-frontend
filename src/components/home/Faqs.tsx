import React from 'react'

const faqs = [
	{
		id: 1,
		question:
			'هل يمكنني البدء مباشرةً بإنشاء متجر بناءاً على المنتجات الموجودة؟',
		answer:
			'نعم يمكنك البدء مباشرةً بها حيث اننا سنعطيك اسم المنتج, الصورة, الوصف, السعر, الإعلان, النص الاعلاني, روابط الموردين, طريقة التسويق و الاستهدافات المناسبة',
	},
	{
		id: 2,
		question: 'هل البرنامج مناسب للمبتدئين ام المتقدمين؟',
		answer:
			'البرنامج مناسب لكل من يبحث عن منتج رابح للبدء به او التوسع به في مجال الدروب شيبنغ بحيث يتجنب البدء بمنتجات خاسرة و تضيع الوقت في تجريبها',
	},
	{
		id: 3,
		question: 'ماذا يحصل بعد الاشتراك؟',
		answer:
			'ستتمكن بعد الاشتراك من اكتشاف المنتجات الرابحة الجديدة يومياً بيحث يتم اضافة المنتجات الى حسابك بشكل يومي كما يمكنك اكتشاف المنتجات الرابحة التي وجدناها سابقاً قبل تاريخ اشتراكك معنا',
	},
]
const Faqs = () => {
	return (
		<div className="bg-gray-50">
			<div className="max-w-7xl mx-auto py-12 px-4 divide-y divide-gray-200 sm:px-6 lg:py-16 lg:px-8">
				<h2 className="text-3xl font-extrabold text-gray-900">
					الأسئلة الشائعة
				</h2>
				<div className="mt-8">
					<dl className="divide-y divide-gray-200">
						{faqs.map((faq) => (
							<div
								key={faq.id}
								className="pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8"
							>
								<dt className="text-base font-medium text-gray-900 md:col-span-5">
									{faq.question}
								</dt>
								<dd className="mt-2 md:mt-0 md:col-span-7">
									<p className="text-base text-gray-500">{faq.answer}</p>
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	)
}

export default Faqs
