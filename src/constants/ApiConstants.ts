const ApiConstants = {
	AUTH: {
		BASE_URL: 'https://api.dropshero.com/auth',
		SIGNUP: '/sign-up',
		SIGN_IN: '/sign-in',
		GOOGLE_SIGN_IN: '/google',
		FACEBOOK_SIGN_IN: '/facebook',
		RESET_PASSWORD: '/reset-password',
		FORGOT_PASSWORD: '/forgot-password',
	},
	UTILS: {
		BASE_URL: 'https://api.dropshero.com/utils',
		UPLOAD_FILE: '/upload',
		ADD_CONTACT: '/contact',
	},
	PAYMENTS: {
		ADD_NEW_PAYMENT_METHOD: '/payment',
		BASE_URL: 'https://api.dropshero.com/payments',
		CONFIG_STRIPE: '/config',
		SUBSCRIBE: '/init-sub',
		CANCEL_SUBSCRIPTION: '/cancel-subscription',
		REMOVE: '/payment',
		MAKE_DEFUALT: '/default-payment-method',
		UPGRADE_SUB: '/upgrade',
		VALIDATE_PROMO: '/promo',
	},
	PRODUCTS: {
		BASE_URL: 'https://api.dropshero.com/products',
		GET_ALL_PRODUCTS: '/',
		ADD_NEW_FAVORITE_PRODUCT: '/favorites',
		DELETE_FAVORITE_PRODUCT: '/favorites',
		ADD_NEW_PRODUCT: '/',
	},
	BUNDLES: {
		BASE_URL: 'https://api.dropshero.com/bundles',
		GET_ALL_BUNDLES: '/',
		GET_SINGLE_BUNDLE: '/bundle',
	},
	USERS: {
		BASE_URL: 'https://api.dropshero.com/users',
		ADD_NEW_FAVORITE_PRODUCT: '/favorites',
		DELETE_FAVORITE_PRODUCT: '/favorites',
		GET_ME: '/me',
		EDIT_PROFILE: '/edit-profile',
	},
	INFLUENCERS: {
		BASE_URL: 'https://api.dropshero.com/influencers',
		GET_ALL: '/',
		GET_SINGLE: '/influencer',
	},
}
export default ApiConstants
