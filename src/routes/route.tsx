import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppState} from '../reducers'
import {AuthAxios, PaymentAxios, UsersAxios, UtilsAxios} from '../lib'
import {AccountStatus, BundleType} from '../types'

export interface IRoutProps {
	isPrivate: boolean
	path: string
	exact: boolean
	component: React.FC
	allowedAccess: 'ALL' | 'TRIAL_OR_SUBBED' | 'NOT_VERIFIED' | 'MONTHLY'
}

const RouteWrapper: React.FC<IRoutProps> = (props) => {
	const {isPrivate, path, allowedAccess} = props
	const state = useSelector((state: AppState) => state.auth)
	const {
		isAuthenticated,
		user: {token, status, bundleType},
	} = state
	AuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	AuthAxios.defaults.headers.common['Accept'] = 'application/json'
	UsersAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	UsersAxios.defaults.headers.common['Accept'] = 'application/json'
	PaymentAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	PaymentAxios.defaults.headers.common['Accept'] = 'application/json'
	UtilsAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token
	UtilsAxios.defaults.headers.common['Accept'] = 'application/json'
	if (!isAuthenticated) {
		if (isPrivate) {
			return <Redirect to="/sign-in" />
		}
		return <Route {...props} component={props.component} />
	} else {
		if ((path === '/sign-in' || path === '/sign-up') && isAuthenticated) {
			return <Redirect to="/pricing" />
		}
		if (status === AccountStatus.VERIFIED && path === '/checkout/:priceId') {
			return <Redirect to="/thank-you" />
		} else if (
			status === AccountStatus.VERIFIED &&
			bundleType === BundleType.ONE_TIME &&
			path === '/upgrade'
		) {
			return <Redirect to="/thank-you-upgrade" />
		} else {
			if (allowedAccess === 'ALL') {
				return <Route {...props} component={props.component} />
			} else if (
				allowedAccess === 'NOT_VERIFIED' &&
				(status === AccountStatus.NOT_VERIFIED ||
					status === AccountStatus.TRIAL ||
					status === AccountStatus.EXPIRED)
			) {
				return <Route {...props} component={props.component} />
			} else if (
				allowedAccess === 'TRIAL_OR_SUBBED' &&
				(status === AccountStatus.TRIAL ||
					status === AccountStatus.EXPIRED ||
					status === AccountStatus.VERIFIED)
			) {
				return <Route {...props} component={props.component} />
			} else if (
				allowedAccess === 'MONTHLY' &&
				bundleType === BundleType.MONTHLY
			) {
				return <Route {...props} component={props.component} />
			}

			return <Redirect to="/" />
		}
	}
}

export default RouteWrapper
