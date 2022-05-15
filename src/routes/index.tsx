import React from 'react'
import {Switch} from 'react-router-dom'
import {
	AllProductsPage,
	CheckoutPage,
	HomePage,
	PricingPage,
	ProfilePage,
	SigninPage,
	SignupPage,
	SingleProductPage,
	ContactUsPage,
	ResetPassword,
	ConfirmPassword,
	Page404,
	Page500,
	Favorites,
	Terms,
	UpgradeCheckout,
	ThankYouPage,
	ThankYouUpgrade,
	Privacy,
	InfluencersPage,
} from '../pages'
import Route from './route'

export interface IRoutesConfiguration {
	isPrivate: boolean
	path: string
	exact: boolean
	component: React.FC
	allowedAccess: 'ALL' | 'TRIAL_OR_SUBBED' | 'NOT_VERIFIED' | 'MONTHLY'
}

//TO-Do incase we need subroutes---> https://reactrouter.com/web/example/route-config
const routesConfiguration: IRoutesConfiguration[] = [
	{
		path: '/',
		exact: true,
		isPrivate: false,
		component: HomePage,
		allowedAccess: 'ALL',
	},
	{
		path: '/sign-in',
		exact: true,
		isPrivate: false,
		component: SigninPage,
		allowedAccess: 'ALL',
	},
	{
		path: '/sign-up',
		exact: true,
		isPrivate: false,
		component: SignupPage,
		allowedAccess: 'ALL',
	},
	{
		path: '/products',
		exact: true,
		isPrivate: true,
		component: AllProductsPage,
		allowedAccess: 'TRIAL_OR_SUBBED',
	},
	{
		path: '/product/:productId',
		exact: true,
		isPrivate: true,
		component: SingleProductPage,
		allowedAccess: 'TRIAL_OR_SUBBED',
	},
	{
		path: '/account-settings',
		exact: true,
		isPrivate: true,
		component: ProfilePage,
		allowedAccess: 'ALL',
	},
	{
		path: '/pricing',
		exact: true,
		isPrivate: false,
		component: PricingPage,
		allowedAccess: 'NOT_VERIFIED',
	},
	{
		path: '/checkout/:priceId',
		exact: true,
		isPrivate: true,
		component: CheckoutPage,
		allowedAccess: 'NOT_VERIFIED',
	},
	{
		path: '/contact-us',
		exact: true,
		isPrivate: false,
		component: ContactUsPage,
		allowedAccess: 'ALL',
	},
	{
		path: '/forgot-password',
		exact: true,
		isPrivate: false,
		component: ResetPassword,
		allowedAccess: 'ALL',
	},
	{
		path: '/confirm-password/:token',
		exact: true,
		isPrivate: false,
		component: ConfirmPassword,
		allowedAccess: 'ALL',
	},
	{
		path: '/favs',
		exact: true,
		isPrivate: true,
		component: Favorites,
		allowedAccess: 'TRIAL_OR_SUBBED',
	},
	{
		path: '/404',
		exact: true,
		isPrivate: false,
		component: Page404,
		allowedAccess: 'ALL',
	},
	{
		path: '/500',
		exact: true,
		isPrivate: false,
		component: Page500,
		allowedAccess: 'ALL',
	},
	{
		path: '/terms',
		exact: true,
		isPrivate: false,
		component: Terms,
		allowedAccess: 'ALL',
	},
	{
		path: '/privacy',
		exact: true,
		isPrivate: false,
		component: Privacy,
		allowedAccess: 'ALL',
	},
	{
		path: '/upgrade',
		exact: true,
		isPrivate: true,
		component: UpgradeCheckout,
		allowedAccess: 'MONTHLY',
	},
	{
		path: '/thank-you',
		exact: true,
		isPrivate: true,
		component: ThankYouPage,
		allowedAccess: 'ALL',
	},
	{
		path: '/thank-you-upgrade',
		exact: true,
		isPrivate: true,
		component: ThankYouUpgrade,
		allowedAccess: 'ALL',
	},
	{
		path: '/influencers',
		exact: true,
		isPrivate: false,
		component: InfluencersPage,
		allowedAccess: 'ALL',
	},
]

// incase we needed seperate store use context check this link https://react-redux.js.org/api/hooks#custom-context
const Routes: React.FC = () => {
	return (
		<Switch>
			{routesConfiguration.map((route, index) => (
				<Route {...route} key={index} />
			))}
		</Switch>
	)
}

export default Routes
