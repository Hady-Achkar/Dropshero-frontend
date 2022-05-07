import React, {Fragment, useState} from 'react'
import {Footer, Header} from '../../components'
import {
	ContentSection,
	Cta,
	Faqs,
	LogoClound,
	VideoSection,
} from '../../components/home'
import ContentCta from '../../components/home/ContentCta'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import Zendesk from 'react-zendesk'

const Index = () => {
	const {
		isAuthenticated,
		user: {email},
	} = useSelector((state: AppState) => state.auth)

	const [affiliates, setaffiliates] = useState([])

	//@ts-ignore
	rewardful('ready', () => {
		setTimeout(() => {
			//@ts-ignore
			rewardful('convert', {email: email})
		}, 5000)
	})

	console.log(affiliates)
	const ZENDESK_KEY = '38965dcd-db5d-4123-964e-f43a935c9f65'

	const setting = {
		color: {
			theme: '#dcfce7',
		},
		launcher: {
			chatLabel: {
				'en-US': 'Need Help',
			},
		},
		contactForm: {
			fields: [
				{
					id: 'description',
					prefill: {'*': 'I would like to request a call!'},
				},
			],
		},
	}

	// 38965dcd-db5d-4123-964e-f43a935c9f65
	return (
		<Fragment>
			<Header />
			<Zendesk
				defer
				zendeskKey={ZENDESK_KEY}
				{...setting}
				onLoaded={() => console.log('is loaded')}
			/>
			<Cta />
			<LogoClound />
			<VideoSection />
			<ContentCta />
			<ContentSection />
			{/* <Testimonials /> */}
			<Faqs />
			<Footer />
		</Fragment>
	)
}
export default Index
