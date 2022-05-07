import React, {useCallback, useState} from 'react'
import {MailIcon} from '@heroicons/react/outline'
import {Footer, Header, SuccessToast} from '../../components'
import {addNewContact, IAddNewContact} from '../../services'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const Index = () => {
	const initState: IAddNewContact = {
		fullName: '',
		email: '',
		message: '',
	}
	const [contactData, setContactData] = useState<IAddNewContact>(initState)
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setContactData((prevState) => ({
				...prevState,
				[event.target.id]: event.target.value,
			}))
		},
		[]
	)
	const [toastOpen, setToastOpen] = useState<boolean>(false)
	const handleSubmit = useCallback(
		(event: React.FormEvent) => {
			event.preventDefault()
			addNewContact(contactData)
				.then((res) => {
					setToastOpen(true)
					setContactData(initState)
				})
				.catch((err) => {
					if (err.response) {
						console.log(err.response.data)
					} else {
						console.log(err)
					}
				})
		},
		[contactData]
	)

	return (
		<React.Fragment>
			<Header />
			<div className="">
				<div className="max-w-7xl mx-auto lg:grid lg:grid-cols-5">
					<div className=" py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
						<div className="max-w-lg mx-auto">
							<h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
								تواصل معنا
							</h2>
							<p className="mt-3 text-lg leading-6 text-gray-500">
								كيف يمكننا مساعدتك؟ سوف نرد عليك بأسرع وقت ممكن
							</p>
							<dl className="mt-8 text-base text-gray-500">
								<dt className="sr-only">Email</dt>
								<dd className="flex">
									<MailIcon
										className="flex-shrink-0 h-6 w-6 text-gray-400"
										aria-hidden="true"
									/>
									<span className="ml-3">support@dropshero.com</span>
								</dd>
							</dl>
							<p className="mt-6 text-base text-gray-500">
								انضم الينا و استمتع بالخدمات التي تساعدك
								<Link
									to="sign-up"
									className="font-medium text-green-700 underline mx-1"
								>
									سجل معنا
								</Link>
								.
							</p>
						</div>
					</div>
					<div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
						<div className="max-w-lg mx-auto lg:max-w-none">
							<form
								onSubmit={handleSubmit}
								className="grid grid-cols-1 gap-y-6"
							>
								<div>
									<label htmlFor="full-name" className="sr-only">
										الاسم الكامل
									</label>
									<input
										required
										type="text"
										name="full-name"
										id="fullName"
										autoComplete="name"
										onChange={handleChange}
										value={contactData?.fullName}
										className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
										placeholder="الاسم الكامل"
									/>
								</div>
								<div>
									<label htmlFor="email" className="sr-only">
										البريد الالكتروني
									</label>
									<input
										required
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										onChange={handleChange}
										value={contactData?.email}
										className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-green-500 focus:border-green-500 border-gray-300 rounded-md"
										placeholder="البريد الالكتروني"
									/>
								</div>
								<div>
									<label htmlFor="message" className="sr-only">
										الرسالة
									</label>
									<textarea
										required
										name="message"
										rows={4}
										id={'message'}
										onChange={handleChange}
										value={contactData?.message}
										className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-green-500 focus:border-green-500 border border-gray-300 rounded-md"
										placeholder="الرسالة"
										defaultValue={''}
									/>
								</div>
								<div>
									<button
										type="submit"
										className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
									>
										ارسال
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<SuccessToast
					message={'تم ارسال رسالتك بنجاح'}
					setOpen={setToastOpen}
					open={toastOpen}
					title={'تواصل معنا'}
				/>
			</div>
			<Footer />
		</React.Fragment>
	)
}
export default Index
