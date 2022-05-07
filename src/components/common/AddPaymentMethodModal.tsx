import React, {Fragment, useCallback, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {
    CardElement,
    useStripe,
    useElements,
    CardElementProps,
} from '@stripe/react-stripe-js'
import {AppState} from '../../reducers'
import {useSelector, useDispatch} from 'react-redux'
import {addPaymentMethodAction, startAddPaymentMethod} from '../../actions'
import {IStripeNewPaymentMethod} from '../../types'
import countries from "../../data/countries";
import {addPaymentMethod} from "../../services";
import {SuccessToast, ErrorToast} from "../index";
import {handleError} from "../../utils";


interface IProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    cb: (type: 'load' | 'refetch') => void
    setDeclineReason: React.Dispatch<React.SetStateAction<string>>
    setErrorOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddPaymentMethod: React.FC<IProps> = (props) => {
    const {open, setOpen, cb, setErrorOpen, setDeclineReason} = props

    const {
        user: {fullName, email, _id},
    } = useSelector((state: AppState) => state.auth)
    const CARD_ELEMENT_OPTIONS: CardElementProps = {
        options: {
            style: {
                base: {
                    color: '#32325d',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                        color: 'rgb(55 65 81)',
                    },
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                },
            },
        },
    }
    const ref = useRef()
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const [paymentData, setPaymentData] = useState<IStripeNewPaymentMethod>({
        city: '',
        country: '',
        line1: '',
        line2: '',
        state: '',
    })
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setPaymentData((prevState) => ({
                ...prevState,
                [event.target.id]: event.target.value,
            }))
        },
        [setPaymentData]
    )
    const handleSubmit = useCallback(() => {
        const {country, line1, line2, city, state} = paymentData
        if (!stripe || !elements) {
            return
        }

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
                if (res.paymentMethod) {
                    addPaymentMethod(res?.paymentMethod?.id)
                        .then((res) => {
                            const {paymentMethod} = res.data
                            dispatch(addPaymentMethodAction(paymentMethod))
                        })
                        .catch((err) => {
                            if (err.response) {
                                handleError(err)
                                setDeclineReason(err.response.data.error)
                                setErrorOpen(true)
                            } else {
                                handleError(err)
                            }
                        })
                    cb('refetch')
                    setOpen(false)
                }
            })
            .catch(handleError)
    }, [paymentData, stripe, elements])
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                //@ts-ignore
                initialFocus={ref}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 "
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
						&#8203;
					</span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="h-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <label
                                htmlFor="first-name"
                                className="block text-sm font-medium text-gray-700 mb-4 text-right"
                            >
                                رقم البطاقة
                            </label>
                            <div className="mb-6">
                                <CardElement {...CARD_ELEMENT_OPTIONS} />
                            </div>

                            <div className="mt-2">
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium  mb-4 text-right"
                                >
                                    المدينة
                                </label>
                                <input
                                    type={'text'}
                                    id={'city'}
                                    value={paymentData?.city}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="country"
                                    className="block text-sm font-medium  mb-4 text-right"
                                >
                                    الدولة
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={handleChange}
                                        name="country"
                                        id={'country'}
                                        value={paymentData?.country}
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    >
                                        {countries.map((item, index) => {
                                            return (
                                                <option key={index} value={item.code}>
                                                    {item.label}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-2">
                                <label
                                    htmlFor="country"
                                    className="block text-sm font-medium  mb-4 text-right"
                                >
                                    العنوان الاول
                                </label>
                                <input
                                    type={'text'}
                                    id={'line1'}
                                    value={paymentData?.line1}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="line2"
                                    className="block text-sm font-medium text-gray-700 mb-4 text-right"
                                >
                                    العنوان الثاني
                                </label>

                                <input
                                    type={'text'}
                                    id={'line2'}
                                    value={paymentData?.line2}
                                    onChange={handleChange}
                                    className="appearance-none text-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                />
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor="state"
                                    className="block text-sm font-medium text-gray-700 mb-4 text-right"
                                >
                                    المحافظة
                                </label>
                                <input
                                    type={'text'}
                                    id={'state'}
                                    value={paymentData?.state}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="pt-5">
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        حفظ
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        onClick={() => setOpen(false)}
                                    >
                                        الغاء
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>

            </Dialog>
        </Transition.Root>
    )
}

export default AddPaymentMethod
