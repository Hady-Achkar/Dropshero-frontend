import React, {useEffect} from 'react'
import {CameraIcon} from '@heroicons/react/solid'
import {Footer, Header} from '../../components'

const Terms = () => {
	const grantOfRights = [
		{
			title: 'Rights Grant and Limitations',
			description: [
				'Subject to you complying with all of the terms of these Terms, we hereby grant you a limited, non-exclusive, non-transferable, non-sublicensable right to access and use the Services, solely in accordance with the terms of these Terms and for your personal use only. We reserve all rights, title and interest in and to the Services not expressly granted to you hereunder',
			],
		},
		{
			title: 'Registration',
			description: [
				'In order to use the Services, you must register and create an account (the “Account”). When using the Services, you agree that: (a) you provide true, accurate, and complete information about yourself; (b) you maintain and promptly update us to keep the information true, accurate, current, and complete; and (c) your use of the Services do not violate any applicable law or regulation. If you provide any information that is untrue, inaccurate, not current, or incomplete, we may suspend or terminate your Account and refuse any and all current or future use of the Services (or any portion thereof)',
				'You may not authorize any third party to access or use the Services on your behalf. You are responsible for maintaining the confidentiality of your username and password, including keeping it safe and secure to ensure it is not used by anyone else, and are fully responsible for all activities that occur under your Account, and agree to immediately notify us if you have reason to believe that there has been any unauthorized use or access to your Account, or any other breach of security. We will not be liable for any loss or damage arising from any unauthorized use of your Account. You shall be solely responsible and liable for any breach of this Agreement arising out of or resulting from use of your Account',
				'By providing us with your email address, you agree to receive all required notices electronically to that email address',
			],
		},
		{
			title: 'Limitations',
			description: [
				'You are not permitted, nor may you allow any third party, to copy, modify, translate, reverse engineer, decompile, disassemble, or create derivative works based on the Services, or any portion thereof. You may not sell, rent, lease, sub-lease, lend, redistribute, sublicense or otherwise transfer or allow the use by others of the Services, in whole or in part, on a permanent or temporary basis, whether or not for consideration. You are prohibited from, either by yourself or allowing a third party, to use our name, logos, or trademarks in any manner',
				'You specifically agree that each of the terms and conditions of this section are material and that failure to comply with these terms and conditions will constitute sufficient cause for us, inter alia, to immediately terminate the rights granted to you herein and cease providing you with the Services, and block your access to the Website. The presence of this section will not be relevant in determining the materiality of any other provision or breach by either party',
			],
		},
	]

	const restrictions = [
		'You may not (and you may not permit any third party to), unless otherwise explicitly permitted under this Agreement:	use the Services and/or any Content for any illegal, immoral, unlawful and/or unauthorized purposes; post any prohibited content',
		'Remove or disassociate, from the Content any restrictions and signs indicating our proprietary rights or of our licensors, including but not limited to any proprietary notices contained in such materials, and you represent and warrant that you will abide by all applicable laws in this respect;',
		'interfere with or violate other Users’ rights to privacy and other rights, or harvest or collect personally identifiable information about Users without their express consent, whether manually or with the use of any robot, spider, crawler, any search or retrieval application, or use other manual or automatic device, process or method to access the Services and retrieve, index and/or data-mine information;',
		'interfere with or disrupt the operation of the Services or the servers or networks that host the Services, or disobey any laws, regulations, requirements, procedures, or policies of such servers or networks',
		'falsely state or otherwise misrepresent your affiliation with any person or entity, or express or imply that we endorse you, your site, your business or any statement you make, or present false or inaccurate information about the Services',
		'take any action that imposes, or may impose, an unreasonable or disproportionately large load on our platform infrastructure, as determined by us',
		'bypass any measures we may use to prevent or restrict access to the Services',
		'copy, distribute, display, execute publicly, make available to the public, reduce to human readable form, decompile, disassemble, adapt, sublicense, make any commercial use, sell, rent, transfer, lend, process, compile, reverse engineer, combine with other software, translate, modify or create derivative works of any material that is subject to our proprietary rights, in any way or by any means, unless expressly permitted in these Terms and/or under any applicable laws which expressly permits such actions',
		'frame or mirror any part of the Services without our prior express written authorization',
		'create a database by systematically downloading and storing all or any of the Content from the Services',
		'sell, rent, lease, sublicense, gift, transfer, transmit, publish, or make available any portion of the Services to third parties, including but not limited to your affiliates',
		'disable, bypass, or interfere with any part of the Services in any way to override restrictions, enable features, or change the way the Services are intended to work',
		'systematically retrieve data or any kind of content from the Site or the Services to create or compile, directly or indirectly, a product, database, software, or directory without our prior permission',
		'collect usernames or emails of Users for marketing purposes such as sending unsolicited emails',
		'deceive, divert, or mislead us or Users of the Services with the purpose of obtaining sensitive account information or accessing Customer Data',
		'intentionally contact support with improper requests',
		'intentionally submit false reports of misuse or misconduct',
		'attempt to impersonate any User without permission for improper actions',
		'copy any part of the content that comes with the Services to use elsewhere, other than for promoting the Services, without prior permission from us',
		'try to access, derive, or extract any part of the source code of the Services and its components by reverse engineering, decompiling, decrypting, hacking, using special apps, or any other means',
		'use any kind of automated software or hardware to access or monitor the Services for any reason',
		'knowingly use methods or technologies that would impose unreasonable loads on the infrastructure that serves the Services',
		'modify, translate or change any part of the Services without prior permission from us',
		'copy or create any derivatives of the Services or Sites, or any part thereof',
		'develop or use any technology to impede the Services',
		'interfere with the integrity of the Services',
		'override or attempt to override the authentication process of the Services',
		'remove, modify, or conceal logos, trademarks, attributions, or other proprietary rights affixed to or provided within the Services or Sites or any third party we work with without our prior written approval',
		'use or display logos, marks, and other attributions related to us or the Services other than promoting the Services without our prior written approval',
		'use, copy, or imitate parts of the Services, or content within the Services or Sites, to develop a competing service or product',
		'use the Services for any illegal purposes or in a way that would be unlawful',
		'use the Services in a way that would be harmful to Users, Customers, or any third parties',
		'use the Services for the purpose of unauthorized marketing activities',
		'post disparaging, harmful, offensive, or fraudulent content that is open to the public that might harm us or other Users of the Services',
		'try to hack, access, or obtain login credentials, accounts, or the content of Customers, individuals, or organizations',
		'attempt to upload or transmit any harmful code such as viruses or Trojans to the Services or Sites that might interfere with, disrupt, alter, or modify the performance or integrity of the Services',
		'attempt to upload or transmit any material that acts as a passive or active information collector or transmitters, such as web bugs, cookies, or 1×1 gifs; or use the Services in any way that would be a breach of the Contract',
		'perform any type of security and/or vulnerability and penetration tests, as well as tests involving data scraping tools',
		'perform any type of bounty bug, performance or security testing without the prior consent of the company',
		'transmit or otherwise make available in connection with the Services any virus, worm, trojan horse, time bomb, web bug, spyware, or any other computer code, file, or program that may or is intended to damage or hijack the operation of any hardware, software, or telecommunications equipment, or any other actually or potentially harmful, disruptive, or invasive code or component',
		'use the Services for any purpose for which the Services are not intended; and infringe and/or violate these Terms',
	]

	const termination = [
		'We may terminate the Services and/or your access to your Account, at any time, in our discretion. Upon termination, for any reason, your Account will become inactive, your access to your Account will be blocked and the Services will be unavailable to you',
		'You may, at any time, deactivate your Account and cease using the Services',
		'We can suspend access to your Account if we believe, in our sole discretion, that one (or more) of the following events have occurred: (i) there is risk to the security or privacy of your Account; (ii) there is a threat to the security or integrity of our network or our servers; (iii) suspension is needed to protect the rights, property or safety, of our Users or the public; (iv) there is a basis for termination of your Account; (v) you have violated these Terms; and/or (vi) we are required to by law. We may provide you a notice in the event of any such suspension. During such suspension, you will not have the ability to use or access your Account. In the event that we will determine, in our sole discretion, that the reason for suspension of access to your Account has been resolved, we will restore access to your Account',
		'The parties agree that the following sections of these Terms will survive the termination of these Terms for any reason: ‎2.3, ‎3, ‎‎5, ‎6, ‎‎7, ‎8, ‎‎9, ‎‎10, ‎12 and ‎13',
	]

	const disclaimer = [
		'Company is not liable for any statements or guarantees made by a third party whose product is linked on the Website. You expressly waive and release any claim that you may have at any time for any damage or any issues against the Company or anyone on its behalf involved in the provision of the Services. You agree to indemnify and hold harmless the Company and its respective agents, heirs, assigns, contractors, and employees from any and all claims, demands, damages, rights of action or causes of action, present or future, arising out of or connected with your use of the Services',
		'We make no endorsement, guarantee, representation, or warranty of any kind with regards to any Content, or any other third-party content which may be available using the Services, and we assume no responsibility for any such content. If a User relies on such content, such User is doing it solely at his own risk, and you expressly relieve us from all liability arising from your use of any Content and of third parties’ content.',
		'You further understand and acknowledge that you may be exposed to Content, which is inaccurate, offensive, indecent, or objectionable, and you agree to take such risk of exposure and hereby waive, any legal or equitable rights or remedies you have or may have against us with respect thereto, and agree to indemnify and hold us, our affiliates, and/or licensors, harmless to the fullest extent allowed by law regarding all matters related to your use of the Services',
	]

	const refund = [
		'The Services are purchased through the Website, using the means of payment available on the Website as of the purchase date. The Company reserves the right to replace and/or alter, from time to time, the means of payment available on the Website, as well as to update the price of the Services, at the Company’s sole discretion and without need for justification',
		'The payments for the Services are made on a monthly subscription basis. The monthly subscription will automatically renew at the end of each month, and you will be charged automatically for the Services by the means of payment you initially provided, unless you provide written notice to the Company regarding your intention of terminating the subscription and the use of our Services and receive a termination confirmation',
		'If you choose to terminate the subscription and the use of our Services, you will not be eligible for a refund for the termination month',
		'We don’t offer any kind of refund to our lifetime plan & Monthly plan due the nature of the product we offer.',
	]
	const subs = [
		'Provisions. Provisions for subscription plans (monthly & lifetime) - The Services are purchased through the Website, using the means of payment available on the Website as of the purchase date. The Company reserves the right to replace and/or alter, from time to time, the means of payment available on the Website, as well as to update the price of the Services, at the Company’s sole discretion and without need for justification. However, if there is no change in the subscription package (i.e customer approved upgrade) - there shall be no changes in the monthly or lifetime subscriptions charges for the customer. In case the term of the subscription has ended or a special offer term has ended - change in price may occur at the Company’s sole discretion and without need for justification',
		'Billing.The Company may offer the Service through a variety of billing methods, which include, but are not limited to, one-time subscriptions, monthly recurring subscriptions, and lifetime subscriptions (“Subscription”). The Company will bill you on the date you subscribe to the Service (“Subscription Date”), and will continue to bill you in accordance with your selected Subscription until you cancel the Service. You must cancel your Subscription at least one day prior to the next billing date to avoid a Subscription renewal. Fees will be billed to your Payment Method on the calendar day corresponding to the Subscription Date. Subscription fees are fully earned upon payment. In some cases your payment date may change, for example if your Payment Method has not successfully settled or if your Effective Date began on a day not contained in a given month',
		'Payment Methods. To use the Service you must provide one or more Payment Methods. You can update your Payment Methods by going to the "Account" page of our Website. Following any update, you authorize us to continue to charge the applicable Payment Method(s). You authorize us to charge any Payment Method associated to your account in case your primary Payment Method is declined or no longer available to us for payment of your subscription fee. You remain responsible for any uncollected amounts. If a payment is not successfully settled, due to expiration, insufficient funds, or otherwise, and you do not cancel your account, we may suspend your access to the service until we have successfully charged a valid Payment Method. For some Payment Methods, the issuer may charge you certain fees relating to the processing of your Payment Method. Check with your Payment Method service provider for details',
		'Cancellation. You can cancel your membership at any time, and you will continue to have access to the Service through the end of your pre-paid billing cycle. We do not provide refunds or credits for any partial membership periods. To cancel, please navigate our Website to your account profile and follow instructions from there, or contact our Customer Support team at support@Dropshero.com. If you cancel your membership, your account will automatically close at the end of your current billing period',
		'Changes to the Price and Subscription Plans. We reserve the right to change our subscription plans or adjust pricing for our Service or any components thereof in any manner and at any time as we may determine in our sole and absolute discretion. Except as otherwise expressly provided for in these Terms, any price changes or changes to your subscription plan will take effect following notice to you',
		'No Refunds. Payments are nonrefundable and there are no refunds or credits for partially used periods. Following any cancellation, however, you will continue to have access to the service through the end of your current billing period',
	]
	const charges = [
		'Subscription plans and charges - The Company offers different recurring payment options to subscribe to the Dropshero services Membership: (1) an automatically billed monthly subscription ("Monthly Membership"); and (2) an automatically billed once subscription ("lifetime  Membership")',
		'Automatic renewal - The monthly subscription will automatically renew at the end of each month, and you will be charged automatically for the Services by the means of payment you initially provided, unless you provide written notice to the Company regarding your intention of terminating the subscription and the use of our Services and receive a termination confirmation',
		'Returns - The service is a digital subscription service, therefore there is no “return policy” (no physical items). In regards to refunds, the process shall be performed in accordance with Section 7. of this Terms of Use agreement',
		'Refunds - If you choose to terminate the subscription and the use of our Services within 30 days of the initial purchase, you may be eligible for a refund for the initial 30-day subscription period. Notwithstanding the above, if you choose to terminate your subscription after the initial 30-day subscription period by sending a written notice to the Company, you will not be eligible for a full refund for the termination month. It is hereby clear that any refund shall be at the sole discretion of the Company',
	]

	const rights = {
		main: [
			'It is agreed that the Services, the trademarks, service marks and logos contained therein, are owned by or licensed to us, subject to copyright and other intellectual property rights under the law. We hereby grant you a limited, revocable, non-sublicensable right to use the Services (excluding any software code) solely for your personal use',
			'Copyright Infringement',
			'If copyrighted content that belongs to you was posted on the Website without your permission please notify us at: Support@Dropshero.com',
			'Please include in your notice',
		],
		inner: [
			'An electronic or physical signature of the copyright owner or someone authorized to act on their behalf',
			'The name, address, telephone number, and email address of the copyright owner',
			'Identification of the copyrighted work that is being infringed',
			'Identification of where the infringing material is located on our Website (a URL works best)',
			'A statement that you have a good faith belief that the use isn’t authorized by the copyright owner, its agent or the law',
			'A statement that the information in your notice is accurate, and',
			'A statement that you’re authorized to act on behalf of the copyright owner',
			'This statement must be made under penalty of perjury, meaning if any part of the statement is false, you could be committing perjury—a serious offense that’s sometimes even classified as a felony',
		],
		warning:
			'Warning: If you knowingly make a false statement in your claim of copyright infringement, then you may be subject to liability for damages and heavy civil penalties. If you are not sure whether material on one of our Websites infringes your copyright, then you should speak with a lawyer before notifying us. We may forward your notice to the user that uploaded the content.',
	}

	const liability = [
		{
			title: 'No Warranties',
			description:
				'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICES, AND THE CONTENT ARE PROVIDED “AS IS” AND WE DISCLAIM ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON INFRINGEMENT',
		},
		{
			title: 'No Liability for Damages',
			description:
				'YOU ACKNOWLEDGE AND AGREE THAT, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE ENTIRE RISK ARISING OUT OF YOUR ACCESS TO AND USE OF THE SERVICES REMAINS WITH YOU. IN NO EVENT SHALL WE BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, EXEMPLARY OR CONSEQUENTIAL DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, LOST OF BUSINESS OR OF OPPORTUNITY, BUSINESS INTERRUPTION, LOSS OF BUSINESS INFORMATION AND DATA, OR ANY OTHER PECUNIARY LOSS) ARISING OUT OF THE USE OF OR INABILITY TO USE THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, OR FOR ANY CLAIM BY ANY THIRD PARTY',
		},
		{
			title: 'No Warranties',
			description:
				'You agree that any cause of action arising out of or related to the use of the Services must commence within one (1) year after the cause of action occurs. otherwise, such cause of action is permanently barred. The provisions of this Section ‎9.3 shall be deemed as a separate agreement regarding the shortening of the statutory period of limitations under Section 19 of the Israeli Statute of Limitations, 1958.',
		},
	]

	const indemnification = [
		'You agree to defend, indemnify, and hold us, our subsidiaries, affiliates, officers, directors, employees, licensors and agents, harmless from and against any claims, demands, liabilities, damages, losses, and expenses, including without limitation, attorney’s fees and costs, arising out of or in any way connected with (i) your access to or use of the Services; (ii) your violation of any term of these Terms (including negligent or wrongful conduct); (iii) your violation of any third party right, including without limitation any intellectual property right, publicity, confidentiality, property or privacy right; (iv) any data collected using the Services; or (v) your use of the Content',
		'We reserve the right to assume the exclusive defense and control of any matter which is subject to indemnification under this Section ‎11, and in such case, you will cooperate with all reasonable requests in assisting our defense of such matter',
		'You may not settle any claim for which we are entitled to indemnification hereunder without our prior written consent',
	]

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<React.Fragment>
			<Header />
			<div
				className="bg-slate-50 overflow-hidden text-left"
				style={{textDecoration: 'auto', direction: 'ltr'}}
			>
				<div className=" max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white mt-8 rounded shadow-sm">
					<div className="">
						<h2 className="font-semibold text-2xl">Terms and Conditions</h2>
						<br />
						<div>
							<div className="text-xl  font-semibold underline text-left">
								<p>Consent to Agreement </p>
								<br />
							</div>
							<div className="text-base mx-auto lg:max-w-none">
								<p className="text-md text-gray-500">
									This Terms of Use (the “Terms”) constitute a binding agreement
									between any user of the Services (as defined below)
									(“User(s)”, “you”) and Blueicon Ltd., a company duly
									registered in Israel under Registration No. 515806669 (“us”,
									“we”, “Company”) which governs your use of our website (the
									“Website”).
								</p>
								<br />
								<p className="text-md text-gray-500 text-left">
									For the purpose of these Terms: (i) “Services” means the
									curated collection on the Website of trending products sold
									online and the analysis related to such products; (ii)
									“Subscriber” means a registered User; and (iii) “Content”
									means (a) information related to trending products which is
									submitted to us by Users; and (b) information gathered by the
									Company, available on the Services, which might include, among
									others, text, graphics, images, audio, video, and information
									as well as any other material that are posted, uploaded,
									generated, provided or otherwise made available via the
									Services
								</p>
								<br />
								<p className="text-md text-gray-500 text-left">
									By using the Services, you agree, without limitation or
									qualification, to be bound by these Terms and by our privacy
									policy that can be found at
									https://Dropshero.com/privacy-policy (the “Privacy Policy”).
									If you do not agree to these Terms or the Privacy Policy, in
									whole or in part, you are not allowed to use the Services
								</p>
								<br />
								<p className="text-md text-gray-500 text-left">
									The Company reserves the right to alter, expand, edit and
									update these Terms, including the Privacy Policy, from time to
									time at its sole discretion. Updates and changes to the Terms
									will go into effect immediately, and notifications thereof
									will appear on the Website. The most current Terms will appear
									on the Website under the “Terms of Use” link on the Website’s
									homepage. Any use of the Services or the Website shall
									constitute a renewed consent to these Terms
								</p>
							</div>
						</div>
						<div>
							<div className="text-xl  font-semibold underline text-left mt-6">
								<p>Grant of Rights</p>
								<br />
							</div>
							<div className="text-base mx-auto lg:max-w-none">
								{grantOfRights.map((item, index) => (
									<div key={index}>
										<p className="text-lg text-gray-700">{item.title}</p>
										<br />
										{item.description.map((element, i) => (
											<div key={i}>
												<p className="text-md text-gray-500">{element}</p>
												<br />
											</div>
										))}
										<br />
									</div>
								))}
							</div>
						</div>
						<div>
							<div className="text-xl  font-semibold underline text-left mt-6">
								<p>Use Restrictions</p>
								<br />
							</div>
							<div className="text-base mx-auto lg:max-w-none">
								{restrictions.map((item, index) => (
									<div key={index}>
										<div className="flex flex-row-reverse">
											<div className="text-md text-gray-500 ">.{index + 1}</div>
											<div className="text-md text-gray-500 text-left pl-2">
												{item}
											</div>
										</div>
										<br />
									</div>
								))}
							</div>
						</div>
						<div>
							<div className="text-xl  font-semibold underline text-left mt-6">
								<p>Third Party Websites and Services</p>
								<br />
							</div>
							<div className="text-base mx-auto lg:max-w-none">
								<p className="text-md text-gray-500 text-left">
									The Website contains links to external sites, or may contain
									functions, aids, extensions, widgets or tools that may be
									operated by third parties, lead to websites belonging to third
									parties, offer information regarding third parties or offer
									services of third parties (“Third-Party Services”). The
									purpose of posting the links is to provide the User with
									access to information, products, or services that may be of
									interest to or useful to the User, including in order to
									provide the User with various tools that may improve its
									experience on the Website (such as a chat extension with a
									live or virtual agent). Your use of Third-Party Services is
									subject to the provisions determined by those third parties,
									including the terms of use and privacy policies of those third
									parties in respect of any Third-Party Service. The Company
									shall not be liable for Third-Party Services or for anything
									existing in them, and the Company does not guarantee that they
									will be available continuously, if at all. The fact that the
									Company publishes links to Third-Party Services or allows the
									use thereof through the Website does not mean that it supports
									its operators or their advertisers, or that it is affiliated
									with them in any way.
								</p>
							</div>
						</div>
					</div>
					<div>
						<div className="text-xl  font-semibold underline text-left mt-6">
							<p>Termination; Suspension; Deletion</p>
							<br />
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							{termination.map((item, index) => (
								<div key={index}>
									<div className="text-md text-gray-500 text-left pl-2">
										{item}
									</div>
									<br />
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="text-xl  font-semibold underline text-left mt-6">
							<p>Payment and Refund</p>
							<br />
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							{refund.map((item, index) => (
								<div key={index}>
									<div className="text-md text-gray-500 text-left pl-2">
										{item}
									</div>
									<br />
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="text-xl  font-semibold underline text-left mt-6">
							<p>Payment Subscription Terms</p>
							<br />
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							{subs.map((item, index) => (
								<div key={index}>
									<div className="flex flex-row-reverse">
										<div className="text-md text-gray-500 ">.{index + 1}</div>
										<div className="text-md text-gray-500 text-left pl-2">
											{item}
										</div>
									</div>
									<br />
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="text-xl  font-semibold underline text-left mt-6">
							<p>Disclaimer</p>
							<br />
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							{disclaimer.map((item, index) => (
								<div key={index}>
									<div className="flex flex-row-reverse">
										<div className="text-md text-gray-500 ">.{index + 1}</div>
										<div className="text-md text-gray-500 text-left pl-2">
											{item}
										</div>
									</div>
									<br />
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="text-xl  font-semibold underline text-left mt-6">
							<p>Proprietary Rights and Copyright</p>
							<br />
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							{rights.main.map((item, index) => (
								<div key={index}>
									<div className="text-md text-gray-500 text-left pl-2">
										{item}
									</div>
									<br />
								</div>
							))}
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							{rights.inner.map((item, index) => (
								<div key={index}>
									<div className="text-md text-gray-500 text-left pl-2">
										{item} .
									</div>
									<br />
								</div>
							))}
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							<div className="text-md text-gray-500 text-left pl-2">
								{rights.warning}
							</div>
						</div>
					</div>
					<div>
						<div className="text-xl  font-semibold underline text-left mt-6">
							<p>Availability</p>
							<br />
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							<p className="text-md text-gray-500 text-left">
								The Services’ availability and functionality depends on various
								factors, such as communication networks. We do not warrant or
								guarantee that the Services will always operate and/or be
								available at all times without disruption or interruption, or
								that it will be immune from unauthorized access or error-free.
								We have the sole discretion to modify the Services at any time.
							</p>
						</div>
					</div>

					<div>
						<div className="text-xl  font-semibold underline text-left mt-6">
							<p>Disclaimer of Warranties and Limitations on Liability</p>
							<br />
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							{liability.map((item, index) => (
								<div key={index}>
									<div className="flex flex-row-reverse">
										<div className="text-md text-gray-500 ">.{index + 1}</div>
										<div className="text-md text-gray-500 text-left pl-2">
											{item.title}
										</div>
									</div>
									<br />
									<div className="text-md text-gray-500 ">
										{item.description}
									</div>
									<br />
								</div>
							))}
						</div>
					</div>

					<div>
						<div className="text-xl  font-semibold underline text-left mt-6">
							<p>Feedback</p>
							<br />
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							<p className="text-md text-gray-500 text-left">
								You have no obligation to give us any suggestions, ideas,
								enhancement requests, recommendations, comments or other
								feedback (“Feedback”) relating to the Services. To the extent we
								receive any Feedback from you, we may use and include any such
								Feedback to improve the Services or for any other purpose.
								Accordingly, you hereby irrevocably, exclusively and on a
								royalty-free basis, assigns, all such Feedback to us and our
								affiliates, licensees, clients, partners, third-party providers
								and other authorized entities may freely use, reproduce,
								license, distribute, and otherwise commercialize the Feedback as
								it deems fit
							</p>
						</div>
					</div>

					<div>
						<div className="text-xl  font-semibold underline text-left mt-6">
							<p>Indemnification</p>
							<br />
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							{indemnification.map((item, index) => (
								<div key={index}>
									<div className="flex flex-row-reverse">
										<div className="text-md text-gray-500 ">.{index + 1}</div>
										<div className="text-md text-gray-500 text-left pl-2">
											{item}
										</div>
									</div>
									<br />
								</div>
							))}
						</div>
					</div>

					<div>
						<div className="text-xl  font-semibold underline text-left mt-6">
							<p>Miscellaneous</p>
							<br />
						</div>
						<div className="text-base mx-auto lg:max-w-none">
							<p className="text-md text-gray-500 text-left">
								These Terms will be governed by and construed in accordance with
								Israeli law without regard to conflict of law principles. Any
								disputes relating to these Terms and the use of the Services
								will be subject to the exclusive jurisdiction of the courts of
								Tel Aviv. If any of the terms or conditions of these Terms are
								deemed invalid or unenforceable for any reason (including, but
								not limited to the exclusions and limitations set out above),
								then the invalid or unenforceable provision will be severed from
								these Terms and the remaining terms will continue to apply. If
								any provision of these Terms is inconsistent with, or cannot be
								fully enforced under, the law, such provision will be construed
								as limited to the extent necessary to be consistent with and
								fully enforceable under the law. These Terms are the final,
								complete and exclusive agreement between the parties relating to
								the subject matter hereof and supersedes all prior or
								contemporaneous understandings and agreements relating to such
								subject matter, whether oral or written. These Terms may only be
								modified in writing signed by our authorized officer. You shall
								not assign these Terms or assign any rights or delegate any
								obligations hereunder, in whole or in part, whether voluntarily
								or by operation of law, without our prior written consent. Any
								purported assignment or delegation by you without our
								appropriate prior written consent will be null and void. We may
								assign these Terms or any rights hereunder without restriction.
								These Terms constitute the full and entire understanding and
								agreement between you and us with regard to the subject matters
								hereof, and replace any prior agreement pertaining to the
								subject matter hereof. No purchase order or other form submitted
								by you will modify, supersede, add to or in any way vary these
								Terms, unless specifically set forth therein. The heading
								references herein are for convenience purposes only, do not
								constitute a part of these Terms and will not be deemed to limit
								or affect any of the provisions hereof. Our failure to enforce
								any right or provision of these Terms, or failure to exercise
								any option to terminate, will not be deemed a waiver of such
								right or provision and shall not affect the validity of these
								Terms or any part thereof, or the right thereafter to enforce
								each and every provision. Any waiver of any provision of any
								term in these Terms will be effective only if in writing, signed
								by the waiving party. Any notice or other communication to be
								given hereunder will be in writing and given (i) by us via email
								(in each case to the address that you provide), or (ii) by User
								via email to support@Dropshero.com or to such other addresses as
								we may specify in writing. The date of receipt will be deemed
								the date on which such notice is transmitted.
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</React.Fragment>
	)
}
export default Terms
