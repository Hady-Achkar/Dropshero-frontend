import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Routes from './routes'
import './index.css'
import 'tailwindcss/tailwind.css'
import {AuthAxios, PaymentAxios} from './lib'
import {useDispatch} from 'react-redux'
import {logoutAction, startInitializeProducts} from './actions'
import TagManager from 'react-gtm-module'

const App: React.FC = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	AuthAxios.interceptors.response.use(
		(response) => {
			return response
		},
		(err) => {
			if (err.response.status === 500) {
				history.push('/500')
			} else if (err.response.data.message === 'Email was not found') {
				return Promise.reject(err)
			} else if (err.response.status === 400 || err.response.status === 404) {
				history.push('/404')
			} else if (err.response.data.error === 'jwt expired') {
				dispatch(logoutAction())
			} else if (err.response.data.message === 'Invalid admin Token') {
				dispatch(logoutAction())
			} else {
				history.push('/sign-in')
			}
			return Promise.reject(err)
		}
	)

	PaymentAxios.interceptors.response.use(
		(response) => {
			return response
		},
		(err) => {
			if (err.response.status === 500) {
				if (err.response.data.error === 'jwt expired') {
					dispatch(logoutAction())
				}
				return Promise.reject(err)
			} else if (err.response.status === 400 || err.response.status === 404) {
				history.push('/404')
			} else {
				history.push('/sign-in')
			}
			return Promise.reject(err)
		}
	)
	useEffect(() => {
		dispatch(startInitializeProducts())
	}, [])

	useEffect(() => {
		TagManager.initialize({gtmId: 'GTM-PGVJPQG'})
	}, [])
	return <Routes />
}

export default App
