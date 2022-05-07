import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import {Link, useHistory, useParams} from 'react-router-dom'
import {
    AccountStatus,
    BundleType,
    IPromo,
    IStripeNewPaymentMethod,
} from '../../types'
import {ErrorToast, Footer, Header, SuccessToast} from '../../components'
import countries from '../../data/countries'
import {
    getSingleBundle,
    GetSingleBundle,
    subscribe,
    validatePromo,
} from '../../services'
import {
    CardElement,
    CardElementProps,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js'
import {changeAccountType, changeBundleType} from '../../actions'
import {CheckCircleIcon} from '@heroicons/react/outline'
import {handleError} from "../../utils";

type Params = {
    priceId: string
}
const Checkout = () => {
    const {priceId} = useParams<Params>()
    const [successOpen, setSuccessOpen] = useState<boolean>(false)
    const [errorOpen, setErrorOpen] = useState<boolean>(false)
    const [declineReason, setDeclineReason] = useState<string>('')
    const [termsErrorOpen, setTermsErrorOpen] = useState<boolean>(false)

    const [isAcceptedTerms, setIsAcceptedTerms] = useState<boolean>(false)
    const {
        user: {email, fullName, _id},
    } = useSelector((state: AppState) => state.auth)
    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = useState<boolean>(false)
    const [bundle, setBundle] = useState<GetSingleBundle.Prices>()
    const fetchBundle = useCallback(() => {
        setLoading(true)
        getSingleBundle(priceId)
            .then((res) => {
                setBundle(res?.data?.prices)
                setLoading(false)
            })
            .catch(handleError)
    }, [history, priceId])

    const refTermsDiv = useRef()

    const [paymentData, setPaymentData] = useState<IStripeNewPaymentMethod>({
        city: '',
        country: '',
        line1: '',
        line2: '',
        state: '',
        postalCode: '',
    })
    const CARD_ELEMENT_OPTIONS: CardElementProps = {
        className:
            'block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm py-3 px-2',
        options: {
            style: {
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                },
            },
        },
    }
    const stripe = useStripe()
    const elements = useElements()
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setPaymentData((prevState) => ({
                ...prevState,
                [event.target.id]: event.target.value,
            }))
        },
        [setPaymentData]
    )
    const [promo, setPromo] = useState<string>('')
    const [promoSuccessOpen, setPromoSuccessOpen] = useState<boolean>(false)
    const [promoErrorOpen, setPromoErrorOpen] = useState<boolean>(false)
    const [promoApplied, setPromoApplied] = useState<boolean>(false)
    const [promoData, setPromoData] = useState<IPromo>({
        id: '',
        object: '',
        amount_off: 0,
        created: 0,
        currency: '',
        duration: '',
        duration_in_months: 0,
        livemode: false,
        max_redemptions: 0,
        metadata: {},
        name: '',
        percent_off: 0,
        times_redeemed: 0,
        valid: false,
    })
    const handleSubmit = useCallback(() => {
        if (!isAcceptedTerms) {
            //@ts-ignore
            refTermsDiv.current.focus()
            setTermsErrorOpen(true)
        } else {
            const {country, line1, line2, city, state} = paymentData
            if (!stripe || !elements) {
                return
            }
            setLoading(true)
            stripe
                .createPaymentMethod({
                    type: 'card',
                    //@ts-ignore
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: fullName,
                        email: email,
                        address: {
                            city,
                            country,
                            line1,
                            line2,
                            state,
                        },
                    },
                    metadata: {
                        _id,
                    },
                })
                .then((res) => {
                    subscribe(priceId, res?.paymentMethod?.id, promoData.id)
                        .then((resp) => {
                            dispatch(changeAccountType(AccountStatus.VERIFIED))
                            //@ts-ignore
                            setSuccessOpen(true)
                        })
                        .catch((err) => {
                            if (err.response) {
                                setDeclineReason(err.response.data.error)
                                setErrorOpen(true)
                                setLoading(false)
                                handleError(err)
                            } else {
                                handleError(err)
                            }
                        })
                })
                .catch(handleError)
        }
    }, [paymentData, stripe, elements, isAcceptedTerms])
    useEffect(() => {
        if (!priceId) {
            history.push('/404')
        } else {
            fetchBundle()
        }
        return () => fetchBundle()
    }, [priceId, history])

    //@ts-ignore
    rewardful('convert', {email: email})
    const handleVerifyPromo = useCallback(() => {
        setLoading(true)
        validatePromo(promo)
            .then((res) => {
                if (res.data.coupon) {
                    setPromoApplied(true)
                    setPromoData(res.data.coupon)
                    setPromoSuccessOpen(true)
                } else {
                    setPromoApplied(false)
                    setPromoErrorOpen(true)
                }
                setLoading(false)
            })
            .catch(handleError)
    }, [promo])

    const sortedCountries = countries.sort((a: any, b: any) =>
        a.label > b.label ? 1 : -1
    )

    return (
        <Fragment>
            <Header/>
            <div className="bg-white">
                <div className=" grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 xl:gap-x-48">
                    <form
                        data-rewardful
                        className="pt-16 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1"
                    >
                        <div className="max-w-lg mx-auto lg:max-w-none">
                            <section aria-labelledby="contact-info-heading">
                                <h2
                                    id="contact-info-heading"
                                    className="text-lg font-medium text-gray-900 border-b"
                                >
                                    معلومات التواصل
                                </h2>

                                <div className="mt-6">
                                    <label
                                        htmlFor="email-address"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        البريد الالكتروني
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            value={email}
                                            id="email-address"
                                            name="email-address"
                                            autoComplete="email"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mt-1">
                                        <label
                                            htmlFor="card"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            معلومات الدفع
                                        </label>
                                        <CardElement {...CARD_ELEMENT_OPTIONS} />
                                    </div>
                                </div>
                            </section>

                            <section aria-labelledby="payment-heading" className="mt-10"/>

                            <section aria-labelledby="shipping-heading" className="mt-10">
                                <h2
                                    id="shipping-heading"
                                    className="text-lg font-medium text-gray-900"
                                >
                                    عنوان الدفع
                                </h2>

                                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            الدولة
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={handleChange}
                                                name="country"
                                                id={'country'}
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            >
                                                <option selected disabled hidden>
                                                    اختر الدولة
                                                </option>
                                                {sortedCountries.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.code}>
                                                            {item.label}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="address"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            العنوان الاول
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                id="line1"
                                                name="line1"
                                                autoComplete="street-address"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="address2"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            العنوان الثاني
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                onChange={handleChange}
                                                id="line2"
                                                name="line2"
                                                type="text"
                                                autoComplete="street-address2"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            المدينة
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                onChange={handleChange}
                                                id="city"
                                                name="city"
                                                type="text"
                                                autoComplete="address-level2"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="region"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            المحافظة
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                onChange={handleChange}
                                                id="state"
                                                name="state"
                                                type="text"
                                                autoComplete="address-level1"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="postal-code"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            الرمز البريدي
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                onChange={handleChange}
                                                id="postalCode"
                                                name="postalCode"
                                                type="text"
                                                autoComplete="postal-code"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </form>
                    <section
                        className="bg-white pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2">
                        <div className="max-w-lg mx-auto lg:max-w-none">
                            <h2 className="text-lg font-medium text-gray-900"> الفاتورة </h2>

                            <div>
                                <div className="flex w-full items-center text-sm justify-between">
									<span className=" border-transparent" aria-hidden="true">
										<span className="rounded-full bg-white w-1.5 h-1.5"/>
									</span>
                                </div>
                                <dl className="text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">نوع الاشتراك</dt>
                                        <dd>
                                            {bundle?.product?.name} - {bundle?.product?.unit_label}
                                        </dd>
                                    </div>
                                    {promoApplied && (
                                        <div className="flex items-center justify-between">
                                            <dt className="text-gray-600">السعر قبل الخصم</dt>
                                            <dd className="font-sans line-through text-red-700">
                                                {bundle?.unit_amount &&
                                                    (bundle?.unit_amount / 100)?.toFixed(2)}
                                                $
                                            </dd>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">سعر الاشتراك</dt>
                                        <dd className="font-sans text-green-800">
                                            {!promoApplied
                                                ? bundle?.unit_amount &&
                                                (bundle?.unit_amount / 100)?.toFixed(2)
                                                : bundle?.unit_amount &&
                                                (
                                                    bundle?.unit_amount / 100 -
                                                    (bundle?.unit_amount / 100) *
                                                    (promoData?.percent_off / 100)
                                                )?.toFixed(2)}
                                            $
                                        </dd>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">القيمة المضافة</dt>
                                        <dd className="font-sans">$0.00</dd>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                        <dt className="text-base">المجموع</dt>
                                        <dd className="text-base font-sans">
                                            {!promoApplied
                                                ? bundle?.unit_amount &&
                                                (bundle?.unit_amount / 100)?.toFixed(2)
                                                : bundle?.unit_amount &&
                                                (
                                                    bundle?.unit_amount / 100 -
                                                    (bundle?.unit_amount / 100) *
                                                    (promoData?.percent_off / 100)
                                                )?.toFixed(2)}
                                            $
                                        </dd>
                                    </div>
                                </dl>
                                <div>
                                    <div
                                        className="mt-10 pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
                                        <label
                                            htmlFor="address"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            كود الخصم
                                        </label>
                                        <div className="flex space-x-3 mt-1 sm:mt-4">
                                            {!promoApplied && (
                                                <button
                                                    onClick={handleVerifyPromo}
                                                    className="bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-green-700  sm:mr-6 sm:order-last sm:w-auto"
                                                    disabled={Boolean(promo === '')}
                                                >
                                                    اضافة
                                                </button>
                                            )}

                                            <div className="flex items-center">
                                                <input
                                                    onChange={(e) => setPromo(e.target.value)}
                                                    value={promo}
                                                    type="text"
                                                    id="promo"
                                                    name="promo"
                                                    autoComplete="Promotion code"
                                                    className=" border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm sm:mx-4"
                                                />
                                                {promoApplied && (
                                                    <CheckCircleIcon
                                                        className="h-5 w-5 text-green-600 inline-flex items-center"/>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {loading ? (
                            <div
                                className="mt-10 pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 my-5"/>
                            </div>
                        ) : (
                            <React.Fragment>
                                <div
                                    className="mt-10 pt-6 border-t border-gray-200 sm:flex sm:items-center sm:justify-between">
                                    <div className="flex space-x-3">
                                        <input
                                            //@ts-ignore
                                            ref={refTermsDiv}
                                            checked={isAcceptedTerms}
                                            type="checkbox"
                                            onChange={() =>
                                                setIsAcceptedTerms((prevState) => !prevState)
                                            }
                                            className="ml-2 rounded focus:ring-green-600"
                                        />
                                        <Link
                                            to="/terms"
                                            className="text-sm font-medium text-blue-800 mb-2"
                                            target="_blank"
                                        >
                                            وافق على شروط الموقع قبل الدفع
                                        </Link>
                                    </div>

                                    <form data-rewardful>
                                        <button
                                            onClick={handleSubmit}
                                            className={
                                                isAcceptedTerms
                                                    ? 'w-full bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-green-700  sm:mr-6 sm:order-last sm:w-auto'
                                                    : 'w-full bg-gray-400 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white sm:mr-6 sm:order-last sm:w-auto'
                                            }
                                            disabled={!isAcceptedTerms}
                                        >
                                            اكمل عملية الدفع
                                        </button>
                                    </form>
                                </div>
                            </React.Fragment>
                        )}
                    </section>
                </div>
            </div>
            <SuccessToast
                message={'تمت اضافة وسيلة دفع جديدة بنجاح'}
                setOpen={setSuccessOpen}
                open={successOpen}
                title={'وسائل الدفع'}
            />
            <SuccessToast
                message={'تمت إضافة كود الخصم بنجاح'}
                setOpen={setPromoSuccessOpen}
                open={promoSuccessOpen}
                title={'كود الخصم'}
            />
            <ErrorToast
                message={'فشل بإضافة كود الخصم، او كود الخصم ليس موجود'}
                setOpen={setPromoErrorOpen}
                open={promoErrorOpen}
                title={'كود الخصم'}
            />
            <ErrorToast
                message={`عذرا، تم رفض وسيلة الدفع التي قمت باضافتها، الرجاء المحاولة من جديد: `}
                description={declineReason}
                setOpen={setErrorOpen}
                open={errorOpen}
                title={'وسائل الدفع'}
            />
            <ErrorToast
                message={`الرجاء الموافقة على شروط و احكام الموقع قبل الشراء`}
                setOpen={setTermsErrorOpen}
                open={termsErrorOpen}
                title={'انتباه!'}
            />
            <Footer/>
        </Fragment>
    )
}
export default Checkout
