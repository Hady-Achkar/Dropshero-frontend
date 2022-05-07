import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {persistor, store} from './lib'
import {PersistGate} from 'redux-persist/integration/react'
import {Loading} from './components'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {FetchStripeKey} from './services'
import {handleError} from './utils'
const renderApp = () => {
	FetchStripeKey()
		.then((res) => {
			const {publicKey} = res.data
			const stripePromise = loadStripe(publicKey)
			ReactDOM.render(
				<Provider store={store}>
					<PersistGate persistor={persistor} loading={<Loading />}>
						<Elements stripe={stripePromise}>
							<BrowserRouter>
								<App />
							</BrowserRouter>
						</Elements>
					</PersistGate>
				</Provider>,
				document.getElementById('root')
			)
		})
		.catch(handleError)
}

renderApp()
