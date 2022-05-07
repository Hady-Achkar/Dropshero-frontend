import {Dispatch} from 'redux'
import {AppState} from '../reducers'
import Cookies from 'universal-cookie'
import {AccountStatus, AppActions, BundleType, IProduct, IUser} from '../types'
import {
	addNewFavoriteProduct,
	AddNewPaymentMethod,
	addPaymentMethod,
	cancelSubscription,
	googleLogin,
	login,
	LoginPayload,
	removeFavoriteProduct,
	signup,
	SignupPayload,
} from '../services'
import {handleError} from '../utils'

const cookies = new Cookies()
export const loginAction = (user_info: IUser): AppActions => ({
	type: 'LOGIN',
	user_info,
})
export const logoutAction = (): AppActions => ({
	type: 'LOGOUT',
})
export const addPaymentMethodAction = (
	paymentMethod: AddNewPaymentMethod.PaymentMethod
): AppActions => ({
	type: 'ADD_PAYMENT_METHOD',
	paymentMethod,
})
export const addToFavoritesAction = (products: IProduct[]): AppActions => ({
	type: 'ADD_TO_FAVORITES',
	products,
})
export const removeFromProductsAction = (products: IProduct[]): AppActions => ({
	type: 'REMOVE_FROM_FAVORITES',
	products,
})
export const cancelSubscriptionAction = (): AppActions => ({
	type: 'CANCEL_SUBSCRIPTION',
})
export const changeAccountType = (
	accountStatus: AccountStatus
): AppActions => ({
	type: 'CHANGE_ACCOUNT_TYPE',
	accountStatus,
})
export const changeBundleType = (bundleType: BundleType): AppActions => ({
	type: 'CHANGE_BUNDLE_TYPE',
	bundleType,
})
export const startAddToFavorites = (productId: string) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		addNewFavoriteProduct(productId)
			.then((res) => {
				const {favorites} = res?.data
				dispatch(addToFavoritesAction(favorites))
			})
			.catch(handleError)
	}
}
export const startCancelSub = (subscriptionId: string) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		cancelSubscription(subscriptionId)
			.then((res) => {
				dispatch(cancelSubscriptionAction())
			})
			.catch(handleError)
	}
}
export const startRemoveFavorites = (productId: string) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		removeFavoriteProduct(productId)
			.then((res) => {
				const {favorites} = res?.data
				dispatch(removeFromProductsAction(favorites))
			})
			.catch(handleError)
	}
}
export const startLogin = (payload: LoginPayload) => {
	const {email, password} = payload
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		login(email, password)
			.then((res) => {
				const {
					token,
					fullName,
					email,
					_id,
					type,
					stripeId,
					activeSubscription,
					isTrialLegit,
					subscriptions,
					inTrial,
					paymentMethods,
					accountStatus,
					favorites,
					bundleType,
				} = res.data
				cookies.set('token', token, {path: '/'})
				cookies.set('fullName', fullName, {path: '/'})
				cookies.set('email', email, {path: '/'})
				cookies.set('_id', _id, {path: '/'})
				cookies.set('type', type, {path: '/'})
				cookies.set('stripeId', stripeId, {path: '/'})
				dispatch(
					loginAction({
						token,
						fullName,
						email,
						_id,
						type,
						stripeId,
						activeSubscription,
						subscriptions,
						inTrial,
						isTrialLegit,
						paymentMethods,
						status: accountStatus,
						favorites,
						bundleType: bundleType ? bundleType : BundleType.MONTHLY,
					})
				)
			})
			.catch(handleError)
	}
}

interface GoogleLoginPayload {
	fname: string
	lname: string
	email: string
}

export const startAddPaymentMethod = (paymentResponse: string) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		addPaymentMethod(paymentResponse)
			.then((res) => {
				const {paymentMethod} = res.data
				dispatch(addPaymentMethodAction(paymentMethod))
			})
			.catch(handleError)
	}
}
export const startGoogleLogin = (payload: GoogleLoginPayload) => {
	const {fname, lname, email} = payload
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		googleLogin(fname, lname, email)
			.then((res) => {
				const {
					token,
					fullName,
					email,
					_id,
					type,
					stripeId,
					inTrial,
					isTrialLegit,
					activeSubscription,
					paymentMethods,
					subscriptions,
					bundleType,
					accountStatus,
					favorites,
				} = res?.data
				cookies.set('token', token, {path: '/'})
				cookies.set('fullName', fullName, {path: '/'})
				cookies.set('email', email, {path: '/'})
				cookies.set('_id', _id, {path: '/'})
				cookies.set('type', type, {path: '/'})
				cookies.set('stripeId', stripeId, {path: '/'})
				dispatch(
					loginAction({
						token,
						fullName,
						email,
						_id,
						type,
						stripeId,
						inTrial,
						isTrialLegit,
						activeSubscription,
						paymentMethods,
						subscriptions,
						status: accountStatus,
						bundleType: bundleType ? bundleType : BundleType.MONTHLY,
						favorites,
					})
				)
			})
			.catch(handleError)
	}
}

export const startSignup = (payload: SignupPayload) => {
	return (dispatch: Dispatch<AppActions> | any, _: () => AppState) => {
		signup(payload)
			.then((res) => {
				const {
					token,
					fullName,
					email,
					_id,
					type,
					stripeId,
					activeSubscription,
					isTrialLegit,
					subscriptions,
					inTrial,
					paymentMethods,
					accountStatus,
					bundleType,
					favorites,
				} = res?.data
				cookies.set('token', token, {path: '/'})
				cookies.set('fullName', fullName, {path: '/'})
				cookies.set('email', email, {path: '/'})
				cookies.set('_id', _id, {path: '/'})
				cookies.set('type', type, {path: '/'})
				cookies.set('stripeId', stripeId, {path: '/'})
				dispatch(
					loginAction({
						token,
						fullName,
						email,
						_id,
						type,
						stripeId,
						activeSubscription,
						isTrialLegit,
						subscriptions,
						inTrial,
						paymentMethods,
						status: accountStatus,
						favorites,
						bundleType: bundleType ? bundleType : BundleType.MONTHLY,
					})
				)
			})
			.catch(handleError)
	}
}
